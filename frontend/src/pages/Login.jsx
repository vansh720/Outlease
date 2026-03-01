import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Form Submitted", { email, password });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center px-4">
      {/* Logo / Brand Header */}
      <div className="mb-8 flex items-center gap-2">
        <div className="w-10 h-10 bg-[#009688] rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-xl">O</span>
        </div>
        <h1 className="text-2xl font-bold text-[#004d40] tracking-tight">Outlease</h1>
      </div>

      <div className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#002b26] mb-3 tracking-tight">
            Welcome back
          </h2>
          <p className="text-gray-500 font-medium">
            Rent high-quality items from your neighborhood.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="group">
            <label className="block text-sm font-bold text-[#004d40] mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#009688]/10 focus:border-[#009688] outline-none transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="group">
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-sm font-bold text-[#004d40]">Password</label>
              <a href="#" className="text-xs font-bold text-[#009688] hover:text-[#00796b]">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              placeholder="Enter a Password"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#009688]/10 focus:border-[#009688] outline-none transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#009688] hover:bg-[#00796b] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#009688]/20 transform hover:-translate-y-0.5"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400">or continue with</span>
          </div>
        </div>

        {/* Social Button */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-2xl hover:bg-gray-50 transition-colors font-semibold text-gray-700">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" className="w-5 h-5"/>
          Sign in with Google
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-gray-600 font-medium">
          New to Outlease?{" "}
          <a href="#" className="text-[#009688] font-bold hover:underline">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;