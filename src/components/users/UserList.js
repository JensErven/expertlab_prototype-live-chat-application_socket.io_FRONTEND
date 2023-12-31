import React, { useEffect, useState } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import UserCard from "./UserCard";

const UserList = ({
  usersList,
  registeredUser,
  setSelectedUser,
  selectedUser,
  unreadMessages,
}) => {
  const [searchInput, setSearchInput] = useState(""); // State to store the search input
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users

  useEffect(() => {
    // Convert the searchInput to lowercase for a case-insensitive search
    const searchQuery = searchInput.toLowerCase();

    // Filter the users based on the searchInput and exclude the registeredUser
    const filtered = usersList.filter(
      (user) =>
        user.toLowerCase().includes(searchQuery) && user !== registeredUser
    );

    setFilteredUsers(filtered);
  }, [usersList, searchInput, registeredUser]);

  return (
    <div className=" flex flex-col gap-2 h-1/2 border-y-2 border-slate-500 py-4 ">
      <div className="flex flex-row gap-4 items-center justify-between">
        {" "}
        <h1>Users</h1>
        <div className="flex gap-2 text-white bg-slate-800 p-2 rounded-lg">
          <p>{usersList.length}</p>
          <FaUser size={20} className="fill-slate-500" />
        </div>
      </div>
      <div className="flex flex-row items-center w-full">
        <input
          className="bg-slate-800 rounded-l-md  px-4 py-4 text-white h-full w-full"
          placeholder="search user..."
          value={searchInput} // Bind the input value to the searchInput state
          onChange={(e) => setSearchInput(e.target.value)} // Update searchInput on input change
        ></input>
        <div className="p-2 flex bg-slate-800 rounded-r-md  h-full items-center  w-20 justify-center">
          <FaSearch size={20} className="fill-slate-600" />
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-scroll">
        {" "}
        {filteredUsers.map((user) => (
          <UserCard
            user={user}
            registeredUser={registeredUser}
            key={user}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
            unreadMessages={unreadMessages[user]}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
