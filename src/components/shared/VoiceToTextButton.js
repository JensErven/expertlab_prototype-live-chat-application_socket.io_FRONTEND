import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceToTextButton = ({ onSpeechResult }) => {
  const [isListening, setIsListening] = useState(false);
  const recognition = new window.webkitSpeechRecognition();

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onSpeechResult(transcript);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div
      onClick={toggleListening}
      className={`bg-slate-800 h-full flex items-center justify-center w-12 rounded-full hover:bg-stone-100 transition ease-in-out ${
        isListening ? "animate-pulse bg-stone-100" : ""
      }`}
    >
      <FaMicrophone
        size={20}
        className={`transition ease-in-out  ${
          isListening ? "animate-ping fill-cyan-500" : "fill-cyan-500"
        }`}
      />
    </div>
  );
};

export default VoiceToTextButton;
