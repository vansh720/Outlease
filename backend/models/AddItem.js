import mongoose from "mongoose";
const{ObjectId}=mongoose.Schema.Types

const AddItemSchema = new mongoose.Schema({
    owner:{type: ObjectId, ref:'User'},
    brand:{type:String,required:true},
    model:{type:String,required:true},
    image:{type:String,required:true},
    year:{type:Number,required:true},
    category:{type:String,required:true},
    pricePerMonth:{type:Number,required:true},
    location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } 
  },
    description:{type:String,required:true},
    isAvailable:{type:Boolean,default:true}
},{timestamps:true})

const Items=mongoose.model('Items',AddItemSchema)

export default Items;