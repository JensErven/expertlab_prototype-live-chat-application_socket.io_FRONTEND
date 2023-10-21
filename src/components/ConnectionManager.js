import React from "react";
import { socket } from "../socket";

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  // function disconnect() {
  //   socket.disconnect();
  // }

  return (
    <>
      <button
        className="bg-cyan-500 p-2 rounded-md text-white"
        onClick={connect}
      >
        Connect
      </button>
    </>
  );
}
