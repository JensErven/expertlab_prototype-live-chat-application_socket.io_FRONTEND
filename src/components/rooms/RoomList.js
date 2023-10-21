import React from "react";
import { FaPlus } from "react-icons/fa";

const RoomList = () => {
  return (
    <div className="flex flex-row gap-4 items-center justify-between">
      {" "}
      <h1>Rooms</h1>
      <button className="bg-cyan-500 text-white rounded-md w-fit h-fit p-2 flex items-center justify-center text-lg font-bold">
        <FaPlus size={20} fill="white" />
      </button>
    </div>
  );
};

export default RoomList;
