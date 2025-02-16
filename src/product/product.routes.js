import { Router } from "express";

import {
    createProduct,
    listProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from '../product/product.controller.js'

import {
    isAdmin,
    validateJwt, 
    
} from '../../middlewares/validate.jwt.js'
import { productValidator } from "../../middlewares/validators.js";

const api = Router()


//Rutas Del ADMIN
api.post('/addProduct',  validateJwt, isAdmin, productValidator,  createProduct)
api.put('/updateProduct/:id',  validateJwt, isAdmin, productValidator, updateProduct)
api.delete('/deleteProduct/:id',  validateJwt, isAdmin, deleteProduct)

//Rutas Del CLIENTE
api.get('/listProduct', validateJwt, listProduct)
api.get('/getProductById/:id', validateJwt, getProductById)

export default api;