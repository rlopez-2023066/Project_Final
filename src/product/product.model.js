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
        },

        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        }
    },
    {
        timestamps: true
    }
)

export default model ('Product', productSchema)

