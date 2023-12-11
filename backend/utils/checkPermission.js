const customError = require('../errors')

const checkPermission = (requestUser, resourceUserId)=>{
    // console.log(requestUser);
    // console.log(resourceUserId.toString());
    if( requestUser.role ==='admin') return;
    if(requestUser.userID === resourceUserId.toString())return;

    throw new customError.UnauthenticatedError('No authorized to access this route');

}

module.exports= checkPermission;