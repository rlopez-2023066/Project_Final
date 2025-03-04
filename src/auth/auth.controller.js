import User from '../user/user.model.js'
import {checkPassword, encrypt} from '../../utils/encryp.js'
import {generateJwt} from '../../utils/jwt.js'
import { listHistoryInvoice } from '../invoice/invoice.controller.js'

//Register
export const register = async(req, res) => {
    try{
        let data = req.body

        let user = new User(data)

        user.password = await encrypt(user.password)

        user.role = 'CLIENT'

        await user.save()

        return res.send(
            {
                message: `Registered successfully, can be login with username: ${user.username}`
            }
        )
    }catch(error){
        console.error(error) 
        return res.status(500).send(
            {
                message: 'Error registering user', error
            }
        )
    }
}

//Login
export const login = async (req, res) => {
    try {
        let { userLogin, password } = req.body 

        let user = await User.findOne({
            $or: [
                { email: userLogin },
                { username: userLogin }
            ],
        }) 

        if (user && await checkPassword(user.password, password)) {

            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }

            let token = await generateJwt(loggedUser) 

            const invoiceReq = {
                user: {
                    uid: user._id 
                },
            } 

            let history = await listHistoryInvoice(invoiceReq, res) 

            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token,
                    history
                }
            ) 
        }

        return res.status(400).send({
            message: 'Invalid Credentials'
        }) 

    } catch (error) {
        console.error(error) 
        return res.status(500).send(
            {
                message: 'General error with login function',
                error: error.message, 
            }
        ) 
    }
} 