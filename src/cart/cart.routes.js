import { Router } from "express"

import {
    addShopCart,
    listShopCart,
    deleteProductShopCart
} from '../cart/cart.controller.js'

import {
    validateJwt,
    isAdmin
} from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/addShopCart', validateJwt, addShopCart) //Agrega un producto al carrito mediante el (Body) no Parametro
api.get('/listShopCart', validateJwt, listShopCart) // Lista todos los productos que tenemos agregados al carrito
api.delete('/deleteProductShopCart/:productId', validateJwt, deleteProductShopCart) // Elimina un producto del carrito mediante el parametro id

export default api