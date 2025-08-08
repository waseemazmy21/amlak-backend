import Joi from 'joi';

export const updateUserSchema = Joi.object({
    fullName: Joi.string().trim().min(3).max(50),
    email: Joi.string().trim().email(),
    phone: Joi.string(),
    bio: Joi.string(),
    image: Joi.string(),
}).min(1); 