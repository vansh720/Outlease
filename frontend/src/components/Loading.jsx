import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {
  const { nextUrl } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate("/" + nextUrl);
      }, 4000);
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-300 border-t-green-600"></div>
    </div>
  );
};

export default Loading;
