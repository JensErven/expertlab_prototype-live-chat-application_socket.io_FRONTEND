import React from "react";
import { FaUser } from "react-icons/fa";

const UserCard = ({ user, registeredUser, setSelectedUser, selectedUser }) => {
  const handleSelectUser = (user) => {
    if (user === selectedUser) return;
    setSelectedUser(user);
  };

  return (
    <div
      onClick={() => handleSelectUser(user)}
      className={`rounded-md flex justify-between items-center  cursor-pointer relative p-2
${selectedUser === user ? "bg-purple-400" : "bg-slate-800 "}
  `}
      // onClick={userInRoom ? handleSelectRoom : undefined}
    >
      <div className="flex flex-row text-white gap-2 h-full items-center ">
        <div className="bg-slate-700 rounded-md  flex flex-row items-center justify-between p-2">
          <FaUser size={20} className="fill-slate-500" />
        </div>
        <p
          className={` overflow-hidden
       "text-white" 
      `}
        >
          {user}{" "}
          {registeredUser === user ? (
            <span className="text-slate-500">(You)</span>
          ) : (
            <></>
          )}
        </p>
      </div>
      {/* <div className=" h-full items-center rounded-md px  flex flex-row relative animate-pulse gap-2">
        <p className="  bg-cyan-500 rounded-full w-fit px-1 -left-8 top-2 text-white font-bold">
          150{" "}
        </p>
        <FaComment size={20} className="fill-slate-500" />
      </div> */}
    </div>
  );
};

export default UserCard;
