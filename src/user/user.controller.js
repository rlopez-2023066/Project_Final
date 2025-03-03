'use strict'

import {
    checkPassword, 
    encrypt
} from '../../utils/encryp.js'

import User from '../user/user.model.js'
import Category from '../category/category.model.js'

//Update Usuario
export const updateUser = async(req, res) => {
    try{
        const {id} = req.params 

        const data = req.body

        const idC = req.user.uid

        const userC = await User.findById(id)

        if(userC._id.toString() !== idC){
            return res.status(403).send(
                {
                    success: false,
                    message: 'You cannot update the profile of others'
                }
            )
        }

        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update){
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }
        
        return res.send(
            {
                success: true,
                message: 'User Updated successfully',
                user: update
            }
        )
    }catch(error){
        console.error(error);
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                error
            }
        )
        
    }
}

//Update Password
export const updatePassword = async(req, res) => {
    try{
        let id = req.user.uid
        
        let {oldPassword, newPassword} = req.body

        let user = await User.findById(id)

        if(user && await checkPassword(user.password, oldPassword)){
            user.password = await encrypt(newPassword)
            user.save()
            return res.send(
                {
                    success: true,
                    message: 'Updated Password Successfully'
                }
            )
        }
        
        return res.send(
            {
                success: false,
                message: 'Error Updated Password'
            }
        )
    }catch (error){
        console.error(error);
        return res.status(500).send(
            {
                success: false, 
                message: 'General Error'
            }
        )
        
    }
}


//Delete User
export const deleteUser = async(req, res) => {
    try{
        let idC = req.user.uid
        let password = req.body
        let {id} = req.params

        const userC = await User.findById(id)
        if(userC._id != idC){
            return res.status(403).send(
                {
                    success: false,
                    message: 'You cannot delete the profile of others.'
                }
            )
        }

        if(userC && await checkPassword(userC.password, password)){
            await User.findByIdAndDelete(id)
            console.log('User deleted Successfully');
        }

        return res.send (
            {
                success:false, 
                message: 'Error delete User'
            }
        )
    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error'
            }
        )
    }
}

const initUser  = async () => {
    try {
        const adminExist = await User.findOne({ role: 'ADMIN' }) 

        if (!adminExist) {
            const password = await encrypt('@dmin', 10) 

            const userAdmin = new User({
                name: 'Rene',
                surname: 'López', 
                username: 'rlopez',
                email: 'rlopez@gmail.com',
                password: password,
                phone: '47491420',
                role: 'ADMIN',
            }) 

            await userAdmin.save() 
            console.log('Admin created') 
        } else {
            console.log('Admin already exists') 
        }
    } catch (error) {
        console.error('Error, not Admin created', error) 
    }
} 

const initCategory = async () => {
    try {
        const categories = await Category.countDocuments() 
        if (categories === 0) {
            const categoriesDefault = [
                {
                    name: 'Default',
                    description: 'Default category',
                },
            ] 

            await Category.insertMany(categoriesDefault) 
            console.log('Default categories added') 
        } else {
            console.log('Categories already exist') 
        }
    } catch (error) {
        console.error({
            message: 'Error adding default categories',
            error,
        }) 
    }
} 
initCategory()
initUser()