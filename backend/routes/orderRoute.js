const express = require('express')
const router = express.Router()

const {authorizePermissions,authenticateUser} = require('../middleware/authHandler')


//getAllOrder:GET:/
//createOrder:POST:/
//getCurrentUserOrders:GET/ShowAllMyOrders
//getSingleOrder:GET:ID
//updateOrder:PATCH/ID

const {
    getAllOrder,
    getCurrentUserOrders,
    getSingleOrder,
    createOrder,
    updateOrder
}=require('../controllers/orderController')

router.route('/')
        .post([authenticateUser],createOrder)
        .get([authenticateUser,authorizePermissions('admin')],getAllOrder)

router.route('/ShowAllMyOrders').get([authenticateUser],getCurrentUserOrders)

router.route('/:id')
        .get([authenticateUser],getSingleOrder)
        .patch([authenticateUser],updateOrder)


module.exports=router