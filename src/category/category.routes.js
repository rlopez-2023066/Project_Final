import { Router } from "express";
import {
    addCategory,
    listCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../category/category.controller.js'

import {
    validateJwt, 
    isAdmin
} from '../../middlewares/validate.jwt.js'

const api = Router();

//Rutas Del ADMIN
api.post('/addCategory', validateJwt, addCategory)
api.put('/updateCategory/:id', validateJwt, updateCategory)
api.delete('/deleteCategory/:id', validateJwt, deleteCategory)

//Rutas Del CLIENTE
api.get('/listCategory', validateJwt, listCategory)
api.get('/getCategoryById/:id', validateJwt, getCategoryById)

export default api