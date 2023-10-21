import React from "react";
import UserList from "./users/UserList";
import RoomList from "./rooms/RoomList";
const Lists = ({
  usersList,
  registeredUser,
  setSelectedUser,
  selectedUser,
  unreadMessages,
}) => {
  return (
    <div className="h-full flex flex-col gap-4">
      <UserList
        usersList={usersList}
        registeredUser={registeredUser}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        unreadMessages={unreadMessages}
      />
      <hr className="border-slate-500 border w-full"></hr>

      <RoomList />
    </div>
  );
};

export default Lists;
