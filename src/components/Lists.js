import React from "react";
import UserList from "./users/UserList";
import RoomList from "./rooms/RoomList";
const Lists = ({ usersList }) => {
  return (
    <div>
      <UserList usersList={usersList} />
      <RoomList />
    </div>
  );
};

export default Lists;
