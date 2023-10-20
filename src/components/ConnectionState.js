import React from "react";

export function ConnectionState({ isConnected }) {
  return (
    <>
      {isConnected ? (
        <div className="bg-green-500 w-4 h-4 rounded-full animate-pulse"></div>
      ) : (
        <div className="bg-red-500 w-4 h-4 rounded-full animate-pulse"></div>
      )}
    </>
  );
}
