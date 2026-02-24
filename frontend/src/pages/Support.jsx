import React, { useEffect, useRef } from 'react';

const Support = () => {
  const canvasRef = useRef(null);

  // Canvas Animation: Floating Teal Orbs
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
      ctx.fillStyle = 'rgba(20, 153, 145, 0.03)'; // Brand Teal with ultra-low opacity

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

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-sans">
      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-24">
      
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#149991] rounded-lg flex items-center justify-center transform rotate-3 shadow-sm">
              <span className="text-white font-black text-lg -rotate-3">O</span>
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
                <span className="font-bold">support@outlease.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">📍</div>
                <span className="font-bold">Your Neighborhood, Global</span>
              </div>
            </div>
          </div>

          <form className="space-y-4 bg-white p-8 rounded-[2rem]">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full px-6 py-4 bg-gray-50 text-[#0c2423] rounded-2xl outline-none focus:ring-2 focus:ring-[#149991]"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full px-6 py-4 bg-gray-50 text-[#0c2423] rounded-2xl outline-none focus:ring-2 focus:ring-[#149991]"
            />
            <textarea 
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