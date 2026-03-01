import React, { useState } from 'react';
import { 
  Search, Menu, ShoppingBag, PlusCircle, Star, MapPin, 
  ShieldCheck, Zap, RefreshCcw, ChevronRight, X, Heart
} from 'lucide-react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import EarnBanner from '../components/EarnBanner';
import ItemDetails from './ItemDetails';

// --- MOCK DATA ---
const CATEGORIES = [
  "All Items", "Appliances", "Furniture", "Electronics", 
  "Photography", "Camping", "Party Supplies", "Tools"
];

const FEATURED_ITEMS = [
  {
    id: 1,
    title: "Whirlpool 265L Frost Free Refrigerator",
    category: "Appliances",
    price: 850,
    period: "month",
    rating: 4.8,
    reviews: 24,
    location: "Downtown Area, 2km away",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Th8JRCbSiO10pJUT5hevz0_0-GhIihCK2w&s",
    owner: "Sarah M."
  },
  {
    id: 2,
    title: "Voltas 1.5 Ton Split AC",
    category: "Appliances",
    price: 1200,
    period: "month",
    rating: 4.9,
    reviews: 18,
    location: "Westside, 5km away",
    image: "https://static.vecteezy.com/system/resources/thumbnails/049/858/488/small/dive-into-the-remarkable-efficiency-of-a-contemporary-hvac-system-which-guarantees-optimal-heating-and-cooling-performance-in-residential-spaces-enhancing-comfort-and-energy-savings-photo.jpg",
    owner: "Rahul K."
  },
  {
    id: 3,
    title: "Sony Alpha A7III Mirrorless Camera",
    category: "Photography",
    price: 1500,
    period: "day",
    rating: 5.0,
    reviews: 42,
    location: "City Center, 1km away",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
    owner: "Alex P."
  },
  {
    id: 4,
    title: "Bosch 7kg Front Load Washing Machine",
    category: "Appliances",
    price: 700,
    period: "month",
    rating: 4.6,
    reviews: 15,
    location: "North Suburbs, 8km away",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=600",
    owner: "Priya S."
  },
  {
    id: 5,
    title: "Ergonomic Office Chair",
    category: "Furniture",
    price: 300,
    period: "month",
    rating: 4.7,
    reviews: 9,
    location: "Eastside, 3km away",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600",
    owner: "David L."
  },
  {
    id: 6,
    title: "Makita 18V Cordless Drill Set",
    category: "Tools",
    price: 200,
    period: "day",
    rating: 4.9,
    reviews: 31,
    location: "South Park, 4km away",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600",
    owner: "Mike T."
  }
];

const Hero = () => {
  const Navigate= useNavigate()
  const [mode, setMode] = useState('rent'); 

  return (
    <div className="relative bg-white overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 border-b border-gray-100">
      {/* Modern abstract animated background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Interactive Content */}
          <div className="text-center lg:text-left">
            {/* Mode Toggle */}
            <div className="inline-flex bg-gray-100/80 backdrop-blur-sm rounded-full p-1.5 mb-8 shadow-inner border border-gray-200">
              <button
                onClick={() => setMode('rent')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  mode === 'rent' ? 'bg-white text-teal-600 shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                I want to Rent
              </button>
              <button
                onClick={() => setMode('lend')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  mode === 'lend' ? 'bg-white text-slate-800 shadow-md transform scale-105' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                I want to Earn
              </button>
            </div>

            {/* Dynamic Text Container (Fixed height to prevent layout shift) */}
            <div className="h-56 sm:h-48 relative">
              {/* Rent Content */}
              <div className={`absolute inset-0 transition-all duration-500 transform ${mode === 'rent' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                  Access what you need, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">without buying it.</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                  From power tools to party supplies. Rent high-quality items from people in your neighborhood for a fraction of the cost.
                </p>
              </div>
              
              {/* Lend Content */}
              <div className={`absolute inset-0 transition-all duration-500 transform ${mode === 'lend' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                  Turn your idle items <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">into extra income.</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                  Your unused camera, drill, or camping gear could be making you money. List it securely and start earning today.
                </p>
              </div>
            </div>

            {/* Interactive Search / Action Bar */}
            <div className="mt-8 max-w-xl mx-auto lg:mx-0 pt-10">
              {mode === 'rent' ? (
                <div className="flex flex-col sm:flex-row gap-3 bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 relative z-20 ">
                  <div className="flex-1 flex items-center px-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="What are you looking for?" className="w-full bg-transparent border-none focus:ring-0 px-3 py-3.5 text-gray-700 outline-none placeholder-gray-400" />
                  </div>
                  <button className="bg-teal-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200/50 w-full sm:w-auto">
                    Search
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 relative z-20">
                  <button className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-200/50 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                    <PlusCircle className="w-5 h-5" /> Start Earning Now
                  </button>
                  <button className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm" onClick={()=>Navigate("/owner")}>
                    Estimate Earnings
                  </button>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                <div className="bg-green-100 p-1 rounded-full"><ShieldCheck className="w-4 h-4 text-green-600" /></div> Verified Users
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                <div className="bg-blue-100 p-1 rounded-full"><ShieldCheck className="w-4 h-4 text-blue-600" /></div> Insured Rentals
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Visual Stack */}
          <div className="relative h-[450px] hidden lg:block perspective-1000 mt-10">
            {/* Hover area triggering the group spread */}
            <div className="absolute inset-0 group cursor-pointer z-30">
              
              {/* Card 1 - Back */}
              <div className="absolute top-10 right-24 w-64 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-700 ease-out group-hover:-translate-y-12 group-hover:translate-x-12 group-hover:rotate-6 z-10 opacity-80 group-hover:opacity-100">
                <img src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=400" alt="Chair" className="w-full h-32 object-cover rounded-xl mb-3" />
                <div className="flex justify-between items-center mb-2">
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                  <div className="h-4 w-12 bg-gray-100 rounded"></div>
                </div>
                <div className="h-3 w-1/3 bg-gray-100 rounded"></div>
              </div>

              {/* Card 2 - Middle */}
              <div className="absolute top-20 right-12 w-72 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-700 ease-out group-hover:-translate-x-16 group-hover:-translate-y-4 group-hover:-rotate-3 z-20 opacity-95 group-hover:opacity-100">
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400" alt="Camera" className="w-full h-40 object-cover rounded-xl mb-3" />
                <div className="flex justify-between items-center mb-2">
                  <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                  <div className="h-6 w-16 bg-purple-100 rounded-full"></div>
                </div>
                <div className="h-3 w-1/3 bg-gray-100 rounded"></div>
              </div>

              {/* Card 3 - Front Main */}
              <div className="absolute top-32 right-32 w-80 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.15)] border border-white/50 transform transition-all duration-700 ease-out group-hover:translate-y-6 group-hover:-translate-x-2 group-hover:scale-105 z-30">
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-12 flex items-center gap-1 border-2 border-white">
                  <Star className="w-3 h-3 fill-current" /> Popular
                </div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Th8JRCbSiO10pJUT5hevz0_0-GhIihCK2w&s" alt="Fridge" className="w-full h-48 object-cover rounded-2xl mb-4 shadow-inner" />
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Whirlpool 265L Fridge</h3>
                    <p className="text-gray-500 text-xs mt-1.5 flex items-center gap-1"><MapPin className="w-3 h-3"/> 2km away</p>
                  </div>
                  <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-lg text-sm font-bold border border-teal-100">
                    ₹850<span className="text-xs font-normal text-teal-500">/mo</span>
                  </div>
                </div>
                
                {/* Dynamically changing CTA based on mode */}
                {mode === 'rent' ? (
                   <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md">
                     Request to Rent
                   </button>
                ) : (
                   <div className="w-full mt-4 bg-green-50 border border-green-200 text-green-700 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm">
                     <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                     Currently Earning ₹850/mo
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global styles for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}} />
    </div>
  );
};

const ItemCard = ({ item, onClick }) => (
  <div onClick={() => onClick(item)} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full">
    <div className="relative h-48 overflow-hidden">
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-500 hover:text-red-500 transition-colors shadow-sm">
        <Heart className="w-5 h-5" />
      </button>
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-gray-700 shadow-sm">
        {item.category}
      </div>
    </div>
    
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2">{item.title}</h3>
      </div>
      
      <div className="flex items-center gap-1 text-sm text-amber-500 font-medium mb-3">
        <Star className="w-4 h-4 fill-current" />
        <span>{item.rating}</span>
        <span className="text-gray-400 font-normal">({item.reviews} reviews)</span>
      </div>
      
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
        <MapPin className="w-4 h-4" />
        <span className="truncate">{item.location}</span>
      </div>
      
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <span className="text-xl font-extrabold text-teal-600">₹{item.price}</span>
          <span className="text-gray-500 text-sm"> / {item.period}</span>
        </div>
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            onClick(item); 
          }}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          Rent
        </button>
      </div>
    </div>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-teal-600" />,
      title: "1. Find & Request",
      desc: "Browse local items, check availability, and send a rental request to the owner."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
      title: "2. Verify & Pay",
      desc: "Securely pay through our platform. All users and transactions are verified."
    },
    {
      icon: <RefreshCcw className="w-8 h-8 text-teal-600" />,
      title: "3. Use & Return",
      desc: "Pick up the item, use it for your specified time, and return it safely."
    }
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Outlease Works</h2>
          <p className="text-gray-600 text-lg">A safe, simple, and sustainable way to access the things you need without buying them.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
              
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-gray-300">
                  <ChevronRight className="w-10 h-10" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};





export default function App() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [selectedItem, setSelectedItem] = useState(null);
  const Navigate= useNavigate();
  const filteredItems = activeCategory === "All Items" 
    ? FEATURED_ITEMS 
    : FEATURED_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-teal-100 selection:text-teal-900">
      <main>
        {selectedItem ? (
          /* Render the Item Details view if an item is selected */
          <ItemDetails item={selectedItem} onBack={() => setSelectedItem(null)} />
        ) : (
          <>
        <Hero/>
        {/* Marketplace Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Available near you</h2>
              <p className="text-gray-600">Discover appliances, electronics, and more in your neighborhood.</p>
            </div>
            <button className="text-teal-600 font-semibold flex items-center gap-1 hover:text-teal-700 transition-colors" onClick={()=>Navigate("/map")}>
              View Map <MapPin className="w-4 h-4" />
            </button>
          </div>

          {/* Categories Pills */}
          <div className="flex overflow-x-auto pb-4 mb-6 gap-3 hide-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} onClick={setSelectedItem}/>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No items found in this category right now.</p>
            </div>
          )}
          
          <div className="mt-12 text-center">
            <button className="bg-white border-2 border-gray-200 text-gray-800 px-8 py-3 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-colors">
              Load More Items
            </button>
          </div>
        </section>

        <HowItWorks />
        <EarnBanner />
        </>
        )}
      </main>
    </div>
  );
}