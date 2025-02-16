//Validar los errores del middleware
import { validationResult } from "express-validator"

export const validateErrors = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(
            {
                errors: errors
            }
        )
    }
    next()
}

export const validateErrorsWithoutFiles = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(validationResult(req))
    if(!errors.isEmpty()){
        return res.status(400).send(
            {
                success: false,
                message: 'Error with validations',
                errors: errors.errors
            }
        )
    }
    next()
}