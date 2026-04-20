import Items from "../models/AddItem.js";
import Booking from "../models/Booking.js"
import transporter from "../configs/mailer.js";
import User from "../models/User.js";

//Function to check the availability of a item for a given date 
const checkAvailability = async(item,pickupDate,returnDate)=>{
    const bookings= await Booking.find({
        item,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate},
    })
    return bookings.length === 0;
}

//API to check availability of items for given date and location
export const checkAvailabilityOfItem = async(req,res)=>{
    try {
        const {location,pickupDate,returnDate}=req.body
        //fetch all available items for the given location
        const items= await Items.find({location,isAvailable:true})

        //check item availability for give date range using promise
        const availableItemsPromises = items.map(async(item)=>{
        const isAvailable= await checkAvailability(item._id,pickupDate,returnDate)
        return {...item._doc , isAvailable: isAvailable}
        })

        let availableItems = await Promise.all(availableItemsPromises);
        availableItems=availableItems.filter(item=>item.isAvailable===true)

        res.json({success:true,availableItems})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

//API to create a booking
export const createBooking = async(req,res)=>{
    try {
        const {_id}=req.user;
        const {item,pickupDate,returnDate,pickupLocation}=req.body;

        const isAvailable = await checkAvailability(item,pickupDate,returnDate)
        if(!isAvailable){
            return res.json({success:false,message:"Item is not available"})
        }

        const itemData = await Items.findById(item)
        const userData = await User.findById(_id);

        // Calculate days
        const picked=new Date(pickupDate)
        const returned=new Date(returnDate)
        const noOfDays = Math.ceil((returned-picked)/(1000*60*60*24))

        const pricePerDay = itemData.pricePerMonth / 30
        const price = Math.round(pricePerDay * noOfDays)

        await Booking.create({
            item,
            owner:itemData.owner,
            user:_id,
            pickupDate,
            returnDate,
            pickupLocation, 
            status: "completed",
            price
        })

    await transporter.sendMail({
      from: `"Outlease" <${process.env.EMAIL_USER}>`,
      to: userData.email,
      subject: "Booking Confirmation 🎉",
      html: `
        <h2>Booking Confirmed ✅</h2>
        <p>Hello ${userData.name},</p>
        <p>Your booking has been successfully confirmed.</p>

        <h3>Details:</h3>
        <ul>
          <li><b>Item:</b> ${itemData.itemName}</li>
          <li><b>Pickup Date:</b> ${pickupDate}</li>
          <li><b>Return Date:</b> ${returnDate}</li>
          <li><b>Location:</b> ${pickupLocation}</li>
          <li><b>Total Price:</b> ₹${itemData.pricePerMonth}</li>
        </ul>

        <p>Thank you for using Outlease 🚀</p>
      `,
    });

        res.json({success:true,message:"Booking Created and Confirmation email sent"})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

//API to list user Bookings
export const getUserBookings=async(req,res)=>{
    try {
        const {_id}=req.user;
        const bookings = await Booking.find({user:_id}).populate("item").sort({createdAt:-1})
        res.json({success:true, bookings})

    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

//API to get Owner bookings
export const getOwnerBookings=async(req,res)=>{
    try {
        if(req.user.role !=='owner'){
            return res.json({success:false,message:"Unauthorized"})
        }
        const bookings = await Booking.find({owner:req.user._id}).populate('item user').select("-user.password").sort({createdAt:-1})
        res.json({success:true, bookings})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

//API to change the booking status 
export const changeBookingStatus=async(req,res)=>{
    try {
        const {_id}=req.user;
        const{bookingId,status}=req.body
        const booking=await Booking.findById(bookingId)
        if(booking.owner.toString()!==_id.toString()){
            return res.json({success:false,message:"Unauthorized"})
        }
        booking.status=status;
        await booking.save();
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
