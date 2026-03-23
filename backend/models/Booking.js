import mongoose from "mongoose";
const{ObjectId}=mongoose.Schema.Types

const bookingSchema = new mongoose.Schema({
    item:{type:ObjectId,ref:"Items",required:true},
    user:{type:ObjectId,ref:"User",required:true},
    owner:{type:ObjectId,ref:"User",required:true},
    pickupDate:{type:Date,required:true},
    returnDate:{type:Date,required:true},
    pickupLocation:{type:String,required:true},
    status:{type:String,enum:["pending","completed","cancelled"],default:"pending"},
    price:{type:Number,required:true}
},{timestamps:true})

const Booking=mongoose.model('Booking',bookingSchema)

export default Booking;