import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";
import Lists from "./components/Lists";
import "./tailwind.css";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [registeredUser, setRegisteredUser] = useState(""); // Store the registered username
  const [showChat, setShowChat] = useState(false); // Control chat visibility
  const [usersList, setUsersList] = useState([]); // Store the list of users

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
      setUsersList(userList);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
    socket.on("userList", updateUserList);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
      socket.off("userList", updateUserList);
    };
  }, []);

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

  return (
    <div className="h-screen w-screen bg-slate-900 text-white">
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      {showChat ? (
        <div>
          <div>Welcome {registeredUser}</div>
          <Events events={fooEvents} />
          <Lists usersList={usersList} />
          {/* Pass registeredUser as a prop to the chat components */}
        </div>
      ) : (
        <MyForm onRegister={handleRegistration} />
      )}
    </div>
  );
}
