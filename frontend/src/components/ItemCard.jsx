import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const ItemCard = ({ item }) => {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/item/${item._id}`)}
      className="
        bg-white
        rounded-xl
        overflow-hidden
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition
        duration-300
        cursor-pointer
      "
    >

      {/* Image */}
      <div className="relative">

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />

        {/* Price Badge */}
        <div className="
          absolute top-3 right-3
          bg-[#14B8A6]
          text-white
          px-3 py-1
          rounded-lg
          text-sm
          font-medium
        ">
          ₹{item.price}/day
        </div>

      </div>

      {/* Content */}
      <div className="p-4">

        <h3 className="font-semibold text-lg text-[#0F172A]">
          {item.title}
        </h3>

        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin size={16} className="mr-1" />
          {item.location}
        </div>

        <p className="text-gray-400 text-sm mt-1">
          Owner: {item.owner}
        </p>

      </div>

    </div>
  );
};

export default ItemCard;
