import imagekit from "../configs/imageKit.js"
import Items from "../models/AddItem.js"
import Booking from "../models/Booking.js"
import User from "../models/User.js"
import fs from 'fs'

//Api to change role
export const changeRoleToOwner = async (req,res)=>{
    try {
        const {_id}=req.user
        await User.findByIdAndUpdate(_id,{role:"owner"})
        res.json({success:true,message:"Now you can list cars"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

// API to list items
export const addItem=async(req,res)=>{
    try {
        const {_id}=req.user;
        let item=JSON.parse(req.body.itemData)
        const imageFile=req.file;

        //Upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response=await imagekit.upload({
            file: fileBuffer,
            fileName:imageFile.originalname,
            folder:'/items'
        })

        // optimizing through imagekit URL transformation
        var optimizedImageUrl=imagekit.url({
            path: response.filePath,
            transformation:[
                {width:'1200'},
                {quality:"auto"},
                {format:'webp'}
            ]
        })

        const image = optimizedImageUrl;
        await Items.create({...item,owner:_id,image})
        res.json({success:true,message:"Item added"})
        
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

//API to list items by owner
export const getOwnerItems = async(req,res)=>{
    try {
        const {_id}=req.user
        const items = await Items.find({owner:_id})
        res.json({success:true,items})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

//API to toggle item availability
export const toggleItemAvailability = async(req,res)=>{
    try {
        const {_id}=req.user
        const {itemId} = req.body
        const item = await Items.findById(itemId)

        //Checking if item belongs to user
        if(item.owner.toString()!==_id.toString()){
            return res.json({success:false,message:"Unauthorised"})
        }
        item.isAvailable = !item.isAvailable
        await item.save()
        
        res.json({success:true,message:"Availability toggled"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

//API to delete item
export const deleteItem = async(req,res)=>{
    try {
        const {_id}=req.user
        const {itemId} = req.body
        const item = await Items.findById(itemId)

        //Checking if item belongs to user
        if(item.owner.toString()!==_id.toString()){
            return res.json({success:false,message:"Unauthorised"})
        }
        item.owner= null;
        item.isAvailable= false
        await item.save()
        
        res.json({success:true,message:"Item removed"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

//API to get dashboard data
export const getDashboardData = async()=>{
    try {
        const {_id,role}=req.user
        if(role !=='owner'){
            return res.json({success:false,message:"Unauthorized"})
        }

        const items=await Items.find({owner:_id})
        const bookings=await Booking.find({owner:_id}).populate('item').sort({createdAt:-1})
        
        const pendingBookings=await Booking.find({owner:_id,status:"pending"})
        const completedBookings=await Booking.find({owner:_id,status:"confirmed"})

        //Calculate monthlyRevenue
        const monthlyRevenue = bookings.slice().filter(booking=>booking.status==='confirmed').reduce((acc,booking)=>acc+booking.price,0)

        const dashboardData = {
            totalItems : items.length,
            totalBookings: bookings.length,
            pendingBookings:pendingBookings.length,
            completedBookings:completedBookings.length,
            recentBookings:bookings.slice(0,3),
            monthlyRevenue
        }

        res.json({success:true,dashboardData})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

//API to update user Image
export const updateUserImage = async(req,res)=>{
    try {
        const {_id}=req.user;
        const imageFile=req.file;

        //Upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response=await imagekit.upload({
            file: fileBuffer,
            fileName:imageFile.originalname,
            folder:'/users'
        })

        // optimizing through imagekit URL transformation
        var optimizedImageUrl=imagekit.url({
            path: response.filePath,
            transformation:[
                {width:'400'},
                {quality:"auto"},
                {format:'webp'}
            ]
        })

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id,{image})
        res.json({success:true,message:"Profile picture updated",image})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}