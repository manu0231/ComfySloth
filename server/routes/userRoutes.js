const express = require('express')
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authHandler')

const {
  showCurrentUser,
  getalluser,
  getsingleuser,
  updateUser,
  upateUserPassword,
} = require('../controllers/userController')

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin'), getalluser)

router.route('/showme').get(authenticateUser, showCurrentUser)
router.route('/updateuser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, upateUserPassword)

router.route('/:id').get(authenticateUser, getsingleuser)

module.exports = router
