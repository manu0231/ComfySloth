const Review = require('../models/review')
const Product = require('../models/products')

const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')

const { checkPermission } = require('../utils')

const createReview = async (req, res) => {
  const { product: productID } = req.body
  const isValidProduct = await Product.findOne({ _id: productID })
  if (!isValidProduct) {
    throw new customError.NotFound(`No product found with ${productID}`)
  }
  const isalreadySubmitted = await Review.findOne({
    product: productID,
    user: req.user.userID,
  })
  if (isalreadySubmitted) {
    throw new customError.BadRequest('Already review submitted')
  }
  req.body.user = req.user.userID
  const review = await Review.create(req.body)
  res.status(StatusCodes.OK).json({ review })
}
const getAllReview = async (req, res) => {
  const review = await Review.find({})
    .populate({ path: 'product', select: 'name company price' })
    .populate({ path: 'user', select: 'name ' })
  res.status(StatusCodes.OK).json({ count: review.length, review })
}
const getSingleReview = async (req, res) => {
  const { id: reviewID } = req.params
  const review = await Review.findOne({ _id: reviewID })
  if (!review) {
    throw new customError.NotFound('No review Found')
  }
  res.status(StatusCodes.OK).json({ review })
}
const updateReview = async (req, res) => {
  const { id: reviewID } = req.params
  const { rating, title, comment } = req.body

  const review = await Review.findOne({ _id: reviewID })
  if (!review) {
    throw new customError.NotFound('No review Found')
  }
  checkPermission(req.user, review.user)

  review.rating = rating
  review.title = title
  review.comment = comment

  await review.save()
  res.status(StatusCodes.OK).json({ review })
}
const deleteReview = async (req, res) => {
  const { id: reviewID } = req.params
  const review = await Review.findOne({ _id: reviewID })
  if (!review) {
    throw new customError.NotFound('No review Found')
  }
  checkPermission(req.user, review.user)
  await review.remove()
  res.status(StatusCodes.OK).json({ msg: 'Review removed' })
}

const getSingleProductreviews = async (req, res) => {
  const { id: productID } = req.params
  const review = await Review.find({ product: productID })
  res.status(StatusCodes.OK).json({ review, count: review.length })
}
module.exports = {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductreviews,
}
