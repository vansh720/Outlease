import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, CheckCircle, ShieldCheck, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';



const ItemDetails = ({ item, onBack, onChat }) => {

  const {
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    axios,
    navigate,
    fetchBookings
  } = useAppContext();

  const [pickupLocation, setPickupLocation] = useState("");

  // 🔥 Booking Handler
 const handleRequest = async () => {
  try {
    if (!pickupDate || !returnDate || !pickupLocation) {
      return alert("Fill all details");
    }

    const { data } = await axios.post('/api/booking/create-checkout', {
      item: item._id,
      pickupDate,
      returnDate,
      pickupLocation
    });

    console.log("STRIPE RESPONSE:", data);

    if (!data.success || !data.url) {
      return alert("Stripe session failed");
    }

    // Save before redirect
    localStorage.setItem("bookingData", JSON.stringify({
      item: item._id,
      pickupDate,
      returnDate,
      pickupLocation
    }));

    // ✅ NEW WAY (IMPORTANT)
    window.location.href = data.url;

  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Payment failed");
  }
};
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-teal-600 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to search
        </button>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            <div className="h-64 sm:h-96 rounded-2xl overflow-hidden relative shadow-sm">
              <img src={item.image} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-700 shadow-sm">
                {item.category}
              </div>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {item.itemName}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b border-gray-100 pb-6">
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <Star className="w-5 h-5 fill-current" /> {item.model}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" /> {item.locationName}
                </span>

                <span className="flex items-center gap-1 text-teal-600 bg-teal-50 px-2 py-1 rounded-md font-medium">
                  <CheckCircle className="w-4 h-4" /> Verified Item
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this item</h2>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Owner */}
            <div className="bg-slate-50 p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl">
                   {item.owner?.name?.charAt(0)}
                 </div>
                 <div>
                   <h3 className="font-bold text-gray-900">
                     Owned by {item.owner?.name}
                   </h3>
                   <p className="text-sm text-gray-500 mt-1">
                     Usually responds within an hour
                   </p>
                 </div>
               </div>
               
               <button 
                 onClick={onChat}
                 className="bg-white border-2 border-teal-100 text-teal-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-50 flex items-center gap-2"
               >
                 <MessageSquare className="w-4 h-4" />
                 Message {item.owner?.name}
               </button>
            </div>

          </div>

          {/* RIGHT (BOOKING) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border shadow-lg sticky top-24">

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-teal-600">
                  ₹{item.pricePerMonth}
                </span>
                <span className="text-gray-500 font-medium"> / Month</span>
              </div>

              {/* Inputs */}
              <div className="space-y-4 mb-6">
                <div className="border border-gray-300 rounded-xl overflow-hidden">

                  {/* Dates */}
                  <div className="flex border-b border-gray-300">
                    <div className="p-3 border-r w-1/2 bg-gray-50">
                      <label className="text-xs font-bold">Pick-up</label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-transparent outline-none"
                      />
                    </div>

                    <div className="p-3 w-1/2 bg-gray-50">
                      <label className="text-xs font-bold">Return</label>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="p-3">
                    <label className="text-xs font-bold">Pickup Location</label>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Enter pickup location"
                      className="w-full outline-none mt-1"
                    />
                  </div>

                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleRequest}
                className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition"
              >
                Request to Rent
              </button>

              <p className="text-center text-sm text-gray-500 mb-6">
                You won't be charged yet
              </p>

              {/* PRICE BREAKDOWN (UNCHANGED) */}
              <div className="space-y-3 pt-6 border-t">
                <div className="flex justify-between text-gray-600">
                  <span>₹{item.pricePerMonth} x 1 Month</span>
                  <span>₹{item.pricePerMonth}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Outlease Service Fee</span>
                  <span>₹{Math.round(item.pricePerMonth * 0.1)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    ₹{item.pricePerMonth + Math.round(item.pricePerMonth * 0.1)}
                  </span>
                </div>
              </div>

            </div>

            {/* Guarantee */}
            <div className="mt-6 flex gap-3 bg-teal-50 p-4 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-teal-600" />
              <p className="text-sm">Your deposit is secure with Outlease Guarantee.</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ItemDetails;