import React, { useEffect, useState } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import UserCard from "./UserCard";

const UserList = ({
  usersList,
  registeredUser,
  setSelectedUser,
  selectedUser,
}) => {
  const [searchInput, setSearchInput] = useState(""); // State to store the search input
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store filtered users

  useEffect(() => {
    // Convert the searchInput to lowercase for a case-insensitive search
    const searchQuery = searchInput.toLowerCase();

    // Filter the users based on the searchInput
    const filtered = usersList.filter((user) =>
      user.toLowerCase().includes(searchQuery)
    );

    setFilteredUsers(filtered);
  }, [usersList, searchInput]);

  return (
    <div className="h-1/2 flex flex-col gap-2  ">
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
          className="bg-slate-800 rounded-l-md  px-4 py-4 text-white h-full w-[80%]"
          placeholder="search user..."
          value={searchInput} // Bind the input value to the searchInput state
          onChange={(e) => setSearchInput(e.target.value)} // Update searchInput on input change
        ></input>
        <div className="p-2 flex bg-slate-800 rounded-r-md  h-full items-center  w-[20%] justify-center">
          <FaSearch size={20} className="fill-slate-600" />
        </div>
      </div>
      <div className="flex flex-col gap-1 overflow-y-scroll">
        {" "}
        {filteredUsers.map((user) => (
          <UserCard
            user={user}
            registeredUser={registeredUser}
            key={user}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
