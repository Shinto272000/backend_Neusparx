import express from 'express';
import {
  getUserProfile,
  changePassword,
  getAllUsers,
  deleteUser
} from '../controllers/userController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/profile', authenticateToken, getUserProfile);
router.put('/change-password', authenticateToken, changePassword);
router.get('/all', authenticateToken, requireAdmin, getAllUsers);
router.delete('/:id', authenticateToken, requireAdmin, deleteUser);

export default router;