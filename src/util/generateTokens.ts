import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
};

