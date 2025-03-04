import { Router } from "express";

import {
    createProduct,
    listProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductCategory,
    salesProduct,
    outStock
} from '../product/product.controller.js'

import {
    listCategory
} from '../category/category.controller.js'

import {
    isAdmin,
    validateJwt, 
    
} from '../../middlewares/validate.jwt.js'
import { productValidator } from "../../middlewares/validators.js";

const api = Router()


//Rutas Del ADMIN
api.post('/addProduct',  validateJwt, isAdmin, productValidator,  createProduct) //Agregar Producto
api.put('/updateProduct/:id',  validateJwt, isAdmin, productValidator, updateProduct) //Actualizar Producto
api.delete('/deleteProduct/:id',  validateJwt, isAdmin, deleteProduct) //Eliminar Producto
api.get('/outStock', validateJwt, isAdmin, outStock) // Lista los productos que no tienen stock.

//Rutas Del CLIENTE
api.get('/listProduct', validateJwt, listProduct) //Listar todos los productos
api.get('/getProductById/:id', validateJwt, getProductById) //Buscar por nombre
api.get('/getProductCategory', validateJwt, getProductCategory) //Buscar Produtos por Categoria (ID BODY)
api.get('/listCategory', validateJwt, listCategory) //Listar todas las categorias
api.get('/salesProduct', validateJwt, salesProduct) //Lista todos los producotos por los mas vendidos.
export default api;