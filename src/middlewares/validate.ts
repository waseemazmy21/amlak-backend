import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

const validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        })

        if (error) {
            const message = "validation error"
            const errors = error.details.map(item => {
                const key = item.path.join('.')
                return {
                    [key]: item.message
                }
            })
            res.status(400).json({
                message,
                errors
            })
        }
        next()
    }
}

export default validate