const customAPIError = require('./customAPIError')
const BadRequest = require('./BadRequest')
const NotFound = require('./NotFound')
const UnauthenticatedError =require('./UnauthenticatedError')
const Unauthorized = require('./Unauthorized')

module.exports= {
    customAPIError,
    BadRequest,
    NotFound,
    UnauthenticatedError,Unauthorized
}