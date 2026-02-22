import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ShieldCheck, Zap, RefreshCcw } from 'lucide-react';
const EarnBanner = () => {
    const navigate= useNavigate()
    return(
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl border border-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        
        <div className="relative px-8 py-16 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center md:text-left text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Got items gathering dust? <br className="hidden md:block" /> Turn them into cash.</h2>
            <p className="text-slate-300 text-lg mb-8">
              List your unused appliances, cameras, tools, or furniture. We handle the verification, payments, and insurance so you can rent out with peace of mind.
            </p>
            <ul className="space-y-3 mb-8 text-slate-200 text-left mx-auto md:mx-0 max-w-md">
              <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-teal-400" /> ₹50,000 Damage Protection</li>
              <li className="flex items-center gap-3"><Zap className="w-5 h-5 text-teal-400" /> Choose who you rent to</li>
              <li className="flex items-center gap-3"><RefreshCcw className="w-5 h-5 text-teal-400" /> Flexible pricing (daily/weekly/monthly)</li>
            </ul>
            <button className="bg-teal-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-400 transition-colors shadow-lg flex items-center gap-2 mx-auto md:mx-0" onClick={()=>navigate("/owner/add-items")}>
              <PlusCircle className="w-6 h-6" />
              List an Item for Free
            </button>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-3xl border border-slate-700 text-center transform rotate-3">
              <div className="text-4xl mb-2">💸</div>
              <div className="text-white font-medium mb-1">Average Earner Makes</div>
              <div className="text-4xl font-extrabold text-white">₹8,500<span className="text-xl font-normal text-slate-400">/mo</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)};

export default EarnBanner
