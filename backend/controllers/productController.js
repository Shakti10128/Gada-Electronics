const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require('../middleware/catchAsyncError.js')
const ApiFeatures = require("../utils/apiFeatures.js");




// create a product ------> Admin
exports.createProduct = catchAsyncErrors( async(req,res,next)=>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    return res.status(201).json({
        success:true,
        message:product
    })
});

// get all prodcuts
exports.getAllProducts = catchAsyncErrors( async(req,res)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const product = await apiFeature.query;
    return res.status(201).json({
        success:true,
        message:product,
        productCount
    })
})

// get product details 
exports.getProductDetails = catchAsyncErrors( async(req,res,next)=>{
    var product = await Product.findById(req.params.id);
    if(!product){
       return next(new ErrorHandler("Product not found",404));
    }

    return res.status(200).json({
        success:true,
        product,
    })
})



// update product -----> admin
exports.updateProduct = catchAsyncErrors( async(req,res,next)=>{
    var product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    // if product found
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    // return response
    return res.status(200).json({
        success:true,
        product,
    })
})

// delete product ----->Admin
exports.deleteProduct = catchAsyncErrors( async(req,res)=>{
    var product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})