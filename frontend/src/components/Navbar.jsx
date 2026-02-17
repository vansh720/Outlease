import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (

    <nav className="w-full bg-[#0F172A] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <img
            src={assets.Logo}
            alt="Logo"
            className="w-28 md:w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <ul className="hidden md:flex items-center gap-8 font-medium">
            <NavLink
              to="/"
              className="hover:text-[#14B8A6] transition text-base"
            >
              Home
            </NavLink>

            <NavLink
              to="/search"
              className="hover:text-[#14B8A6] transition text-base"
            >
              Rent Items
            </NavLink>

            <NavLink
              to="/dashboard"
              className="hover:text-[#14B8A6] transition text-base"
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/support"
              className="hover:text-[#14B8A6] transition text-base"
            >
              Support
            </NavLink>

          </ul>

          <div className="flex items-center gap-4">
            {user && (
              <button
                onClick={() => navigate("/add-item")}
                className="bg-[#14B8A6] hover:bg-[#0D9488] px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Become a Seller
              </button>
            )}

            {user && (
              <>
                <img
                  src={assets.search_icon}
                  alt="search"
                  className="w-5 cursor-pointer hover:scale-110 transition"
                  onClick={() => navigate("/search")}
                />

                <img
                  src={assets.profile_icon}
                  alt="profile"
                  className="w-6 cursor-pointer hover:scale-110 transition"
                  onClick={() => navigate("/profile")}
                />
              </>
            )}

            {!user && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="border border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-[#14B8A6] hover:bg-[#0D9488] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
