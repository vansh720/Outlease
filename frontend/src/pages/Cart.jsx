import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, MapPin } from 'lucide-react';

const Cart = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); 
  
  const [cartItems, setCartItems] = useState([
    {
      id: 5,
      name: "High-Speed Decorative Ceiling Fan",
      price: 150,
      period: "day",
      image: "https://images.unsplash.com/photo-1591102041235-9614c7729221?q=80&w=500&auto=format&fit=crop",
      quantity: 1
    },
    {
      id: 2,
      name: "Fully Automatic Front Load Washing Machine (8kg)",
      price: 150,
      period: "week",
      image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=500&auto=format&fit=crop",
      quantity: 1
    },
    {
      id: 3,
      name: "Samsung 55\" 4K UHD Smart TV",
      price: 300,
      period: "day",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=500&auto=format&fit=crop",
      quantity: 1
    },
    {
      id: 4,
      name: "Professional DSLR Camera",
      price: 200,
      period: "day",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
      quantity: 1
    },
    {
      id: 1,
      name: "1.5 Ton 5-Star Inverter Split AC",
      price: 200,
      period: "week",
      image: "https://images.unsplash.com/photo-1621360241104-79308e2fc57a?q=80&w=500&auto=format&fit=crop",
      quantity: 1
    }
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const insuranceFee = 250; 
  const deliveryFee = deliveryMethod === 'delivery' ? 500 : 0;
  const total = subtotal + insuranceFee + deliveryFee;

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] pb-24 pt-8 font-sans text-[#111827]">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#009688]">Home</Link>
              <span>/</span>
              <span className="text-[#009688]">Checkout Cart</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">
              My Rental <span className="text-[#009688]">Bucket.</span>
            </h1>
          </div>

          {/* Logistics Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-2xl w-fit border border-gray-200">
            <button 
              onClick={() => setDeliveryMethod('delivery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${deliveryMethod === 'delivery' ? 'bg-white text-[#009688] shadow-sm' : 'text-gray-500'}`}
            >
              <Truck size={16} /> Delivery
            </button>
            <button 
              onClick={() => setDeliveryMethod('pickup')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${deliveryMethod === 'pickup' ? 'bg-white text-[#009688] shadow-sm' : 'text-gray-500'}`}
            >
              <MapPin size={16} /> Self Pickup
            </button>
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="group bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm hover:border-[#009688]/30 transition-all flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Appliance'; }}
                    />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                    <p className="text-[#009688] font-black text-sm mt-1">
                        ₹{item.price.toLocaleString('en-IN')} 
                        <span className="text-gray-400 font-medium ml-1">/ {item.period}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-2 py-1">
                      <button className="p-1 text-gray-400 hover:text-[#009688] transition-colors"><Minus size={14}/></button>
                      <span className="px-3 font-bold text-sm">{item.quantity}</span>
                      <button className="p-1 text-gray-400 hover:text-[#009688] transition-colors"><Plus size={14}/></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 p-2 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Summary Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#111827] text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-24">
                <h2 className="text-xl font-bold mb-6 border-b border-gray-800 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Items Subtotal</span>
                    <span className="text-white font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span className="flex items-center gap-1 font-medium">Damage Protection <ShieldCheck size={12} className="text-teal-400"/></span>
                    <span className="text-white font-bold">₹{insuranceFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>{deliveryMethod === 'delivery' ? 'Delivery Fee' : 'Store Pickup'}</span>
                    <span className="text-white font-bold">{deliveryMethod === 'delivery' ? `₹${deliveryFee.toLocaleString('en-IN')}` : 'FREE'}</span>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-dashed border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Amount</span>
                      <span className="text-3xl font-black text-[#009688]">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#009688] hover:bg-[#00b3a3] text-white font-black py-4 rounded-2xl shadow-lg shadow-teal-900/40 transition-all active:scale-95 text-lg">
                  Confirm Rental
                </button>
                
                <div className="flex flex-col gap-2 mt-6">
                    <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest font-black">
                        100% Secure Payments
                    </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <ShoppingBag size={80} className="mx-auto text-gray-100 mb-6" />
            <h2 className="text-3xl font-black text-[#111827]">Your bucket is empty.</h2>
            <p className="text-gray-500 mt-2 mb-10">Start adding gear from your neighborhood!</p>
            <Link to="/" className="bg-[#009688] text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#00796b] shadow-xl shadow-teal-900/10 transition-all">
              Browse Items
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;