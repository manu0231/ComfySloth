const User = require('../models/User')
const customError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const {
  checkPermission,
  createTokenUser,
  attachCookieToResponses,
} = require('../utils')

const getalluser = async (req, res) => {
  const user = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ user })
}

const getsingleuser = async (req, res) => {
  // const user = await User.findOne({_id:req.params.id})
  const user = await User.findOne({ _id: req.params.id }).select('-password')
  if (!user) {
    throw new customError.NotFound(`No user with id :${req.params.id}`)
  }
  checkPermission(req.user, user._id)
  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    throw new customError.BadRequest('Please provide values')
  }
  const user = await User.findOne({ _id: req.user.userID })

  user.name = name
  user.email = email

  await user.save()

  const tokenuser = createTokenUser(user)
  attachCookieToResponses({ res, user: tokenuser })
  res.status(StatusCodes.OK).json({ user: tokenuser })
}
const upateUserPassword = async (req, res) => {
  const { oldpassword, newpassword } = req.body
  if (!oldpassword || !newpassword) {
    throw new customError.BadRequest('Please provide values')
  }
  const user = await User.findOne({ _id: req.user.userID })
  const iscorrectpassword = await user.comparepassword(oldpassword)
  if (!iscorrectpassword) {
    throw new customError.UnauthenticatedError('invalid Credentials')
  }
  user.password = newpassword
  await user.save()
  res.status(StatusCodes.OK).json({ msg: `Password updated.` })
}

module.exports = {
  getalluser,
  getsingleuser,
  showCurrentUser,
  updateUser,
  upateUserPassword,
}
