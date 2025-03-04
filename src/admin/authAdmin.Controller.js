import User from '../user/user.model.js'
import {encrypt} from '../../utils/encryp.js'

//Register
export const registerUserAdmin = async(req, res) => {
    try{
        let data = req.body

        let user = new User(data)

        user.password = await encrypt(user.password)

        await user.save()

        return res.send(
            {
                message: `Registered successfully, can be login with username: ${user.username}`
            }
        )
    }catch(error){
        console.error(error);
        return res.status(500).send(
            {
                message: 'Error registering user', error
            }
        )
    }
}

//Update Rol User (Admin)
export const updateRol = async(req, res) => {
    try{
        let {role} = req.body
        let {id} = req.params

        const user = await User.findById(id)
        if(!user){
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }


        
        const rolUser = await User.findByIdAndUpdate(
            id,
            {role},
            {new: true}
        )

        if(!rolUser){
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
                message: 'User updated',
                rolUser
            }
        )
    }catch(error){
        console.error(error);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updating User Rol',
                error
            }
        )
        
    }
}

//Eliminar Usuario (Admin)
export const deleteUserAdmin = async (req, res) => {
    try{
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)

        if(!user){
            return res.status(404).send(
                {
                    success: false,
                    message:'User not found'
                }
            )
        }
        
        return res.send(
            {
                success: true,
                message: 'User deleting successfully',
                user
            }
        )
    }catch (error){
        console.error(error);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleting User',
                error
            }
        )
        
    }
}

//List User
export const listUser = async (req, res) => {
    try{
        let {limit, skip} = req.query

        const users = await User.find()
        .limit(limit)
        .skip(skip)
        return res.send(
            {
                success: true,
                message: 'Users list',
            }
        )

    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when listing Users',
            }
        )
    }
}
