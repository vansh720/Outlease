import Items from "../models/AddItem.js";
import Booking from "../models/Booking.js";
import transporter from "../configs/mailer.js";
import User from "../models/User.js";

//Function to check the availability of a item for a given date
const checkAvailability = async (item, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    item,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });
  return bookings.length === 0;
};

//API to check availability of items for given date and location
export const checkAvailabilityOfItem = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    //fetch all available items for the given location
    const items = await Items.find({ location, isAvailable: true });

    //check item availability for give date range using promise
    const availableItemsPromises = items.map(async (item) => {
      const isAvailable = await checkAvailability(
        item._id,
        pickupDate,
        returnDate,
      );
      return { ...item._doc, isAvailable: isAvailable };
    });

    let availableItems = await Promise.all(availableItemsPromises);
    availableItems = availableItems.filter((item) => item.isAvailable === true);

    res.json({ success: true, availableItems });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to create a booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { item, pickupDate, returnDate, pickupLocation } = req.body;

    const isAvailable = await checkAvailability(item, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Item is not available" });
    }

    const itemData = await Items.findById(item);
    const userData = await User.findById(_id);

    // Calculate days
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));

    const pricePerDay = itemData.pricePerMonth / 30;
    const price = Math.round(pricePerDay * noOfDays);

    await Booking.create({
      item,
      owner: itemData.owner,
      user: _id,
      pickupDate,
      returnDate,
      pickupLocation,
      status: "completed",
      price,
    });

    await transporter.sendMail({
      from: `"Outlease" <${process.env.EMAIL_USER}>`,
      to: userData.email,
      subject: "Booking Confirmation 🎉",
      html: `
<div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
  
  <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background:#0f172a; color:white; padding:20px; text-align:center;">
      <h1 style="margin:0; font-size:22px;">Outlease</h1>
      <p style="margin:5px 0 0; font-size:14px; opacity:0.8;">
        Booking Confirmation
      </p>
    </div>

    <!-- Body -->
    <div style="padding:25px;">
      
      <h2 style="color:#111827;">Hi ${userData.name}, 👋</h2>
      
      <p style="color:#4b5563; font-size:15px;">
        Your booking has been successfully confirmed. Here are your details:
      </p>

      <!-- Card -->
      <div style="background:#f9fafb; padding:20px; border-radius:10px; margin-top:15px;">
        
        <p style="margin:8px 0;"><b>📦 Item:</b> ${itemData.itemName}</p>
        <p style="margin:8px 0;"><b>📅 Pickup:</b> ${new Date(pickupDate).toDateString()}</p>
        <p style="margin:8px 0;"><b>📅 Return:</b> ${new Date(returnDate).toDateString()}</p>
        <p style="margin:8px 0;"><b>📍 Location:</b> ${pickupLocation}</p>

        <hr style="margin:15px 0; border:none; border-top:1px solid #e5e7eb;" />

        <p style="font-size:18px; font-weight:bold; color:#059669;">
          💰 Total Price: ₹${price}
        </p>

      </div>

      <!-- CTA -->
      <div style="text-align:center; margin-top:25px;">
  <a href="${process.env.FRONTEND_URL}/my-bookings"
    style="background:#0f766e; color:white; padding:12px 20px; text-decoration:none; border-radius:8px; font-size:14px;">
    View My Bookings
  </a>
</div>

      <p style="margin-top:30px; font-size:13px; color:#6b7280;">
        If you have any questions, feel free to contact support.
      </p>

    </div>

    <!-- Footer -->
    <div style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#6b7280;">
      © 2026 Outlease Marketplace • All rights reserved
    </div>

  </div>
</div>
`,
    });

    res.json({
      success: true,
      message: "Booking Created and Confirmation email sent",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to list user Bookings
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ user: _id })
      .populate("item")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to get Owner bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("item user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to change the booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    booking.status = status;
    await booking.save();
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
