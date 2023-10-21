import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import RoomCard from "./RoomCard";

const RoomList = ({ setIsModalOpen, chatRoomsList }) => {
  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="flex flex-col gap-2 h-1/2 ">
      <div className="flex w-full flex-row gap-4 items-center justify-between  h-fit">
        {" "}
        <h1>Rooms</h1>
        <button
          onClick={openModal}
          className="bg-cyan-500 text-white rounded-md w-fit h-fit p-2 flex items-center justify-center text-lg font-bold"
        >
          <FaPlus size={20} fill="white" />
        </button>
      </div>
      <div className="flex flex-row items-center w-full">
        <input
          className="bg-slate-800 rounded-l-md  px-4 py-4 text-white h-full w-full"
          placeholder="search user..."
          // value={searchInput} // Bind the input value to the searchInput state
          // onChange={(e) => setSearchInput(e.target.value)} // Update searchInput on input change
        ></input>
        <div className="p-2 flex bg-slate-800 rounded-r-md  h-full items-center  w-20 justify-center">
          <FaSearch size={20} className="fill-slate-600" />
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-scroll ">
        {chatRoomsList.map((room) => (
          <RoomCard room={room} key={room.roomName} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;
