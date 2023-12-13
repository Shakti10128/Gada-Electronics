const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReivews, deleteReivews, topRatedProducts } = require("../controllers/productController.js");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/Auth.js");
const router = express.Router();


router.route('/products').get(getAllProducts)

// top rated products
router.route('/TopRatedProducts').get(topRatedProducts);

// admin route
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

// admin route (update,delete)
router.route('/admin/product/:id')
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

// get product details
router.route('/product/:id').get(getProductDetails);

// create review
router.route('/review').put(isAuthenticatedUser,createProductReview);

// get all reviews of a product
router.route('/reviews')
.get(getProductReivews)
.delete(isAuthenticatedUser,deleteReivews);

// delete review


module.exports = router;