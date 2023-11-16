const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController.js");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/Auth.js");
const router = express.Router();


router.route('/products').get(getAllProducts)
// admin route
router.route('/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
// admin route (update,delete)
router.route('/product/:id')
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
.get(getProductDetails);


module.exports = router;