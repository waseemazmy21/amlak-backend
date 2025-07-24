import { Router } from 'express'
import { login, register } from '../controllers/authController'
import validate from '../middlewares/validate'
import { loginSchema, registerSchema } from '../validators/authSchema'

const router = Router()

router.post('/login', validate(loginSchema), login)
router.post('/register', validate(registerSchema), register)

export default router