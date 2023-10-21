import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";
import Lists from "./components/Lists";
import "./tailwind.css";
import "./App.css";
import SignoutButton from "./components/shared/SignoutButton";
import UserChat from "./components/users/UserChat";
import messageReceivedSound from "./assets/new-positive-notice-161930.mp3";
import CreateRoomModal from "./components/rooms/CreateRoomModal";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [registeredUser, setRegisteredUser] = useState(""); // Store the registered username
  const [showChat, setShowChat] = useState(false); // Control chat visibility
  const [usersList, setUsersList] = useState([]); // Store the list of users
  const [chatRoomsList, setChatRoomsList] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [chatHistory, setChatHistory] = useState([]);
  const [userOrRoomSelected, setUserOrRoomSelected] = useState("user");
  const [unreadMessages, setUnreadMessages] = useState({}); // State for unread message counts
  const messageReceivedAudio = new Audio(messageReceivedSound);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      setRegisteredUser("");
      setShowChat(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    function updateUserList(userList) {
      // Check if selectedUser exists in the updated userList
      if (!userList.includes(selectedUser)) {
        // If selectedUser is not in userList, set it to an empty string
        setSelectedUser("");
      }

      // Update the usersList with the new data
      setUsersList(userList);
    }

    function updateChatRoomList(chatRoomList) {
      console.log("new room");
      console.log(chatRoomList);
      setChatRoomsList(chatRoomList);
    }

    // Function to handle incoming messages
    function onMessageReceived({ sender, receiver, message }) {
      // Handle incoming messages and update chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender, receiver, message },
      ]);
      // Check if the message is from the selected user
      if (receiver === registeredUser && sender !== selectedUser) {
        setUnreadMessages((prevUnread) => ({
          ...prevUnread,
          [sender]: (prevUnread[sender] || 0) + 1, // Increment unread count
        }));
        // Play the message received sound effect
        messageReceivedAudio.play();
      }
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
    socket.on("userList", updateUserList);
    socket.on("message", onMessageReceived);
    socket.on("chatHistory", (data) => {
      const { sender, receiver, history } = data;

      setChatHistory(history);
    });
    socket.on("chatRoomList", updateChatRoomList);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
      socket.off("userList", updateUserList);
      socket.off("message", onMessageReceived);
      socket.off("chatHistory");
      socket.off("chatRoomList", updateChatRoomList);
    };
  }, [
    setSelectedUser,
    registeredUser,
    selectedUser,
    chatHistory,
    unreadMessages,
    messageReceivedAudio,
  ]);

  // Function to handle user registration
  const handleRegistration = (username) => {
    // Emit the "register" event with the entered username
    socket.emit("register", username);

    // Listen for a "registrationResponse" event from the server
    socket.once("registrationResponse", (response) => {
      if (response.success) {
        // Registration was successful
        setRegisteredUser(username);
        setShowChat(true); // Show the chat interface
      } else {
        // Registration failed - handle the error (e.g., display a message)
        console.error("Registration failed: " + response.error);
      }
    });
  };

  function handleSetSelectedUser(user) {
    console.log(user);
    setSelectedUser(user);
    setChatHistory([]);

    // Check if there are unread messages for the selected user
    if (unreadMessages[user]) {
      // Reset the unread message count to 0 for the selected user
      setUnreadMessages((prevUnread) => ({
        ...prevUnread,
        [user]: 0,
      }));
    }

    if (user) {
      // Request chat history using WebSocket
      socket.emit("getChatHistory", { sender: registeredUser, receiver: user });
    }

    // // Request chat history
    // socket.emit("loadChatHistory", { sender: registeredUser, receiver: user });
  }

  function handleSendOwnMessage(chatHistory) {
    setChatHistory(chatHistory);
  }

  return (
    <div className="flex flex-row h-screen bg-slate-900 items-center justify-center">
      {showChat && isConnected ? (
        <div className="w-full h-full flex flex-row  ">
          {isModalOpen && (
            <>
              <CreateRoomModal setIsModalOpen={setIsModalOpen} />{" "}
            </>
          )}
          <div className="bg-slate-700  h-full w-1/3 px-2 py-4 gap-2 flex flex-col">
            {" "}
            <div className="flex flex-row justify-between items-center h-[5%]">
              <ConnectionState isConnected={isConnected} />
              <SignoutButton />
            </div>
            {/* <hr className="border-slate-500 border w-full"></hr> */}
            <div className="h-[5%]">
              <h2 className="text-white font-bold text-lg capitalize">
                Hello, {registeredUser}
              </h2>
            </div>
            {/* <hr className="border-slate-500 border w-full"></hr> */}
            <Lists
              usersList={usersList}
              chatRoomsList={chatRoomsList}
              registeredUser={registeredUser}
              setSelectedUser={handleSetSelectedUser}
              selectedUser={selectedUser}
              unreadMessages={unreadMessages}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
          {
            /*selectedRoom || */ selectedUser ? (
              <>
                {" "}
                {userOrRoomSelected === "user" ? (
                  <UserChat
                    selectedUser={selectedUser}
                    registeredUser={registeredUser}
                    setChatHistory={handleSendOwnMessage}
                    chatHistory={chatHistory}
                  />
                ) : (
                  <></>
                  // <ChatRoom selectedRoom={selectedRoom} />
                )}
              </>
            ) : (
              <></>
            )
          }
          <Events events={fooEvents} />

          {/* Pass registeredUser as a prop to the chat components */}
        </div>
      ) : (
        <>
          {!isConnected && !showChat ? (
            <>
              {" "}
              <ConnectionManager />
            </>
          ) : (
            <>
              {" "}
              <MyForm onRegister={handleRegistration} />
            </>
          )}
        </>
      )}
    </div>
  );
}
