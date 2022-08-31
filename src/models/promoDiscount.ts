import { model, Schema } from 'mongoose'

const promoSchema = new Schema({
    email: {
        type: String,
        trim: true,
        index: true
    }
}, {
    versionKey: false,
    timestamps: true,
})


export default model('promo', promoSchema)