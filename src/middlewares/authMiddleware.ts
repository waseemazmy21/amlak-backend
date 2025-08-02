import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "../models/user";

const protectedRoute = passport.authenticate("jwt", { session: false });

const authorizeRoles = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser;
    if (!user || !user.role || !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    next();
};

export { protectedRoute, authorizeRoles };


