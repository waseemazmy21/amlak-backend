import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/user';
import AppError from '../util/AppError';

// Get all users
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find().select('-password');
    res.json({
        success: true,
        message: 'Users retrieved successfully',
        data: { users }
    });
});

// Get user by ID
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        throw new AppError('User not found', 404);
    }
    res.json({
        success: true,
        message: 'User retrieved successfully',
        data: { user }
    });
});

// Update user
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!user) {
        throw new AppError('User not found', 404);
    }
    res.json({
        success: true,
        message: 'User updated successfully',
        data: { user }
    });
});

// Delete user
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    res.json({
        success: true,
        message: 'User deleted successfully',
        data: {}
    });
});
