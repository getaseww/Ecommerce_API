const mongoose =require("mongoose");

const OrderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    products:[{
        productId:{
            type:String,
            requied:true,
        },
        quantity:{
            type:Number,
            default:1,
        },
    }],
    amount:{
        type:Number,
        required:true,
    },
    adress:{
        type:Object,
        required:true,
    },
    status:{
        type:String,
        default:"pending",
    },
})


module.exports=mongoose.model("Order",OrderSchema);