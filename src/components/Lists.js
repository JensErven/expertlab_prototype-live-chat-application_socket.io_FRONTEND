import React from "react";
import UserList from "./users/UserList";
import RoomList from "./rooms/RoomList";
const Lists = ({
  usersList,
  registeredUser,
  setSelectedUser,
  selectedUser,
  unreadMessages,
  setIsModalOpen,
  chatRoomsList,
  setSelectedRoom,
  selectedRoom,
}) => {
  return (
    <div className=" flex flex-col gap-4 h-[90%] ">
      <UserList
        usersList={usersList}
        registeredUser={registeredUser}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        unreadMessages={unreadMessages}
      />
      {/* <hr className="border-slate-500 border w-full"></hr> */}

      <RoomList
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        setIsModalOpen={setIsModalOpen}
        chatRoomsList={chatRoomsList}
        registeredUser={registeredUser}
      />
    </div>
  );
};

export default Lists;
