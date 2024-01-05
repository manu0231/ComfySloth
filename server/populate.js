require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/products')
const Review = require('./models/review')
const User = require('./models/User')

// const jsonProducts = require('./mockData/products.json')
const jsonProducts = require('./mockData/products10.json')

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Review.deleteMany()
        // await User.deleteMany()
        
        await Product.create(jsonProducts)
        console.log('success!');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()