const path = require('path')
const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')
const Product = require('../models/products')
const fs = require('fs')
const multer = require('multer')

const createProduct = async (req, res) => {
  const products = await Product.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ products })
}

const getAllProducts = async (req, res) => {
  const { name, sort, fields } = req.query
  const queryObject = {}

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  let result = Product.find(queryObject)

  //sort
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  //select
  if (fields) {
    const fieldList = fields.split(',').join(' ')
    result = result.select(fieldList)
  } else {
    result = result.select({})
  }
  let products = await result.populate({
    path: 'reviews',
    select: 'rating title comment -product',
  })
  res.status(StatusCodes.OK).json({ productCount: products.length, products })
}

const getProduct = async (req, res) => {
  const { id: product_ID } = req.params
  const products = await Product.findOne({ _id: product_ID }).populate({
    path: 'reviews',
    select: 'rating title comment product',
  })

  if (!products) {
    throw new customError.NotFound(`No Product found with id: ${product_ID}.`)
  }
  res.status(StatusCodes.OK).json({ products })
}

const updateProduct = async (req, res) => {
  const { id: product_ID } = req.params
  const products = await Product.findOneAndUpdate(
    { _id: product_ID },
    req.body,
    { new: true, runValidators: true }
  )
  if (!products) {
    throw new customError.NotFound(`No Product found with id: ${product_ID}.`)
  }
  res.status(StatusCodes.OK).json({ msg: products })
}

const deleteProduct = async (req, res) => {
  const { id: product_ID } = req.params
  const products = await Product.findOne({ _id: product_ID })

  if (!products) {
    throw new customError.NotFound(`No Product found with id: ${product_ID}.`)
  }
  await products.remove()
  res
    .status(StatusCodes.OK)
    .json({ msg: `Deleted product with id ${product_ID}` })

  // await Product.deleteMany()
}

const uploadfile = async (req, res) => {
  if (!req.files) {
    throw new customError.BadRequest('No file uploaded')
  }
  const productimage = req.files.image

  if (!productimage.mimetype.startsWith('image')) {
    throw new customError.BadRequest('Please Upload Image')
  }

  const maxsize = 1024 * 1024
  if (productimage.size > maxsize) {
    throw new customError.BadRequest('Image must be smaller than 1mb')
  }

  // Get the current timestamp
  const currentTimeStamp = new Date().getTime()
  // Generate a unique filename using 'image' and the current timestamp
  const fileName = `image${currentTimeStamp}${path.extname(productimage.name)}`

  const imagepath = path.join(__dirname, '../public/uploads/', fileName)
  await productimage.mv(imagepath)

  res
    .status(StatusCodes.OK)
    .json({ image: `http://localhost:3000/api/v1/products/fetch/${fileName}` })
}

// Route to fetch uploaded file
const getImage = (req, res) => {
  const { fileName } = req.params
  const filePath = path.join(__dirname, '../public/uploads', fileName)
  console.log(filePath)
  if (fs.existsSync(filePath)) {
    // If the file exists, send it back in the response
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
    res.sendFile(filePath)
  } else {
    res.status(404).send('File not found.')
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadfile,
  getImage,
}
