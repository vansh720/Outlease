import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Register = () => {

  const { setShowLogin, axios, setToken, navigate, setShowRegister } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
        setShowRegister(false);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowRegister(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >

      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6"
      >

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={assets.Logo} className="w-10 mb-1" alt="logo" />
          <h1 className="text-lg font-bold text-[#004d40]">Outlease</h1>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            Start renting items easily
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009688]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009688]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              className="mt-1 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009688]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#009688] hover:bg-[#00796b] text-white text-sm font-semibold py-2.5 rounded-md transition"
          >
            Create Account
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
            className="text-[#009688] font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;