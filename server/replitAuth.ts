import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

const getOidcConfig = memoize(
  async () => {
    // Initializing OIDC config
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID!
    );
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  const isProduction = process.env.NODE_ENV === 'production';
  
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    name: 'connect.sid',
    cookie: {
      httpOnly: true,
      secure: isProduction, // Only secure in production
      maxAge: sessionTtl,
      sameSite: isProduction ? 'none' : 'lax', // Allow cross-site cookies for OAuth
    },
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(
  claims: any,
) {
  // Upserting user with authentication data
  try {
    const user = await storage.upsertUser({
      id: claims["sub"],
      email: claims["email"],
      firstName: claims["first_name"],
      lastName: claims["last_name"],
      profileImageUrl: claims["profile_image_url"],
    });
    // User upserted successfully
    return user;
  } catch (error) {
    console.error("Error upserting user:", error);
    throw error;
  }
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await getOidcConfig();

  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback
  ) => {
    try {
      // Authentication verify callback triggered
      const user = {};
      updateUserSession(user, tokens);
      const claims = tokens.claims();
      if (claims) {
        await upsertUser(claims);
        // User authenticated successfully
      } else {
        console.error("No claims found in tokens");
      }
      verified(null, user);
    } catch (error) {
      console.error("Authentication verification failed:", error);
      verified(error, null);
    }
  };

  // Get all domains including custom domains
  const allDomains = process.env.REPLIT_DOMAINS!.split(",");
  
  // Add butterflyproviders.com if not already included
  if (!allDomains.includes("butterflyproviders.com")) {
    allDomains.push("butterflyproviders.com");
  }
  
  // Setting up authentication for domains

  for (const domain of allDomains) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`,
      },
      verify,
    );
    passport.use(strategy);
    // Configured authentication strategy for domain
  }

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  app.get("/api/login", (req, res, next) => {
    const domain = req.hostname;
    
    // If accessing via localhost, redirect to proper Replit domain
    if (domain === 'localhost') {
      const replitDomain = process.env.REPLIT_DOMAINS!.split(",")[0];
      return res.redirect(`https://${replitDomain}/api/login`);
    }
    
    // Login attempt from hostname
    
    passport.authenticate(`replitauth:${domain}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
    })(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    const domain = req.hostname;
    
    // Authentication callback received
    
    const strategyName = `replitauth:${domain}`;
    // Using authentication strategy
    
    passport.authenticate(strategyName, (err: any, user: any, info: any) => {
      // Authentication callback completed
      
      if (err) {
        console.error("Authentication error:", err);
        return res.redirect("/api/login?error=auth_failed");
      }
      
      if (!user) {
        // No user returned from authentication
        return res.redirect("/api/login?error=no_user");
      }
      
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          console.error("Login error:", loginErr);
          return res.redirect("/api/login?error=login_failed");
        }
        
        // User successfully logged in, redirecting to home
        return res.redirect("/");
      });
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
        }).href
      );
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = req.user as any;
  
  console.log("isAuthenticated check:", {
    isAuthenticated: req.isAuthenticated(),
    hasUser: !!user,
    userExpiresAt: user?.expires_at,
    sessionID: req.sessionID
  });

  if (!req.isAuthenticated() || !user?.expires_at) {
    console.log("Authentication failed: no valid session or user");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
