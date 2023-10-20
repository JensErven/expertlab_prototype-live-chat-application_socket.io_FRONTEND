import React, { useEffect } from "react";

const UserList = ({ usersList }) => {
  useEffect(() => {
    console.log(usersList);
  }, [usersList]);
  return (
    <div className="bg-slate-500">
      <p>Online Users:</p>
      <ul>
        {usersList.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
