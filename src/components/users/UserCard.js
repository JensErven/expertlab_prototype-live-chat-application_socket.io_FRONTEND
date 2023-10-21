import React from "react";
import { FaUser, FaComment } from "react-icons/fa";

const UserCard = ({
  user,
  registeredUser,
  setSelectedUser,
  selectedUser,
  unreadMessages,
}) => {
  const handleSelectUser = (user) => {
    if (user === selectedUser) return;
    setSelectedUser(user);
  };

  return (
    <div
      onClick={() => handleSelectUser(user)}
      className={`rounded-md flex justify-between items-center  cursor-pointer relative p-2
${
  selectedUser === user ? "bg-purple-500 shadow-md " : "bg-slate-800 shadow-md "
}
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
            <span
              className={`${
                selectedUser === user ? "text-stone-100" : "text-slate-500"
              }`}
            >
              (You)
            </span>
          ) : (
            <></>
          )}
        </p>
      </div>
      {unreadMessages > 0 && (
        <div className=" h-full items-center rounded-md px  flex flex-row relative animate-pulse gap-1">
          <p className="bg-purple-600 rounded-full w-fit px-2 -left-8 top-2 text-white ">
            {unreadMessages}
          </p>
          <FaComment size={20} className="fill-stone-100" />
        </div>
      )}
    </div>
  );
};

export default UserCard;
