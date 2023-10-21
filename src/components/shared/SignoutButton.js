import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { socket } from "../../socket";

const SignoutButton = () => {
  function disconnect() {
    socket.disconnect();
  }

  return (
    <button
      onClick={disconnect}
      className="bg-red-500 text-white rounded-md w-fit h-fit flex items-center justify-center p-2 gap-2"
    >
      <FaSignOutAlt size={20} fill="white" />
    </button>
  );
};

export default SignoutButton;
