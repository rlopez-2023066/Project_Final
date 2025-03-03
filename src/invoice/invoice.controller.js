import User from '../user/user.model.js'
import Invoice from '../invoice/invoice.model.js'

export const generateInvoice = async (req, res) => {
    try {
        const userC = req.user.uid 

        const user = await User.findById(userC)
        .populate('shopCart.productId') 
        if (!user) {
            return res.status(404).send
            (
                {
                    success: false,
                    message: 'Usuario no encontrado',
                }
            ) 
        }

        if (!user.shopCart || user.shopCart.length === 0) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'El carrito está vacío',
                }
            ) 
        }

        let total = 0 

        for (const item of user.shopCart) {
            const product = item.productId 

            if (product.stock < item.quantity) {
                return res.status(400).send(
                    {
                        success: false,
                        message: `Producto agotado: ${product.name}`,
                    }
                ) 
            }

            total += product.price * item.quantity 
        }

        const invoice = new Invoice({
            userC,
            products: user.shopCart.map(item => (
                {
                    productId: item.productId._id,
                    quantity: item.quantity,
                    price: item.productId.price,
                }
            )),
            total,
        }) 

        await invoice.save() 

        for (const item of user.shopCart) {
            const product = item.productId 
            product.stock -= item.quantity 
            await product.save() 
        }

        user.shopCart = [] 
        await user.save() 

        return res.status(201).send(
            {
                success: true,
                message: 'Factura generada correctamente',
                invoice,
            }
        ) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'Error al generar la factura',
        }) 
    }
} 

//List History Invoice
export const listHistoryInvoice = async (req, res) => {
    try {
        const userC = req.user.uid 

        const invoices = await Invoice.find({ userC }).populate({
            path: 'products.productId',
            model: 'Product', 
        }) 

        if (!invoices || invoices.length === 0) {
            return res.status(200).send({
                success: true,
                message: 'No hay facturas para este usuario',
                invoices: [],
            }) 
        }

        return res.status(200).send({
            success: true,
            message: 'Lista de facturas obtenida correctamente',
            invoices,
        }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'Error al listar las facturas',
        }) 
    }
} 