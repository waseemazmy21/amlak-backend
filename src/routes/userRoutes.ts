import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { protectedRoute, authorizeRoles } from '../middlewares/authMiddleware';
import { updateUserSchema } from '../validators/userSchema';
import validate from '../middlewares/validate';

const router = Router();

// Get all users
router.get('/', protectedRoute, getAllUsers);

// Get user by id
router.get('/:id', protectedRoute, getUserById);

// Update user
router.patch('/:id', protectedRoute, validate(updateUserSchema), updateUser);

// Delete user (admin only)
router.delete('/:id', protectedRoute, deleteUser);

export default router;