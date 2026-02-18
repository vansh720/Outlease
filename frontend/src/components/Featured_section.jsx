import React from "react";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Featured_section = () => {
  const navigate = useNavigate();

  const items = [
    {
      _id: "1",
      title: "Canon DSLR Camera",
      price: 300,
      location: "Chandigarh",
      owner: "Rahul",
      image: assets.sample_item,
    },
    {
      _id: "2",
      title: "Mountain Bike",
      price: 150,
      location: "Mohali",
      owner: "Alok",
      image: assets.sample_item,
    },
    {
      _id: "3",
      title: "Gaming Laptop",
      price: 500,
      location: "Delhi",
      owner: "Neha",
      image: assets.sample_item,
    },
    {
      _id: "4",
      title: "GoPro Camera",
      price: 200,
      location: "Panchkula",
      owner: "Vansh",
      image: assets.sample_item,
    },
  ];
  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC]"></div>
        <div
          className="
    absolute
    top-20
    left-[-100px]
    w-[300px]
    h-[300px]
    bg-[#14B8A6]
    opacity-10
    blur-[120px]
    rounded-full
  "
        ></div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div
                className="
          inline-block
          text-[#14B8A6]
          bg-[#14B8A6]/10
          px-4 py-1
          rounded-full
          text-sm
          font-medium
          mb-3
        "
              >
                Featured Collection
              </div>

              <h2
                className="
          text-3xl
          md:text-4xl
          font-bold
          text-[#0F172A]
        "
              >
                Popular Rentals Near You
              </h2>

              <p className="text-gray-500 mt-2">
                Discover the most rented items in your area
              </p>
            </div>

            <button
              onClick={() => navigate("/search")}
              className="
          hidden md:block
          bg-[#14B8A6]
          hover:bg-[#0D9488]
          text-white
          px-6 py-3
          rounded-lg
          font-medium
          transition
        "
            >
              View All Items
            </button>
          </div>

          {/* Cards Grid */}
          <div
            className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-8
    "
          >
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>

          {/* Mobile button */}
          <div className="text-center mt-10 md:hidden">
            <button
              onClick={() => navigate("/search")}
              className="
          bg-[#14B8A6]
          hover:bg-[#0D9488]
          text-white
          px-6 py-3
          rounded-lg
          font-medium
        "
            >
              View All Items
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featured_section;
