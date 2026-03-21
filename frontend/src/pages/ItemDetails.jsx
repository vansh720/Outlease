import React from 'react';
import { ArrowLeft, Star, MapPin, CheckCircle, ShieldCheck,MessageSquare} from 'lucide-react';

const ItemDetails = ({ item, onBack, onChat }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-teal-600 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to search
        </button>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Image & Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="h-64 sm:h-96 rounded-2xl overflow-hidden relative shadow-sm">
              <img src={item.image} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-700 shadow-sm">
                {item.category}
              </div>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{item.itemName}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b border-gray-100 pb-6">
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <Star className="w-5 h-5 fill-current" /> {item.model}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" /> {item.locationName}
                </span>
                <span className="flex items-center gap-1 text-teal-600 bg-teal-50 px-2 py-1 rounded-md font-medium">
                  <CheckCircle className="w-4 h-4" /> Verified Item
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this item</h2>
              <p className="text-gray-600 leading-relaxed">
                {item.description || "This item is in excellent condition and works perfectly. It has been well-maintained and is ready for your immediate use. Please feel free to reach out if you have any specific questions about its features or specifications before renting."}
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl shrink-0">
                   {item.owner?.name?.charAt(0)}
                 </div>
                 <div>
                   <h3 className="font-bold text-gray-900">Owned by {item.owner?.name}</h3>
                   <p className="text-sm text-gray-500 mt-1">Usually responds within an hour. 100% rental completion rate.</p>
                 </div>
               </div>
               
               <button 
                 onClick={onChat}
                 className="w-full sm:w-auto bg-white border-2 border-teal-100 text-teal-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
               >
                 <MessageSquare className="w-4 h-4" /> Message {item.owner?.name}
               </button>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg sticky top-24">
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-teal-600">₹{item.pricePerMonth}</span>
                <span className="text-gray-500 font-medium"> / Month</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition-all">
                   <div className="flex border-b border-gray-300">
                     <div className="p-3 border-r border-gray-300 w-1/2 bg-gray-50">
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pick-up</label>
                       <input type="date" className="w-full text-sm text-gray-900 outline-none bg-transparent cursor-pointer" />
                     </div>
                     <div className="p-3 w-1/2 bg-gray-50">
                       <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Return</label>
                       <input type="date" className="w-full text-sm text-gray-900 outline-none bg-transparent cursor-pointer" />
                     </div>
                   </div>
                </div>
              </div>

              <button className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 mb-4">
                Request to Rent
              </button>
              
              <p className="text-center text-sm text-gray-500 mb-6">You won't be charged yet</p>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>₹{item.pricePerMonth} x 1 Month</span>
                  <span>₹{item.pricePerMonth}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="underline decoration-dashed decoration-gray-400 cursor-help">Outlease Service Fee</span>
                  <span>₹{Math.round(item.pricePerMonth * 0.1)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-100 text-lg">
                  <span>Total (Before Taxes)</span>
                  <span>₹{item.pricePerMonth + Math.round(item.pricePerMonth * 0.1)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-start gap-3 bg-teal-50 text-teal-800 p-4 rounded-2xl border border-teal-100">
              <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">This rental is covered by the Outlease Guarantee. Your deposit is secure.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
