const customAPIError = require('./customAPIError')
const {StatusCodes} = require('http-status-codes')

class UnauthenticatedError extends customAPIError{
    constructor(message){
        super(message);
        this.statuscode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthenticatedError