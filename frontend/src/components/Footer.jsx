import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          {/* BRAND */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">OUTLEASE</h2>
            <p className="text-sm text-slate-500">
              Rent smarter. Discover items around you, list what you own, and connect instantly.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/all-items" className="hover:text-teal-400 transition">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-teal-400 transition">
                  Explore Map
                </Link>
              </li>
              <li>
                <Link to="/all-items?sort=latest" className="hover:text-teal-400 transition">
                  New Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/owner/" className="hover:text-teal-400 transition">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-teal-400 transition">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/messages" className="hover:text-teal-400 transition">
                  Messages
                </Link>
              </li>
            </ul>
          </div>

          {/* OWNER */}
          <div>
            <h4 className="text-white font-semibold mb-4">Owner</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/owner/add-items" className="hover:text-teal-400 transition">
                  List an Item
                </Link>
              </li>
              <li>
                <Link to="/owner/manage-items" className="hover:text-teal-400 transition">
                  Manage Items
                </Link>
              </li>
              <li>
                <Link to="/owner/manage-bookings" className="hover:text-teal-400 transition">
                  Manage Bookings
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Outlease Marketplace. All rights reserved.</p>

          <div className="flex gap-6">
            <Link to="/support" className="hover:text-white transition">
              Support
            </Link>
            <Link to="/profile" className="hover:text-white transition">
              Profile
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;