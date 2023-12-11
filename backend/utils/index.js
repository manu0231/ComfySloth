const { createJWT, isTokenValid, attachCookieToResponses } = require('./jwt')
const createTokenUser = require('./createTokenUser')
const checkPermission = require('./checkPermission')
const sendVerificationEmail = require('./sendVerficationEmail')
const sendResetPasswordEmail = require('./sendResetPasswordEmail')
const createHash = require('./createHash')

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser,
  attachCookieToResponses,
  checkPermission,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
}
