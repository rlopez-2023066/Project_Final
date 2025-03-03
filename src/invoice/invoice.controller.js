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
                    message: 'User not Found',
                }
            ) 
        }

        if (!user.shopCart || user.shopCart.length === 0) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'The cart is empty.',
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
                        message: `Product out of stock: ${product.name}`,
                    }
                ) 
            }

            total += product.price * item.quantity 
        }

        const invoice = new Invoice({
            user,
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
                message: 'Invoice generated correctly',
                invoice,
            }
        ) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'Error generating invoice',
        }) 
    }
} 

//List History Invoice
export const listHistoryInvoice = async (req, res) => {
    try {
        const userC = req.user.uid 

        const invoices = await Invoice.find({ user: userC })
        .populate(
            {
                path: 'products.productId',
                model: 'Product', 
            }
        ) 

        if (!invoices || invoices.length === 0) {
            return res.status(200).send({
                success: true,
                message: 'There are no invoices for this user',
                invoices: [],
            }) 
        }

        return res.status(200).send({
            success: true,
            message: 'Invoice list obtained successfully',
            invoices,
        }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'Error listing invoices',
        }) 
    }
} 