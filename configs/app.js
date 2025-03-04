'use strict'

//ECModules | ESModules
import express from 'express' //Servidor HTTP
import morgan from 'morgan' //Logs
import helmet from 'helmet' //Seguridad para HTTP
import cors from 'cors' //Acceso al API
import categoryRoutes from '../src/category/category.routes.js'
import productRoutes from '../src/product/product.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import authAdminRoutes from '../src/admin/authAdmin.routes.js'
import userRoutes from '../src/user/user.routes.js'
import invoiceRoutes from '../src/invoice/invoice.routes.js'
import shopCartRoutes from '../src/cart/cart.routes.js'


const configs = (app)=> {
    app.use(express.json()) 
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=> {
    app.use(authRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/product', productRoutes)
    app.use('/v1/authAdminRoutes', authAdminRoutes)
    app.use('/v1/userRoutes', userRoutes)
    app.use('/v1/invoiceRoutes', invoiceRoutes)
    app.use('/v1/shopCart', shopCartRoutes)

}

export const initServer = ()=> {
    const app = express() 
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}

//Cliente solo se puede editar el mismo, no puede actualizar otro usuario 