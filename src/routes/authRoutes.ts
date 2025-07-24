import { Router } from 'express'
import { login, register, logout } from '../controllers/authController'
import validate from '../middlewares/validate'
import { loginSchema, registerSchema } from '../validators/authSchema'

const router = Router()

router.post('/login', validate(loginSchema), login)
router.post('/register', validate(registerSchema), register)
router.get('/logout', logout)

export default router