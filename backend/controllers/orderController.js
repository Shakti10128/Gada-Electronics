const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrror = require("../middleware/catchAsyncError.js");




// create new order
exports.newOrder = catchAsyncErrror(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    })

    return res.status(201).json({
        success:true,
        order
    })
})



// get single order details
exports.getSingleOrder = catchAsyncErrror(async (req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email")

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    return res.status(200).json({
        success:true,
        order
    })
})


// get logged in user orders
exports.myOrders = catchAsyncErrror(async (req,res,next)=>{
    const orders = await Order.find({user:req.user._id});
      
    return res.status(200).json({
        success:true,
        orders
    })
})


// get all orders --> admin
exports.getAllOrders = catchAsyncErrror(async (req,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount+= order.totalPrice;
    })
      
    return res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})


// update order status --> admin
exports.updateOrder = catchAsyncErrror(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this product",400));
    }

    order.orderItems.forEach(async (order)=>{
        await updateStock(order.product,order.quantity);
    })

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }
      
    await order.save({validateBeforeSave:false});

    return res.status(200).json({
        success:true,
        message:"Order updated successfully"
    })
});


async function updateStock (id,quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;

    await product.save({validateBeforeSave:false});
}


// delete order --> admin
exports.deleteOrder = catchAsyncErrror(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    await Order.findByIdAndDelete(req.params.id);
      
    return res.status(200).json({
        success:true,
        message:"Order deleted successfully"
    })
})