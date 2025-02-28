import { Router } from "express";
import {
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../category/category.controller.js'

import {
    isAdmin,
    validateJwt, 
    
} from '../../middlewares/validate.jwt.js'

import { categoryValidator } from "../../middlewares/validators.js";

const api = Router();

//Rutas Del ADMIN
api.post('/addCategory' ,  validateJwt, isAdmin ,categoryValidator, addCategory)
api.put('/updateCategory/:id', validateJwt, isAdmin, categoryValidator, updateCategory)
api.delete('/deleteCategory/:id',  validateJwt, isAdmin, deleteCategory)

//Rutas Del CLIENTE
api.get('/getCategoryById/:id', validateJwt, getCategoryById) // Buscar categoria por Nombre

export default api