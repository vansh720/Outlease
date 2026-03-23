import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { MapPin, CalendarDays } from 'lucide-react';

const MyBookings = () => {

  const { bookings, fetchBookings } = useAppContext();

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">
            <p className="text-lg font-medium">No bookings yet 😢</p>
            <p className="text-sm mt-2">Start renting something awesome!</p>
          </div>
        ) : (

          <div className="space-y-5">

            {bookings.map((b) => (

              <div
                key={b._id}
                className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition"
              >

                <div className="flex justify-between gap-4 flex-col sm:flex-row">

                  {/* LEFT */}
                  <div className="flex gap-4">

                    <img
                      src={b.item?.image}
                      alt={b.item?.itemName}
                      className="w-20 h-20 rounded-xl object-cover border"
                    />

                    <div>
                      <h2 className="font-bold text-lg text-gray-900">
                        {b.item?.itemName}
                      </h2>

                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {b.pickupLocation}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(b.pickupDate).toDateString()}
                        <span>→</span>
                        {new Date(b.returnDate).toDateString()}
                      </div>
                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-start sm:items-end justify-between">

                    {/* Status */}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                      ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : b.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}>
                      {b.status}
                    </span>

                    {/* Price */}
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