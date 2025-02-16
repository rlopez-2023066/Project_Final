import {Router} from 'express';
import {
    login,
    register
} from '../auth/auth.controller.js'

import { registerValidator } from '../../middlewares/validators.js'

const api = Router()

api.post('/register', registerValidator ,register)
api.post('/login', login)

export default api
