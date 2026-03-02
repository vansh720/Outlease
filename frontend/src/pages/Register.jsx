import React from 'react';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f9f9] via-white to-[#e6f4f1] flex items-center justify-center p-4 font-sans text-[#111827]">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-teal-900/5 border border-gray-100 overflow-hidden">
        
        <div className="p-8 md:p-10">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 bg-[#009688] rounded-lg flex items-center justify-center shadow-inner">
               <span className="text-white font-black text-xl italic leading-none">O</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-[#009688]">Outlease</span>
          </div>

          {/* Header */}
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Create an <span className="text-[#009688]">Account.</span>
          </h1>
          <p className="text-gray-500 font-medium mb-8">
            Join the community and access what you need, without buying it.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 uppercase tracking-wider text-gray-400">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-[#009688] focus:ring-4 focus:ring-[#009688]/10 outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 uppercase tracking-wider text-gray-400">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your E-mail"
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-[#009688] focus:ring-4 focus:ring-[#009688]/10 outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 uppercase tracking-wider text-gray-400">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-[#009688] focus:ring-4 focus:ring-[#009688]/10 outline-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[#009688] hover:bg-[#00796b] text-white text-lg font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#009688]/30 active:scale-[0.98] mt-4">
              Get Started
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center border-t border-gray-50 pt-6">
            <p className="text-gray-500 font-medium">
              Already using Outlease? 
              <button className="ml-2 text-[#009688] font-bold hover:underline transition-all">Log in</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;