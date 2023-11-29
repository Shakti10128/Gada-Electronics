const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/Auth.js");

const router = express.Router();

// create new order
router.route("/order/new").post(isAuthenticatedUser,newOrder);

//  get single order details for user
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);

// get my Order or logged in user orders
router.route('/myOrders').get(isAuthenticatedUser,myOrders);

// get all order --> admin
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

//  update and delete order --> admin
router.route('/admin/order/:id')
.put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router;