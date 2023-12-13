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
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const product = await apiFeature.query;
    return res.status(201).json({
        success:true,
        data:product,
        productCount,
        filterProductCount:product.length,
    })
})

// top rated products
exports.topRatedProducts = catchAsyncErrors( async(req,res,next)=>{
    var topRatedProducts = await Product.find().sort({ratings:"descending"}).limit(8);
    if(!topRatedProducts){
       return next(new ErrorHandler("Top Ratings Products not found",404));
    }

    return res.status(200).json({
        success:true,
        topRatedProducts,
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



// create new review or update new review
exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{
    const {rating,comment,productId} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating: Number(rating),
        comment,
    }
    // find produc with the given producId
    const product = await Product.findById(productId);

    // if already reviewd then convert object id into string to compare
    const isReviewed = product.reviews.find(
        (rev)=>rev.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
        product.reviews.forEach(rev=>{
            // convert object id into string to compare
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = Number(rating);
                rev.comment = comment;
            }
        })
    }
    // if review is new
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating;
    })

    product.ratings = avg / product.reviews.length;

    await product.save({validateBeforeSave:false});

    return res.status(200).json({
        success:true,
        messsage:"Reviewed successfully"
    })
})


// get all reviews of a product

exports.getProductReivews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
})


// delete reivew
exports.deleteReivews = catchAsyncErrors(async(req,res,next)=>{
    // find product with given id
    const product = await Product.findById(req.query.productId);
    // console.log(product);

    // if product not found
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    // filter reveiws without deleting wala reivew

        const reviews = product?.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString());
        console.log(reviews);

        let avg = 0;

        reviews.forEach(rev=>{
            avg+=rev.rating;
        })

        const numOfReviews = reviews.length;

        // average ratings
        const ratings = avg / reviews.length;

        await Product.findByIdAndUpdate(req.query.productId,{
            reviews,
            ratings: ratings || 0,
            numOfReviews
        },{
            new:true,
            runValidators:true
        })
    
    res.status(200).json({
        success:true,
        reviews:reviews,
    })
})