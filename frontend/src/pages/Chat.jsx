import React from 'react'
import { ArrowLeft, MoreVertical, ShieldCheck, Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

const Chat = ({ item, owner, onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: owner, text: `Hi there! I saw you were looking at my ${item.title}. Let me know if you have any questions!`, time: "10:00 AM", isMine: false }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user's message
    const newMsg = {
      id: Date.now(),
      sender: "Me",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputText("");

    // Simulate owner reply after 1.5 seconds
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: owner,
        text: "Thanks for reaching out! Yes, the item is currently available for those dates.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: false
      }]);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[80vh] flex flex-col">
        {/* Chat Header */}
        <div className="bg-white rounded-t-2xl border border-gray-200 p-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-500 hover:text-teal-600 p-2 -ml-2 rounded-full hover:bg-teal-50 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-lg shrink-0">
                {owner.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 leading-tight">{owner}</h2>
                <p className="text-xs text-teal-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span> Online
                </p>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Item Context Banner */}
        <div className="bg-slate-900 text-white px-4 py-3 flex items-center gap-3 border-x border-slate-800 shadow-inner">
          <img src={item.image} alt={item.title} className="w-10 h-10 rounded object-cover border border-slate-700" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">{item.title}</p>
            <p className="text-xs text-slate-400">₹{item.price}/{item.period}</p>
          </div>
          <button onClick={onBack} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-white/10">
            View Details
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-white border-x border-gray-200 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4">
          <div className="text-center mb-6">
            <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">Today</span>
            <div className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs p-3 rounded-xl max-w-lg mx-auto flex items-start gap-2 text-left">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-yellow-600" />
              <p>For your safety, please keep all communications and payments within the Outlease platform.</p>
            </div>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] sm:max-w-[60%] flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2.5 rounded-2xl ${
                  msg.isMine 
                    ? 'bg-teal-600 text-white rounded-tr-sm shadow-sm' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-2xl border border-gray-200 p-3 sm:p-4 shadow-sm">
          <form onSubmit={handleSendMessage} className="flex items-end gap-2">
            <button type="button" className="p-3 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition-all">
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Type a message..." 
                className="w-full bg-transparent border-none focus:ring-0 p-3 text-sm text-gray-700 outline-none resize-none max-h-32 min-h-[44px]"
                rows="1"
              />
            </div>
            <button 
              type="submit" 
              disabled={!inputText.trim()}
              className="p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Chat
