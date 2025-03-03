import {Schema, model} from 'mongoose'

const invoiceSchema = Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        products:[
            {
                productId:{
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },

                quantity:{
                    type: Number,
                    required: true
                },

                price:{
                    type: Number,
                    required: true
                }
            }
        ],

        total: {
            type: Number,
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        }

        
    }
)

export default model('Invoice', invoiceSchema);