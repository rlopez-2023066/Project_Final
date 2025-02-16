//Middleware de limitación de solicitudes
import rateLimit from "express-rate-limit"

export const limiter = rateLimit(
    {
        windowMs: 15 * 60 * 1000,//rango de tiempo
        max: 150,//Cantidad de peticiones permitidas en rango de tiempo
        message: {
            message: 'Your blocked, wait 15 minutes'
        }
    }
)