import { Router } from "express";
import {
    isAdmin,
    validateJwt
} from '../../middlewares/validate.jwt.js'

import {
    registerUserAdmin,
    updateRol,
    deleteUserAdmin
} from '../admin/authAdmin.Controller.js'



const api = Router()


//------------------------ ADMIN ------------------------
//Agregar Usuarios
api.post('/addUserAdmin', validateJwt, isAdmin, registerUserAdmin)

//Actualizar rol de Usuarios
api.put('/updateRol/:id', validateJwt, isAdmin, updateRol)

//Eliminar Usuarios 
api.delete('/deleteUserAdmin/:id', validateJwt, isAdmin, deleteUserAdmin)

export default api