import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "expertlab-prototype-live-chat-application-socket-io-backend.vercel.app";

export const socket = io(URL);
