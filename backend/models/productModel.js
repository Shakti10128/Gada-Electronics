const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Product Name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Please Enter Product description'],
    },
    price:{
        type:Number,
        required:[true,'Please Enter Product Price'],
        maxLength:[8,'Price cannot exceed 8 characters']
    },
    ratings:{
        type:Number,
        default: 0,
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    stock:{
        type:String,
        required:[true,"Please Enter Product stock"],
        maxLength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                require:true,
                ref:"User"
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:"User"
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Product",productSchema);