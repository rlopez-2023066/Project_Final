import {Schema, model} from 'mongoose'

const productSchema = Schema(
    {
        name:{
            type: String, 
            required: [true, 'The name is necessary']
        },

        description: {
            type: String,
            required: [true, 'Description is required']
        },
        
        price:{
            type: Number,
            required: [true, 'Price is needed' ]
        },

        stock:{
            type: Number,
            default: 0
        },

        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        
        sales: {
            type: Number,
            default: 0

        }

    },

    {
        timestamps: true
    }
)

export default model ('Product', productSchema)

