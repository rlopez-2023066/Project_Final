import User from '../user/user.model.js'
import Product from '../product/product.model.js'
import mongoose from 'mongoose' 

export const addShopCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body 
        const userId = req.user.uid 

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'ID de producto no válido',
                }
            ) 
        }

        const product = await Product.findById(productId) 
        if (!product) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Producto no encontrado',
                }
            ) 
        }

        if (product.stock < quantity) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Stock insuficiente',
                }
            ) 
        }

        const user = await User.findById(userId) 
        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Usuario no encontrado',
                }
            ) 
        }

        if (!user.shopCart) {
            user.shopCart = [] 
        }

        const itemIndex = user.shopCart.findIndex(item => item.productId.equals(productId)) 

        if (itemIndex > -1) {
            user.shopCart[itemIndex].quantity += quantity 
        } else {
            user.shopCart.push({ productId, quantity }) 
        }

        await user.save() 

        return res.status(200).send(
            {
                success: true,
                message: 'Producto agregado al carrito correctamente',
                shopCart: user.shopCart, 
            }
        ) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'Error al agregar el producto al carrito',
            }
        ) 
    }
} 

//List Cart
export const listShopCart = async (req, res) => {
    try {
        const userC = req.user.uid 

        const user = await User.findById(userC).populate('shopCart.productId') 

        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Usuario no encontrado',
                }
            ) 
        }

        if (!user.shopCart || user.shopCart.length === 0) {
            return res.status(200).send(
                {
                    success: true,
                    message: 'El carrito está vacío',
                    shopCart: [],
                }
            ) 
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Carrito obtenido correctamente',
                shopCart: user.shopCart,
            }
        ) 


    } catch (error) {
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'Error al listar el carrito',
            }
        ) 
    }
} 

//Delete Product ShopCart
export const deleteProductShopCart = async (req, res) => {
    try {
        const userC = req.user.uid 
        const { productId } = req.params 

         if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'ID de producto no válido',
                }
            ) 
        }

         const user = await User.findById(userC) 
        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Usuario no encontrado',
                }
            ) 
        }

        const initialCartLength = user.shopCart.length 

        user.shopCart = user.shopCart.filter(item => !item.productId.equals(productId)) 

        if (user.shopCart.length === initialCartLength) {
             return res.status(404).send(
                {
                    success: false,
                    message: 'El producto no estaba en el carrito',
                }
            ) 
        }

         await user.save() 

        return res.status(200).send(
            {
                success: true,
                message: 'Producto eliminado del carrito correctamente',
            }
        ) 
        
    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            success: false,
            message: 'Error al eliminar el producto del carrito',
        }) 
    }
} 