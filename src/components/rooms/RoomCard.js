import React from "react";
import { FaUsers, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

const RoomCard = ({ room }) => {
  return (
    <div
      className={`rounded-md flex justify-between items-center  cursor-pointer relative p-2 bg-slate-800 shadow-md 
  `}
      // onClick={userInRoom ? handleSelectRoom : undefined}
    >
      <div className="flex flex-row text-white gap-2 h-full items-center">
        <div className="bg-slate-700 rounded-md  flex flex-row items-center justify-between p-2">
          <p>{room.users.length}</p>
          <FaUsers size={20} className="fill-slate-500" />
        </div>
        <p
          className={` overflow-hidden text-slate-400
      `}
        >
          {room.roomName}
        </p>
      </div>
      <div className="bg-slate-700 h-full  px-2 flex items-center justify-center rounded-md">
        {/* {userInRoom === true ? (
      <FaSignOutAlt
        size={20}
        className="fill-red-400 hover:fill-red-500 transition duration-100 ease-in-out"
        onClick={(event) => handleLeaveRoomClick(room.roomId, event)}
      />
    ) : (
      <FaSignInAlt
        size={20}
        className="fill-cyan-500 hover:fill-cyan-500"
        onClick={(event) => handleJoinRoomClick(room.roomId, event)}
      />
    )} */}
        <FaSignInAlt
          size={20}
          className="fill-cyan-500 hover:fill-cyan-500"
          // onClick={(event) => handleJoinRoomClick(room.roomId, event)}
        />
      </div>
    </div>
  );
};

export default RoomCard;
