import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => (
  <footer className="bg-slate-950 text-gray-400 py-12 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
             <img 
              src={assets.Logo} 
              alt="Outlease Logo" 
              className="h-8 w-auto object-contain grayscale brightness-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150x40?text=OUTLEASE';
              }}
            />
          </div>
          <p className="text-sm text-slate-500">
            The smartest way to consume. Borrow what you need, lend what you don't, and build a more sustainable community.
          </p>
        </div>
        
        <div>
          <h4 className="text-slate-200 font-bold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-400 transition-colors">Home Appliances</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Furniture</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Electronics & IT</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Photography</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Power Tools</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-slate-200 font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Trust & Safety</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Rental Agreement</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Damage Protection</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-slate-200 font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-slate-800 text-sm text-center md:flex md:justify-between md:text-left">
        <p>© 2026 Outlease Marketplace. All rights reserved.</p>
        <div className="mt-4 md:mt-0 space-x-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer
