import {Router} from 'express'

import {
    generateInvoice,
    listHistoryInvoice
} from '../invoice/invoice.controller.js'

import {
    validateJwt,
    isAdmin
} from '../../middlewares/validate.jwt.js'

const api = Router()


api.post('/generateInvoice', validateJwt, generateInvoice) //Generar Factura de los productos que tiene el carrito de compra.
api.get('/listHistoryInvoice', validateJwt, listHistoryInvoice) //Listar todas las facturas generadas por el usuario.

export default api