
const notfoundMiddleware = (req,res)=>res.status(404).send('Route does not Found')

module.exports = notfoundMiddleware
