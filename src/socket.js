import { io } from "socket.io-client";

const renderBackendURL =
  "https://live-chat-application-backend-jenserven.onrender.com/";
const developmentURL = "http://localhost:3001";

const URL =
  process.env.NODE_ENV === "production" ? renderBackendURL : developmentURL;

export const socket = io(URL);
