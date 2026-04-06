import React, { useState, useRef,useEffect} from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/owner/Dashboard";
import AddItem from "./pages/owner/AddItem";
import ItemDetails from "./pages/ItemDetails";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import Navbar from "./components/Navbar";
import Layout from "./pages/owner/Layout";
import ManageItems from "./pages/owner/ManageItems";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import RentalMap from "./components/RentalMap";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import ManageBookings from "./pages/owner/ManageBookings";
import MyBookings from "./pages/Mybookings";
import PaymentSuccess from "./pages/PaymentSuccess";
import AllItems from "./pages/AllItems";
import ScrollToTop from "./components/ScrollToTop";
import Messages from "./pages/Messages";
import { socket } from "./services/Socket";

const App = () => {
  const { showLogin, showRegister ,user } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  const [searchQuery, setSearchQuery] = useState("");
  const featuredRef = useRef(null);
  const handleSearchScroll = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
  if (user?._id) {
    socket.emit("join", user._id);
  }
}, [user]);
  return (
    <>
      <Toaster />
      <ScrollToTop />
      {showLogin && <Login />}
      {showRegister && <Register />}
      {!isOwnerPath && (
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchClick={handleSearchScroll}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              featuredRef={featuredRef}
            />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/chat/:userId/:otherUserId" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="support" element={<Support />} />
        <Route path="/all-items" element={<AllItems />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/messages" element={<Messages />} />

        <Route path="map" element={<RentalMap />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-items" element={<AddItem />} />
          <Route path="manage-items" element={<ManageItems />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
