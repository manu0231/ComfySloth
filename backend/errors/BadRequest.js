const customAPIError = require('./customAPIError')
const {StatusCodes} = require('http-status-codes')

class BadRequest extends customAPIError{
    constructor(message){
        super(message);
        this.statuscode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequest