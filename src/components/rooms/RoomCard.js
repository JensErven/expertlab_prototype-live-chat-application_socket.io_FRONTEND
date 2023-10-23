import React, { useEffect, useState } from "react";
import { socket } from "../../socket";

import { FaUsers, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

const RoomCard = ({ room, registeredUser, setSelectedRoom, selectedRoom }) => {
  const [usersInRoom, setUsersInRoom] = useState(0);
  const [registeredUserInRoom, setRegisteredUserInRoom] = useState(false);

  useEffect(() => {
    const getUsersInRoom = room.users;
    setUsersInRoom(Object.keys(getUsersInRoom).length);
    setRegisteredUserInRoom(room.users[socket.id] === registeredUser);
  }, [room, registeredUser]);

  const handleJoinRoom = (roomName) => {
    socket.emit("joinRoom", roomName);
  };

  const handleLeaveRoom = (roomName) => {
    socket.emit("leaveRoom", roomName);
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room.roomName);
  };

  return (
    <div
      className={`rounded-md flex justify-between items-center  cursor-pointer relative p-2 bg-slate-800 shadow-md 
  `}
      onClick={registeredUserInRoom ? () => handleSelectRoom(room) : null}
    >
      <div className="flex flex-row text-white gap-2 h-full items-center">
        <div className="bg-slate-700 rounded-md  flex flex-row items-center justify-between p-2 gap-1">
          <p>{room ? usersInRoom : ""}</p>
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
        {registeredUserInRoom === true ? (
          <FaSignOutAlt
            size={20}
            className="fill-red-400 hover:fill-red-500 transition duration-100 ease-in-out"
            onClick={() => handleLeaveRoom(room.roomName)}
          />
        ) : (
          <FaSignInAlt
            size={20}
            className="fill-cyan-500 hover:fill-cyan-500"
            onClick={() => handleJoinRoom(room.roomName)}
          />
        )}
      </div>
    </div>
  );
};

export default RoomCard;
