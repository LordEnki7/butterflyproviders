import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { storage } from './storage';

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required for security');
}

const JWT_SECRET = process.env.JWT_SECRET;

// JWT authentication middleware for all authenticated routes
export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token' });
    }
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Hash password utility
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password utility
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Login function
export const login = async (email: string, password: string) => {
  const user = await storage.getUserByEmail(email);
  
  if (!user || !user.passwordHash) {
    throw new Error('Invalid credentials');
  }
  
  const isValid = await verifyPassword(password, user.passwordHash);
  
  if (!isValid) {
    throw new Error('Invalid credentials');
  }
  
  if (!user.isActive) {
    throw new Error('Account is deactivated');
  }
  
  return user;
};

// Register function
export const register = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  // Check if user already exists
  const existingUser = await storage.getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  
  // Hash password
  const passwordHash = await hashPassword(userData.password);
  
  // Create user
  const user = await storage.createUser({
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    passwordHash,
    role: 'client',
    isActive: true,
  });
  
  return user;
};

// Admin authentication middleware - JWT with role check
export const isAdminAuth = (req: any, res: any, next: any) => {
  // First authenticate the token
  authenticateToken(req, res, () => {
    // Then check if user has admin role
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Admin access required' });
  });
};

// Helper function to generate JWT tokens
export const generateToken = (user: any): string => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role || 'client',
    clientIP: user.clientIP
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

// Admin login function
export const adminLogin = async (password: string) => {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  
  if (!ADMIN_PASSWORD) {
    throw new Error('Admin password not configured');
  }
  
  if (password !== ADMIN_PASSWORD) {
    throw new Error('Invalid admin password');
  }
  
  // Return admin user object for token generation
  return {
    id: 'admin',
    email: 'admin@butterflyproviders.com',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User'
  };
};