import Category from '../category/category.model.js'
import Product from '../product/product.model.js'

//Crear Categoria
export const addCategory = async(req, res) => {
    const data = req.body
    try{
        
    

        const category  = new Category(data)
        await category.save()
        
        return res.send(
            {
                success: true,
                message: `${category.name} save successfully`
            }
        )

        
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                success: false,
                message: 'General Error ',
                error
            }
        )
        
    }
}

//Listar Categorias 
export const listCategory = async(req, res) => {
    const { limit, skip} = req.query
    try{
        const categories = await Category.find()
        .skip(skip)
        .limit(limit)

        if(categories.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'No categories found',
                }
            )
        }
        
        return res.send(
            {
                success: true,
                message: 'Categories found: ',
                total: categories.length,
                categories
            }
        )

    }catch(error){
        console.error(error);
        return res.status(500).send(
            {
                success: false,
                message: 'General Error ',
                error
            }
        )
    }
}

//Buscar ID
export const getCategoryById = async (req, res) => {
    try{
        let {id} = req.params

        let category = await Category.findById(id)
        if(!category){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found',
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Category found: ', category
            }
        )
    }catch(error){
        console.error(error);
        return res.status(500).send({message: 'General Error ', error})
    }
}

// Actualizar Categoria
export const updateCategory = async (req, res) => {
    try{
        let {id} = req.params
        let data = req.body

        let updateCategory = await Category.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        
        if(!updateCategory) return res.status(404).send({message: 'Category not found and not updated'})
        return res.send({message: 'Category updated', updateCategory})

    }catch(error){
        console.error(error);
        return res.status(500).send({message:'General Error', error})
    }
}

//Eliminar Categoría
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params  
        const defaultCategoryName = 'Default'  

        const defaultCategory = await Category.findOne({ name: defaultCategoryName }) 
        if (!defaultCategory) {
            return res.status(404).send({
                success: false,
                message: 'Default category not found'
            }) 
        }

        const categoryToDelete = await Category.findById(id) 
        if (!categoryToDelete) {
            return res.status(404).send({
                success: false,
                message: 'Category to delete not found'
            }) 
        }

        await Product.updateMany(
            { category: categoryToDelete._id }, 
            { $set: { category: defaultCategory._id } } 
        ) 

        const deletedCategory = await Category.findByIdAndDelete(id) 
        if (!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: 'Category not found, not deleted'
            }) 
        }

        return res.send({
            success: true,
            message: 'Category deleted successfully and products moved to default category',
            deletedCategory
        }) 


    } catch (error) {
        console.error(error) 
        return res.status(500).send({
            
            message: 'General Error',
            error
        }) 
    }
} 