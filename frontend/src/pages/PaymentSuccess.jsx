import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {

  const { axios, navigate, fetchBookings } = useAppContext();

  useEffect(() => {

    const createBooking = async () => {
      try {
        const bookingData = JSON.parse(localStorage.getItem("bookingData"));

        if (!bookingData) return;

        // ✅ Create booking
        const res = await axios.post('/api/booking/create', bookingData);

        if (res.data.success) {

          // ✅ Update state
          await fetchBookings();

          // ✅ Clear storage
          localStorage.removeItem("bookingData");

          // ✅ Delay for smooth UX
          setTimeout(() => {
            navigate('/my-bookings');
          }, 1200);
        }

      } catch (error) {
        console.log(error);
      }
    };

    createBooking();

  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md w-full border">

        <div className="flex justify-center mb-5">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-500 mb-4">
          Your booking is being confirmed...
        </p>

        <div className="flex justify-center">
          <div className="w-6 h-6 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;