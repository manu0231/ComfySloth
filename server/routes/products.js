const express = require('express')

const router = express.Router()

const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadfile,
  getImage,
} = require('../controllers/products')

const { getSingleProductreviews } = require('../controllers/reviewController')

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authHandler')

router
  .route('/')
  .post(authenticateUser, authorizePermissions('admin'), createProduct)
  .get(getAllProducts)

router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)

router.route('/upload').post(uploadfile)

router.route('/fetch/:fileName').get(getImage)

router.route('/:id/reviews').get(getSingleProductreviews)

module.exports = router
