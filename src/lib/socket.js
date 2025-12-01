import { io } from "socket.io-client";

let socket = null;

export function connectSocket(token) {
  if (typeof window === "undefined") return null;
  if (socket && socket.connected) return socket;

  socket = io(process.env.REACT_APP_API_URL || "http://localhost:3000", {
    auth: { token },
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect_error", (err) => {
    console.warn("Socket connect_error:", err?.message || err);
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (!socket) return;
  try { socket.disconnect(); } catch (e) {}
  socket = null;
}
