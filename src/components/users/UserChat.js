import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaSmile, FaUserCircle } from "react-icons/fa";
import { socket } from "../../socket";
import VoiceToTextButton from "../shared/VoiceToTextButton";

const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "😍",
  "🥰",
  "😋",
  "😎",
  "😜",
  "😏",
];

const UserChat = ({
  selectedUser,
  registeredUser,
  setChatHistory,
  chatHistory,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const chatContainerRef = useRef(null); // Reference to the chat container element
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    // Scroll to the bottom whenever chatHistory changes
    scrollToBottom();
  }, [chatHistory]);

  // Filter chatHistory to show only messages for the selected chat
  const chatHistoryForSelectedChat = chatHistory.filter(
    (message) =>
      (message.sender === selectedUser &&
        message.receiver === registeredUser) ||
      (message.sender === registeredUser && message.receiver === selectedUser)
  );

  const handleSendMessage = () => {
    if (messageInput) {
      const message = {
        sender: registeredUser,
        receiver: selectedUser,
        message: messageInput,
      };
      setChatHistory((prevHistory) => [...prevHistory, message]);
      // Emit a "message" event to the server
      socket.emit("message", message);
      setMessageInput("");
    }
  };

  // Handle the "Enter" key press to send the message
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
      handleSendMessage();
    }
  };

  const handleSpeechResult = (result) => {
    setMessageInput(result); // Set the recognized speech as the message input

    // Automatically send the message when recognized speech is received
    if (result.trim() !== "") {
      const message = {
        sender: registeredUser,
        receiver: selectedUser,
        message: result,
      };
      setChatHistory((prevHistory) => [...prevHistory, message]);
      socket.emit("message", message);
      setMessageInput(""); // Clear the message input after sending
    }
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible((prev) => !prev);
  };

  const handleEmojiClick = (emoji) => {
    setMessageInput((prev) => prev + emoji);
    setIsEmojiPickerVisible(false);
  };

  return (
    <div className="bg-slate-900 p-4 h-screen  flex flex-col gap-4 w-2/3">
      <div className=" flex flex-col gap-2 bg-slate-700 p-4   w-full rounded-md max-h-1/6">
        <h1>User</h1>

        <div className="flex flex-wrap gap-2 w-full ">
          <div className="flex flex-row gap-2 bg-slate-800 p-2 rounded-xl text-white items-center capitalize pr-4">
            <FaUserCircle size={20} fill="white" />
            <p>
              {selectedUser}{" "}
              {selectedUser === registeredUser && (
                <span className="text-slate-500">(You)</span>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-slate-700 rounded-md  h-5/6 w-full flex flex-col  ">
        <div className="w-full  pb-2 max-h-[90%] min-h-[90%] flex flex-col gap-y-2 justify-end relative ">
          {isEmojiPickerVisible && (
            <div className="emoji-picker absolute  flex flex-wrap w-[75%] right-2 gap-4 bg-slate-800 items-center  p-4  rounded-md z-50">
              {emojis.map((emoji, index) => (
                <span
                  key={index}
                  onClick={() => handleEmojiClick(emoji)}
                  className="emoji cursor-pointer hover:scale-150 ease-in-out"
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}
          <div
            ref={chatContainerRef}
            className="overflow-y-scroll w-full flex flex-col p-2 gap-y-1 "
          >
            {chatHistoryForSelectedChat.map((message, index) => (
              <div
                className={`flex flex-col relative w-2/3 ${
                  message.sender === registeredUser ? "self-end" : ""
                }`}
                key={index}
              >
                <p
                  className={`${
                    message.sender === registeredUser ? "self-end" : ""
                  }`}
                >
                  <span className="text-slate-400 text-sm">
                    {message.sender === registeredUser
                      ? "(You)"
                      : message.sender}
                  </span>
                </p>
                <div
                  className={`message text-stone-100 shadow-lg ${
                    message.sender === registeredUser
                      ? "own-message self-end bg-slate-600"
                      : "others-message bg-purple-500"
                  } w-fit rounded-md p-2`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center justify-center  border-t-2 border-slate-500  p-2 h-[10%] gap-2">
          <VoiceToTextButton onSpeechResult={handleSpeechResult} />
          <div className="w-full bg-slate-800 rounded-md h-full  text-white flex items-center ">
            <input
              onKeyPress={handleInputKeyPress}
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full bg-transparent h-full pl-4  rounded-md "
              placeholder="write a message..."
            ></input>
            <div className="flex flex-col items-center justify-center w-20">
              {" "}
              <FaSmile
                onClick={toggleEmojiPicker}
                size={20}
                className="fill-slate-500 w-full hover:scale-125 transition ease-in-out hover:fill-yellow-500 "
              />
            </div>
          </div>

          <button
            onClick={handleSendMessage}
            className="bg-green-400 font-semibold h-full p-2 rounded-md  capitalize w-fit px-4 "
          >
            <FaPaperPlane size={25} fill="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
