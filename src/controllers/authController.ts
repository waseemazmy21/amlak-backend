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

    const access_token = generateAccessToken(user._id)

    res.json({
        message: 'Login successful',
        access_token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
})

export const register = expressAsyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email already in use", 409);
    }

    existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new AppError("Username already in use", 409);
    }

    const user = await User.create({ username, email, password });

    const access_token = generateAccessToken(user._id);

    res.status(201).json({
        message: "User registered successfully",
        access_token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
});