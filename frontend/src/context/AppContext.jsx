import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const[showLogin,setShowLogin]=useState(false); 
  const[showRegister,setShowRegister]=useState(false)

  const [items, setItems] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // 🔥 Fetch user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/data');
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔥 Fetch items
  const fetchItems = async () => {
    try {
      const { data } = await axios.get('/api/user/items');
      if (data.success) setItems(data.items);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔥 Fetch bookings (USER)
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('/api/booking/user');
      if (data.success) setBookings(data.bookings);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔥 Create booking
  const createBooking = async (bookingData) => {
    try {
      const { data } = await axios.post('/api/user/create', bookingData);

      if (data.success) {
        toast.success("Booking Confirmed 🚀");
        fetchBookings(); // refresh dashboard
        navigate('/my-bookings');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common['Authorization'] = '';
    toast.success('Logged out');
  };

  // Init
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setToken(token);
    fetchItems();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
      fetchUser();
      fetchBookings();
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    items,
    setItems,
    bookings,
    setBookings,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,

    fetchItems,
    fetchBookings,
    createBooking,
    logout,
    fetchUser,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);