import Category from '../category/category.model.js'
import Product from '../product/product.model.js'

//Crear Producto
export const createProduct = async(req, res) => {
    const data = req.body
    try{
        let categoryId = await Category.findById(data.category)
        if (!categoryId){
            return res.status(404).send(
                {
                    message: 'Category not found'
                }
            )
        }

        let product = new Product(data)

        await product.save()

        return res.status(201).send(
            {
                message: 'Product saved successfully', product
            }
        )

    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                success:false,
                message: 'General error when create product', 
                error
            }
        )
        
    }
}

//Listar Producto
export const listProduct = async(req, res) => {
    const {limit, skip} = req.query
    try{
        const products = await Product.find()
        .populate(
            {
                path: 'category',
                select: 'name -_id'
            }
        )
        .skip(skip)
        .limit(limit)

        if(products.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'No products found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Products found',
                total: products.length,
                products
            }
        )

    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                success:false,
                message: 'General error when list product',
                error   
            }
        )
    }
}

// Buscar Producto por Nombre
export const getProductById = async (req, res) => {
    try{
        let {id} = req.params
        
        let product = await Product.findById(id)

        if(!product){
            return res.status(404).send(
                {
                    message: 'Product not found'
                }
            )
        }
        return res.send({message: 'Product Found: ', product })
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                message: 'General error when list product', error
            }
        )
    }
}

//Actualizar 
export const updateProduct = async (req, res) => {
    try {
        let {id} = req.params
        let data = req.body
        let {category} = req.body

        const categoryId = await Category.findById(category)
        if(!categoryId){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found',
                }
            )
        }

        let updateProduct = await Product.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!updateProduct) return res.status(404).send({message: 'Product not found and not updated'})
        return res.send({message: 'Product updated', updateProduct})
    }catch(error){
        console.error(error) 
        return res.status(500).send({message: 'General error', error})
    }
}

//Eliminar 
export const deleteProduct = async (req, res) =>{
    try{
        let {id} = req.params
        let deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct) return res.status(404).send({message: 'Product not found, not deleted'})
        return res.send(
            {
                message: 'Product deleted', deletedProduct
            }
        )
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                message: 'General Error', error
            }
        )
    }
}


// Buscar por Categoría
export const getProductCategory = async (req, res) => {
    try {
        const { category } = req.body 

       
        const categoryExists = await Category.findById(category)
        if (!categoryExists) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            })
        }

        const products = await Product.find({ category })
            .populate({
                path: 'category',
                select: 'name -_id'
            }) 

        return res.status(200).send({
            success: true,
            products
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'General Error',
            error
        })
    }
}


//Buscar por Stock 0
export const outStock =async(req, res) => {
    try{
        let products = await Product.find({stock: 0})
    
        
        return res.send(
            {
                success: true,
                message: 'Products Found',
                products
            }
        )
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                message: 'General Error', error
            }
        )
    }
}

//Buscar por ventas 
export const salesProduct = async (req, res) => {
    try {
        
        let products = await Product.find({sales: { $gt: 0 }})
        .sort(
            {
                sales: 1
            }
        )

        return res.send(
            {
                success: true,
                message: 'Products found',
                products
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                error
            }
        )
    }
}



