import { Router } from "express";
import {
    isAdmin,
    validateJwt
} from '../../middlewares/validate.jwt'

import {
    registerUserAdmin,
    updateRol,
    deleteUserAdmin
} from '../admin/authAdmin.Controller'



const api = Router()


//------------------------ ADMIN ------------------------
//Agregar Usuarios
api.post('/addUserAdmin', validateJwt, isAdmin, registerUserAdmin)

//Actualizar rol de Usuarios
api.post('/updateRol', validateJwt, isAdmin, updateRol)

//Eliminar Usuarios 
api.delete('/deleteUserAdmin/:id', validateJwt, isAdmin, deleteUserAdmin)
