import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { MapPin, Heart } from "lucide-react";
import ItemDetails from "./ItemDetails";
import Chat from "./Chat";

const AllItems = () => {
  const { items } = useAppContext();

  const [selectedItem, setSelectedItem] = useState(null);
  const [chatOwner, setChatOwner] = useState(null);

  if (chatOwner) {
    return (
      <Chat
        item={selectedItem}
        owner={chatOwner}
        onBack={() => setChatOwner(null)}
      />
    );
  }

  if (selectedItem) {
    return (
      <ItemDetails
        item={selectedItem}
        onBack={() => setSelectedItem(null)}
        onChat={() => setChatOwner(selectedItem.owner)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Explore All Items
        </h1>
        <p className="text-gray-500">
          Discover everything available in your area
        </p>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto">
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No items available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {items.map((item) => (
              <div
                key={item._id}
                onClick={() =>{
                  setSelectedItem(item)
                  window.scrollTo(0, 0);
                }} 
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
              >
                
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:text-red-500 transition">
                    <Heart className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-md text-xs font-semibold">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  
                  <h2 className="font-bold text-lg text-gray-900 mb-1">
                    {item.itemName}
                  </h2>

                  <p className="text-sm text-gray-500 mb-2">
                    {item.brand} • {item.model}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.locationName}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    Owner: {item.owner?.name}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t">
                    <span className="text-xl font-bold text-teal-600">
                      ₹{item.pricePerMonth}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 🔥 IMPORTANT
                        setSelectedItem(item);
                      }}
                      className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition"
                    >
                      Rent
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default AllItems;