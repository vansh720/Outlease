import React, { useState, useEffect } from "react";
import { ArrowLeft, MoreVertical, Send } from "lucide-react";
import { socket } from "../services/Socket";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Chat = () => {
  const { user } = useAppContext();
  const { userId, otherUserId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [item, setItem] = useState(null); // 🔥 item for header

  const getSenderId = (sender) => {
    return typeof sender === "object"
      ? sender._id?.toString()
      : sender?.toString();
  };

  // ✅ Fetch messages + user + item
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `/api/messages/${userId}/${otherUserId}`
        );

        if (data.success) {
          const formatted = data.messages.map((msg) => {
            const senderId = getSenderId(msg.sender);

            return {
              id: msg._id,
              sender: msg.sender,
              text: msg.text,
              time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isMine: senderId === user._id.toString(),
            };
          });

          setMessages(formatted);

          // 🔥 set chat user + item from first message
          if (data.messages.length > 0) {
            const firstMsg = data.messages[0];

            const other =
              getSenderId(firstMsg.sender) === user._id
                ? firstMsg.receiver
                : firstMsg.sender;

            setChatUser(other);
            setItem(firstMsg.item); // 👈 item from DB
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userId && otherUserId) fetchMessages();
  }, [userId, otherUserId]);

  // socket join
  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user]);

  // receive messages
  useEffect(() => {
    const handleMessage = (msg) => {
      const senderId = getSenderId(msg.sender);
      const receiverId = getSenderId(msg.receiver);

      if (
        !(
          (senderId === otherUserId && receiverId === user._id) ||
          (senderId === user._id && receiverId === otherUserId)
        )
      )
        return;

      setMessages((prev) => {
        if (prev.some((m) => m.id === msg._id)) return prev;

        return [
          ...prev,
          {
            id: msg._id,
            sender: msg.sender,
            text: msg.text,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isMine: senderId === user._id,
          },
        ];
      });
    };

    socket.on("receiveMessage", handleMessage);

    return () => socket.off("receiveMessage", handleMessage);
  }, [user, otherUserId]);

  // send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    socket.emit("sendMessage", {
      sender: user._id,
      receiver: otherUserId,
      text: inputText,
    });

    setInputText("");
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-6">
      <div className="max-w-4xl mx-auto px-4 h-[80vh] flex flex-col">

        {/* HEADER 🔥 */}
        <div className="bg-white rounded-t-2xl border p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* ITEM IMAGE */}
            {item?.image && (
              <img
                src={item.image}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
            )}

            <div>
              <h2 className="font-bold">{chatUser?.name || "User"}</h2>
              <p className="text-xs text-gray-500">
                {item?.itemName || ""}
              </p>
            </div>
          </div>

          <MoreVertical className="w-5 h-5" />
        </div>

        {/* MESSAGES */}
        <div className="flex-1 bg-white p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs ${
                  msg.isMine
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70 block text-right">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <form
          onSubmit={handleSendMessage}
          className="bg-white border p-3 flex gap-2"
        >
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded px-3 py-2"
          />
          <button className="bg-teal-600 text-white px-4 rounded">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;