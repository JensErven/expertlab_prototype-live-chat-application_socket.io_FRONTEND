import React from "react";

export function ConnectionState({ isConnected }) {
  return (
    <>
      <div
        className={`${
          isConnected ? "" : "absolute"
        } top-0 left-0 text-slate-400`}
      >
        {isConnected ? (
          <div className=" bg-slate-800 rounded-md flex flex-row gap-2 items-center justify-center p-2">
            <div className="bg-green-500 w-4 h-4 rounded-full animate-pulse"></div>
            <p>connected</p>
          </div>
        ) : (
          <div className=" bg-slate-800 rounded-br-md flex flex-row gap-2 items-center justify-center p-2">
            <div className="bg-red-500 w-4 h-4 rounded-full animate-pulse"></div>
            <p>not connected</p>
          </div>
        )}
      </div>
    </>
  );
}
