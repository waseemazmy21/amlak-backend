import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .trim()
        .min(6)
        .max(30)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters long",
            "string.max": "Password cannot be more than 30 characters",
            "any.required": "Password is required",
        }),
}).required()

export const registerSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required().messages({
        "string.empty": "Username is required",
        "string.min": "Username must be at least 3 characters",
        "string.max": "Username must be at most 30 characters",
        "any.required": "Username is required",
    }),
    email: Joi.string().trim().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please enter a valid email address",
        "any.required": "Email is required",
    }),
    password: Joi.string()
        .trim()
        .min(6)
        .max(30)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters long",
            "string.max": "Password cannot be more than 30 characters",
            "any.required": "Password is required",
        }),

}).required()