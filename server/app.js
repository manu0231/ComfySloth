require('dotenv').config()
require('express-async-errors')
const path = require('path')
const multer = require('multer')
//express
const express = require('express')
const app = express()

// rest of packages
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

//database
const connectDB = require('./db/connect')
// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // You can replace '*' with specific origins if needed
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

//Routers
const productRoute = require('./routes/products')
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
const reviewRoute = require('./routes/reviewRoute')
const orderRoute = require('./routes/orderRoute')

//middleware
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')
const notfound = require('./middleware/notfoundMiddleware')

app.set('trust proxy', 1)
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 60,
//   })
// )

const corsOptions = {
  // origin: 'http://localhost:8888',
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(mongoSanitize())
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors(corsOptions))
app.use(xss())
app.use(express.json())
app.use(fileUpload())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'))
// app.use('/upload', express.static(path.join(__dirname, 'public/uploads')))
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

// app.use(express.static('./front-end'));

//router
app.use('/api/v1/products', productRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/order', orderRoute)

app.use(notfound)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () =>
      console.log(`Server is listening on http://localhost:${PORT}`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
