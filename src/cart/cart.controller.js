import User from '../user/user.model.js' 
import Product from '../product/product.model.js' 
import mongoose from 'mongoose' 

export const addShopCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body 
        const userId = req.user.uid 

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid product ID',
            }) 
        }

        const quantityNumber = Number(quantity) 
        if (isNaN(quantityNumber) || quantityNumber <= 0) {
            return res.status(400).send({
                success: false,
                message: 'Quantity must be a valid number greater than 0',
            }) 
        }

        const product = await Product.findById(productId) 
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            }) 
        }

        const user = await User.findById(userId) 
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            }) 
        }

        if (!user.shopCart) {
            user.shopCart = [] 
        }

        const itemIndex = user.shopCart.findIndex(item => item.productId.equals(productId)) 

        const currentQuantityInCart = itemIndex > -1 ? user.shopCart[itemIndex].quantity : 0 
        const totalQuantity = currentQuantityInCart + quantityNumber 

        if (product.stock < totalQuantity) {
            return res.status(400).send({
                success: false,
                message: 'Insufficient stock',
            }) 
        }

        if (itemIndex > -1) {
            user.shopCart[itemIndex].quantity += quantityNumber 
        } else {
            user.shopCart.push({ productId, quantity: quantityNumber }) 
        }

        await user.save() 

        let total = 0 
        for (const item of user.shopCart) {
            const productInCart = await Product.findById(item.productId) 
            if (productInCart) {
                const price = Number(productInCart.price) 
                const itemQuantity = Number(item.quantity) 

                if (!isNaN(price) && !isNaN(itemQuantity)) {
                    total += price * itemQuantity 
                }
            }
        }

        return res.status(200).send({
            success: true,
            message: 'Product added to cart successfully',
            shopCart: user.shopCart,
            total,
        }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'Error adding product to cart',
        }) 
    }
} 

// List Cart
export const listShopCart = async (req, res) => {
    try {
        const userC = req.user.uid 

        const user = await User.findById(userC).populate('shopCart.productId') 

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            }) 
        }

        if (!user.shopCart || user.shopCart.length === 0) {
            return res.status(200).send({
                success: true,
                message: 'The cart is empty',
                shopCart: [],
            }) 
        }

        return res.status(200).send({
            success: true,
            message: 'Cart retrieved successfully',
            shopCart: user.shopCart,
        }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'Error listing the cart',
        }) 
    }
} 

// Delete Product from ShopCart
export const deleteProductShopCart = async (req, res) => {
    try {
        const userC = req.user.uid 
        const { productId } = req.params 

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({
                success: false,
                message: 'Invalid product ID',
            }) 
        }

        const user = await User.findById(userC) 
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            }) 
        }

        const initialCartLength = user.shopCart.length 

        user.shopCart = user.shopCart.filter(item => !item.productId.equals(productId)) 

        if (user.shopCart.length === initialCartLength) {
            return res.status(404).send({
                success: false,
                message: 'The product was not in the cart',
            }) 
        }

        await user.save() 

        return res.status(200).send({
            success: true,
            message: 'Product removed from cart successfully',
        }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'Error removing product from cart',
        }) 
    }
} 