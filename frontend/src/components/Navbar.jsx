import React from "react";
import {
  Menu,
  X,
  Search,
  PlusCircle,
  ShoppingBag,
  RefreshCcw,
  Contact,
} from "lucide-react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast, { Toaster } from "react-hot-toast";

const Navbar = ({ searchQuery, setSearchQuery, onSearchClick }) => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={assets.Logo}
              alt="Outlease Logo"
              className="h-13 w-auto object-contain"
              onClick={() => navigate("/")}
            />
            <h1
              className="font-bold text-xl text-teal-500 font-sans"
              onClick={() => navigate("/")}
            >
              Outlease
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearchClick(); // 🔥 ENTER support
                }}
                placeholder="Search for appliances, cameras, tools..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search
                className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                onClick={onSearchClick}
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button
              className="flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full font-semibold hover:bg-teal-100 transition-colors"
              onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            >
              <PlusCircle className="w-5 h-5" />
              {isOwner ? "Dashboard" : "List an Item"}
            </button>
            <button
              className="flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full font-semibold hover:bg-teal-100 transition-colors"
              onClick={() => navigate("/support")}
            >
              <Contact className="w-5 h-5" />
              Support
            </button>
            {user && (
              <button
                className="text-gray-600 hover:text-teal-600 relative"
                onClick={() => navigate("/my-bookings")}
              >
                My Bookings
              </button>
            )}
            {user && isOwner && (
  <button onClick={() => navigate("/messages")}>
    Messages
  </button>
)}
            <button
              className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="text-gray-600">
              <ShoppingBag
                className="w-6 h-6"
                onClick={() => navigate("/my-bookings")}
              />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-4 shadow-lg absolute w-full">
          <div className="relative w-full mt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearchClick(); // 🔥 ENTER support
              }}
              placeholder="Search for appliances, cameras, tools..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              onClick={onSearchClick}
            />
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/owner/add-items")}
          >
            <PlusCircle className="w-5 h-5" />
            List an Item
          </button>
          <button
              className="w-full text-center text-gray-600 font-medium hover:text-teal-600 transition-colors"
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
            >
              {user ? "Logout" : "Login"}
            </button>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
