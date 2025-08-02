import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';

// Middleware to check if user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && (req.session as any).userId) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
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

// Admin authentication middleware
export const isAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if admin session exists
    if ((req.session as any)?.adminAuthenticated) {
      return next();
    }
    
    return res.status(401).json({ message: "Admin authentication required" });
  } catch (error) {
    res.status(500).json({ message: "Authentication error" });
  }
};