import { registerUser, loginUser } from './userController.js';

// Re-export user controller functions for auth routes
export const register = registerUser;
export const login = loginUser;