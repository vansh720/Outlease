import React from 'react';
import { useAppContext } from '../context/AppContext';
import { CalendarDays, MapPin, CheckCircle, Clock, XCircle } from 'lucide-react';

const MyBookings = () => {

  const { bookings } = useAppContext();

  const getStatusUI = (status) => {
    if (status === "confirmed") {
      return (
        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-semibold">
          <CheckCircle className="w-4 h-4" /> Confirmed
        </span>
      );
    }
    if (status === "pending") {
      return (
        <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md text-xs font-semibold">
          <Clock className="w-4 h-4" /> Pending
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs font-semibold">
        <XCircle className="w-4 h-4" /> Cancelled
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No bookings yet 😢
          </div>
        ) : (
          <div className="space-y-6">

            {bookings.map((b) => (
              <div 
                key={b._id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
              >

                <div className="flex flex-col sm:flex-row justify-between gap-4">

                  {/* LEFT */}
                  <div className="flex gap-4">

                    <img
                      src={b.item.image}
                      alt={b.item.itemName}
                      className="w-20 h-20 rounded-xl object-cover border"
                    />

                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {b.item.itemName}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {b.pickupLocation}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {new Date(b.pickupDate).toDateString()}
                        </span>

                        <span>→</span>

                        <span>
                          {new Date(b.returnDate).toDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-start sm:items-end justify-between">

                    {getStatusUI(b.status)}

                    <p className="text-lg font-bold text-gray-900 mt-2">
                      ₹{b.price}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default MyBookings;