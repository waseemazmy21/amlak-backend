import { Router } from 'express'
import { login, register, getUser, logout } from '../controllers/authController'
import validate from '../middlewares/validate'
import { loginSchema, registerSchema } from '../validators/authSchema'
import { protectedRoute } from '../middlewares/authMiddleware'

const router = Router()

router.post('/login', validate(loginSchema), login)
router.post('/register', validate(registerSchema), register)
router.get('/me', protectedRoute, getUser);
router.post('/logout', logout)

export default router