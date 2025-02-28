import {Router} from 'express'

import {
    updateUser,
    updatePassword,
    deleteUser
} from '../user/user.controller.js'

import {
    validateJwt
} from '../../middlewares/validate.jwt.js'

const api = Router()

api.put('/updateUser/:id', validateJwt, updateUser) //Actualiza el usuario, falta validaciones
api.put('/updatePassword', validateJwt, updatePassword) //Actualiza la contraseña 
api.delete('/deleteUser/:id', validateJwt, deleteUser) //Elimina el usuario (Ingresando el password)

