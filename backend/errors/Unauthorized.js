const customAPIError = require('./customAPIError')
const {StatusCodes} = require('http-status-codes')

class Unauthorized extends customAPIError{
    constructor(message){
        super(message);
        this.statuscode = StatusCodes.FORBIDDEN;
    }
}

module.exports = Unauthorized