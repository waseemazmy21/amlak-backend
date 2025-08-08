import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import AppError from "../util/AppError";
import User from "../models/user";
import { generateAccessToken } from "../util/generateTokens";

export const login = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw new AppError('Invalid email or passowrd', 401)

    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new AppError('Invalid email or passowrd', 401)
    }

    const accessToken = generateAccessToken(user._id)
    res.status(201)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // using https
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .json({
            success: true,
            message: 'Login successful',
            data: {
                user
            }
        })
});

export const register = expressAsyncHandler(async (req: Request, res: Response) => {
    let existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        throw new AppError("Email already in use", 409);
    }

    const user = await User.create(req.body);
    const accessToken = generateAccessToken(user._id);
    res.status(201)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // using https
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .json({
            success: true,
            message: "User registered successfully",
            data: {
                user
            }
        });
});

export const getUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: {
            user
        }
    });
});

export const logout = (req: Request, res: Response) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // should match cookie settings used on login
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully.",
    });
};