import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const OwnerBookings = () => {

  const { axios } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    const { data } = await axios.get('/api/booking/owner');
    if (data.success) setBookings(data.bookings);
  };

  const updateStatus = async (id, status) => {
    await axios.post('/api/booking/change-status', {
      bookingId: id,
      status
    });
    fetchOwnerBookings();
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Owner Bookings</h1>

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 mb-4 rounded">

          <p><b>{b.item.itemName}</b></p>
          <p>User: {b.user.name}</p>

          <p>Status: {b.status}</p>

          <button onClick={() => updateStatus(b._id, "confirmed")} className="bg-green-500 text-white px-3 py-1 mr-2">
            Accept
          </button>

          <button onClick={() => updateStatus(b._id, "cancelled")} className="bg-red-500 text-white px-3 py-1">
            Reject
          </button>

        </div>
      ))}

    </div>
  );
};

export default OwnerBookings;