import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const { user } = useAppContext();
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await axios.get(
          `/api/messages/conversations/${user._id}`
        );

        if (data.success) {
          setConversations(data.conversations);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user) fetchConversations();
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      {conversations.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div className="bg-white rounded-xl shadow border">
          {conversations.map((conv, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/chat/${user._id}/${conv.user._id}`)
              }
              className="flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-gray-50"
            >
              <div className="w-12 h-12 bg-teal-500 text-white flex items-center justify-center rounded-full font-bold">
                {conv.user.name[0]}
              </div>

              <div className="flex-1">
                <p className="font-semibold">{conv.user.name}</p>
                <p className="text-sm text-gray-500">
                  {conv.item?.itemName}
                </p>
                <p className="text-sm text-gray-700 truncate">
                  {conv.lastMessage}
                </p>
              </div>

              <div className="text-xs text-gray-400">
                {new Date(conv.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;