import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0F172A] text-white shadow-md py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <img
            src={assets.Logo}
            alt="logo"
            className="w-28 md:w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <ul className="hidden md:flex items-center gap-8 font-medium">
            <NavLink to="/" className="hover:text-[#14B8A6] transition">
              Home
            </NavLink>

            <NavLink to="/search" className="hover:text-[#14B8A6] transition">
              Rent Items
            </NavLink>

            <NavLink
              to="/dashboard"
              className="hover:text-[#14B8A6] transition"
            >
              Dashboard
            </NavLink>

            <NavLink to="/support" className="hover:text-[#14B8A6] transition">
              Support
            </NavLink>
          </ul>

          <div className="flex items-center gap-3">
            {!user && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="border border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white px-3 py-1.5 rounded-lg text-sm transition"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-[#14B8A6] hover:bg-[#0D9488] text-white px-3 py-1.5 rounded-lg text-sm transition"
                >
                  Register
                </button>
              </>
            )}

            {user && (
              <>
                <button
                  onClick={() => navigate("/add-item")}
                  className="hidden md:block bg-[#14B8A6] hover:bg-[#0D9488] px-4 py-2 rounded-lg text-sm transition"
                >
                  Become Seller
                </button>

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

            <img
              src={assets.menu_icon}
              alt="menu"
              className="w-6 cursor-pointer md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-gray-700">
          <ul className="flex flex-col gap-4 p-4 font-medium">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#14B8A6]"
            >
              Home
            </NavLink>

            <NavLink
              to="/search"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#14B8A6]"
            >
              Rent Items
            </NavLink>

            <NavLink
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#14B8A6]"
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/support"
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#14B8A6]"
            >
              Support
            </NavLink>

            {user && (
              <button
                onClick={() => {
                  navigate("/add-item");
                  setMenuOpen(false);
                }}
                className="bg-[#14B8A6] px-4 py-2 rounded-lg text-sm"
              >
                Become Seller
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
