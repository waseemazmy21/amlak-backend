import Joi from 'joi';

export const updateUserSchema = Joi.object({
    fullName: Joi.string().trim().min(3).max(50),
    email: Joi.string().trim().email(),
    role: Joi.string().valid('admin', 'user'),
}).min(1); 