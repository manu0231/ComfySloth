const customAPIError = require('./customAPIError')
const {StatusCodes} = require('http-status-codes')

class NotFound extends customAPIError{
    constructor(message){
        super(message);
        this.statuscode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFound