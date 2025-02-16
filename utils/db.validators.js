import { isValidObjectId } from 'mongoose'
import User from '../src/user/user.model.js'
import Category from '../src/category/category.model.js'
import Product from '../src/product/product.model.js'


                              //parámetro | token
export const existUsername = async(username, user)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && alreadyUsername._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email}) 
        if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existCategory = async(name, category) => {
    const alreadyCategory = await Category.findOne({name})
        if(alreadyCategory && alreadyCategory._id != category.uid){
            console.error(`Category ${name} is already taken` )
            throw new Error( `Category ${name} is alredy taken`)
        }
}

export const existProduct = async(name, product) => {
    const alreadyProduct = await Product.findOne({name})
    if(alreadyProduct && alreadyProduct._id !=  product.uid){
        console.error(`Product ${name} is already taken `);
        throw new Error(`Product ${name} is already taken`)        
    }
}

export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}

//Validar que sea un id
export const objectIdValid = (objectId)=>{
    if(!isValidObjectId(objectId)) {
        throw new Error(`Keeper is not a valid ObjectId`)
    }
}

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}