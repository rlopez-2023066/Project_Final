import { Router } from "express";

import {
    createProduct,
    listProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from '../product/product.controller.js'

import {
    validateJwt, 
    isAdmin
} from '../../middlewares/validate.jwt.js'

const api = Router()
//Rutas Del ADMIN
api.post('/addProduct', validateJwt, createProduct)
api.put('/updateProduct/:id', validateJwt, updateProduct)
api.delete('/deleteProduct/:id', validateJwt, deleteProduct)

//Rutas Del CLIENTE
api.get('/listProduct', validateJwt, listProduct)
api.get('/getProductById/:id', validateJwt, getProductById)

export default api;