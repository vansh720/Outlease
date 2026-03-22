import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {

  const { axios, navigate } = useAppContext();

  useEffect(() => {
    const createBooking = async () => {
      const bookingData = JSON.parse(localStorage.getItem("bookingData"));

      if (!bookingData) return;

      await axios.post('/api/booking/create', bookingData);

      localStorage.removeItem("bookingData");

      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000); // small delay for UX
    };

    createBooking();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-md w-full text-center border border-gray-100">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          Payment Successful 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-6">
          Your booking is being confirmed. Please wait...
        </p>

        {/* Loader */}
        <div className="flex justify-center mb-6">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Info Box */}
        <div className="bg-teal-50 text-teal-700 text-sm p-3 rounded-xl border border-teal-100">
          Redirecting you to your bookings...
        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;