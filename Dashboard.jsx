import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { useEffect } from "react";

const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

useEffect(() => {
  socket.on("newPost", (data) => {
    toast.success(`📢 ${data.message}: ${data.title}`);
  });

  return () => {
    socket.off("newPost"); // cleanup
    socket.disconnect();   // prevent duplicate connections
  };
}, []);