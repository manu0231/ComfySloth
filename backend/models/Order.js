
const mongoose = require('mongoose')

const SingleOrderItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    amount: { type: Number, required: true },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    }
})

const orderSchema = mongoose.Schema({
    tax: {
        type: Number,
        requried: true
    },
    shippingFee: {
        type: Number,
        requried: true
    },
    subtotal: {
        type: Number,
        requried: true
    },
    total: {
        type: Number,
        requried: true
    },
    orderItems: [SingleOrderItemSchema],
    status: {
        type: String,
        enum: ['delivered', 'pending', 'arrived', 'canceled', 'paid'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User',
    },
    ClientSecret:{
        type :String,
        required: true,
    },
    paymentIntentId:{
        type: String,
    }
},
{
    timestamps: true
})



module.exports = mongoose.model('Order', orderSchema)