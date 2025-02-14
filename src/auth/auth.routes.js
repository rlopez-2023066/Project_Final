import {Router} from 'express';
import {
    login,
    register
} from '../auth/auth.controller.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)

export default api
