//getAllOrder:GET:/
//createOrder:POST:/
//getCurrentUserOrders:GET/ShowAllMyOrders
//getSingleOrder:GET:ID
//updateOrder:PATCH/ID
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const Product = require('../models/products')
const Order = require('../models/Order')
const { checkPermission } = require('../utils')

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue'
  return { client_secret, amount }
}

const getAllOrder = async (req, res) => {
  const order = await Order.find({})
  // const order = await Order.find({}).select("_id subtotal total  ") //for my convience

  res.status(StatusCodes.OK).json({ count: order.length, order })
}

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body
  // console.log(cartItems);
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.NotFound('No Order Found')
  }
  if (!tax || !shippingFee) {
    throw new CustomError.NotFound('Please provied tax and shipping Fee')
  }
  let orderItems = []
  let subtotal = 0

  for (const item of cartItems) {
    const product = await Product.findOne({ _id: item.product })
    if (!product) {
      throw new CustomError.NotFound(`Product not found with id 
            ${item.product}`)
    }
    const { name, price, image, _id } = product
    const singleOrder = {
      name,
      price,
      image,
      amount: item.amount,
      product: _id,
    }
    orderItems = [...orderItems, singleOrder]
    subtotal += item.amount * price
  }
  const total = tax + shippingFee + subtotal

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'inr',
  })
  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    orderItems,
    ClientSecret: paymentIntent.client_secret,
    user: req.user.userID,
  })
  res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {
  const order = await Order.find({ user: req.user.userID })
  if (!order) {
    throw new CustomError.NotFound('No Order placed yet')
  }
  res.status(StatusCodes.OK).json({ count: order.length, order })
}

const getSingleOrder = async (req, res) => {
  const { id: OrderId } = req.params
  const order = await Order.findOne({ _id: OrderId })
  if (!order) {
    throw new CustomError.NotFound('No Order placed yet')
  }

  // console.log(order.orderItems.product);
  checkPermission(req.user, order.user)
  res.status(StatusCodes.OK).json({ order })
}

const updateOrder = async (req, res) => {
  const { id: orderID } = req.params
  const { amount, product } = req.body
  const order = await Order.findOne({ _id: orderID })
  order.subtotal = 0
  for (const item of order.orderItems) {
    if (item.product.toString() === product) {
      item.amount = amount
    }
    order.subtotal += item.price * item.amount
  }
  order.total = order.tax + order.shippingFee + order.subtotal
  await order.save()
  res.status(StatusCodes.OK).json({ order })
}

module.exports = {
  getAllOrder,
  getCurrentUserOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
}
