import { io } from "socket.io-client";

const productionURL =
  "https://expertlab-prototype-live-chat-application-socket-io-backend.vercel.app/";
const developmentURL = "http://localhost:3001";

const URL =
  process.env.NODE_ENV === "production" ? productionURL : developmentURL;

export const socket = io(URL);
