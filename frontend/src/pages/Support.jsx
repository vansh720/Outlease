import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';

const Support = () => {
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(20, 153, 145, 0.03)';

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/api/support`,
        formData
      );

      if (res.data.success) {
        alert("Message sent successfully ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed ❌");
      }

    } catch (error) {
      console.log(error.message);
      alert("Error ❌");
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-sans">
      {/* SAME Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-24">
      
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center transform rotate-3 shadow-sm">
              <img src={assets.Logo} alt="" />
            </div>
            <span className="text-2xl font-bold text-[#149991] tracking-tight">Outlease Support</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-[#0c2423] leading-tight mb-4">
            How can we <span className="text-[#149991]">help?</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl font-medium">
            Find answers to common questions or reach out to our team of neighborhood rental experts.
          </p>
        </div>

        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Renting Items", icon: "📦", desc: "Learn how to browse, book, and collect items safely." },
            { title: "Earning Money", icon: "💰", desc: "Set up your shop and start earning from your idle tools." },
            { title: "Safety & Trust", icon: "🛡️", desc: "Information on our insurance and community guidelines." }
          ].map((card, i) => (
            <div key={i} className="group p-8 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-[2rem] hover:shadow-2xl hover:shadow-teal-900/5 transition-all cursor-pointer">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{card.icon}</div>
              <h3 className="text-xl font-bold text-[#0c2423] mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0c2423] rounded-[3rem] p-8 lg:p-16 text-white grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6">Still need help? <br /><span className="text-[#149991]">Drop us a message.</span></h2>
            <p className="text-gray-300 mb-8 font-medium">Our average response time is under 2 hours during business hours.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">📧</div>
                <span className="font-bold">narulavansh502@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">📍</div>
                <span className="font-bold">Sector 74, Phase 8B, 2nd floor mgtower</span>
              </div>
            </div>
          </div>

    
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-[2rem]">
            <input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text" 
              placeholder="Your Name" 
              className="w-full px-6 py-4 bg-gray-50 text-[#0c2423] rounded-2xl outline-none focus:ring-2 focus:ring-[#149991]"
            />
            <input 
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              placeholder="Email Address" 
              className="w-full px-6 py-4 bg-gray-50 text-[#0c2423] rounded-2xl outline-none focus:ring-2 focus:ring-[#149991]"
            />
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what's happening..." 
              rows="4"
              className="w-full px-6 py-4 bg-gray-50 text-[#0c2423] rounded-2xl outline-none focus:ring-2 focus:ring-[#149991]"
            ></textarea>
            <button className="w-full bg-[#149991] hover:bg-[#0e7a74] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-teal-900/10">
              Send Message
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Support;