import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    // Add your signup logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#041321] to-[#0c1b2a] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="text-gray-300 mt-1">
            Join Outlease — rent smarter, earn faster.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-teal-400 focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-teal-400 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-teal-400 focus:outline-none transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="confirmPassword"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-teal-400 focus:outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-300">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-teal-300 hover:text-teal-400 font-medium transition"
          >
            Sign in
          </a>
        </p>

      </div>
    </div>
  );
};

export default Register;
