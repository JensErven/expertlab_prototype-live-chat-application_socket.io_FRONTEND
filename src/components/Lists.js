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

      <RoomList setIsModalOpen={setIsModalOpen} chatRoomsList={chatRoomsList} />
    </div>
  );
};

export default Lists;
