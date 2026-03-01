import React from 'react'
import { Menu, X, Search, PlusCircle, ShoppingBag, RefreshCcw, Contact } from 'lucide-react';
import { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              onClick={()=>navigate("/")}
            />
            <h1 className='font-bold text-xl text-teal-500 font-sans' onClick={()=>navigate("/")}>Outlease</h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for appliances, cameras, tools..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-gray-600 hover:text-teal-600 font-medium transition-colors" onClick={()=>navigate("/login")}>
              Log in
            </button>
            <button className="flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full font-semibold hover:bg-teal-100 transition-colors" onClick={()=> navigate("/owner/add-items")}>
              <PlusCircle className="w-5 h-5" />
              List an Item
            </button>
             <button className="flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full font-semibold hover:bg-teal-100 transition-colors" onClick={()=> navigate("/support")}>
              <Contact className="w-5 h-5" />
              Support
            </button>
            <button className="text-gray-600 hover:text-teal-600 relative" onClick={()=>navigate("/cart")}>
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="text-gray-600">
              <ShoppingBag className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              placeholder="Search items..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold" onClick={()=> navigate("/owner/add-items")}>
            <PlusCircle className="w-5 h-5" />
            List an Item
          </button>
          <button className="w-full text-center text-gray-600 font-medium py-2" onClick={()=>navigate("/login")}>
            Log in / Sign up
          </button>
        </div>
      )}
    </nav>
  );
};
export default Navbar