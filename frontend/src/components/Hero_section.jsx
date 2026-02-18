import React from 'react'
import { assets } from '../assets/assets'

const hero_section = () => {
  return (
    <div>
      {/* HERO SECTION */}
            <section className="relative bg-[#0F172A] text-white overflow-hidden">
      
        {/* Gradient Accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#0D9488]/20"></div>
      
        {/* Glow Effect */}
        <div className="
          absolute
          top-0 right-0
          w-[500px]
          h-[500px]
          bg-[#14B8A6]
          opacity-20
          blur-[120px]
          rounded-full
        "></div>
      
        {/* Content */}
        <div className="
          relative
          max-w-7xl
          mx-auto
          px-6
          pt-20
          pb-24
          flex
          flex-col
          md:flex-row
          items-center
          gap-12
        ">
      
          {/* LEFT SIDE */}
          <div className="flex-1">
      
            {/* Badge */}
            <div className="
              inline-block
              bg-[#14B8A6]/10
              border border-[#14B8A6]/30
              text-[#14B8A6]
              px-4 py-1
              rounded-full
              text-sm
              mb-6
            ">
              Rent smarter. Earn faster.
            </div>
      
            {/* Heading */}
            <h1 className="
              text-4xl
              md:text-6xl
              font-bold
              leading-tight
              mb-6
            ">
              Rent Anything
              <br />
              <span className="text-[#14B8A6]">
                Near You
              </span>
            </h1>
      
            {/* Subtext */}
            <p className="text-gray-400 mb-8 max-w-lg">
              Outlease connects people who want to rent items with those who have items to share.
              Save money or earn passive income easily.
            </p>
      
            {/* Search Bar */}
            <div className="
              bg-white/5
              border border-white/10
              backdrop-blur-lg
              rounded-xl
              p-2
              flex
              items-center
              max-w-md
            ">
      
              <input
                type="text"
                placeholder="Search cameras, bikes..."
                className="
                  flex-1
                  bg-transparent
                  outline-none
                  px-3 py-2
                  text-white
                  placeholder-gray-500
                "
              />
      
              <button className="
                bg-[#14B8A6]
                hover:bg-[#0D9488]
                px-6
                py-2
                rounded-lg
                font-medium
                transition
              ">
                Search
              </button>
      
            </div>
      
            {/* Buttons */}
            <div className="flex gap-4 mt-6">
      
              <button className="
                bg-[#14B8A6]
                hover:bg-[#0D9488]
                px-6 py-3
                rounded-lg
                font-medium
                transition
              ">
                Browse Items
              </button>
      
              <button className="
                border border-[#14B8A6]
                text-[#14B8A6]
                hover:bg-[#14B8A6]
                hover:text-white
                px-6 py-3
                rounded-lg
                transition
              ">
                Become Seller
              </button>
      
            </div>
      
          </div>
      
          {/* RIGHT SIDE IMAGE */}
          <div className="flex-1 relative">
      
            <img
              src={assets.hero_section}
              alt="hero"
              className="
                w-full
                max-h-[500px]
                object-contain
                relative
                z-10
              "
            />
      
          </div>
      
        </div>
      
        {/* Bottom fade transition */}
        <div className="
          absolute
          bottom-0
          left-0
          w-full
          h-20
          bg-gradient-to-t
          from-[#F8FAFC]
          to-transparent
        "></div>
      
      </section>
    </div>
  )
}

export default hero_section

