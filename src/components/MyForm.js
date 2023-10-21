import React, { useState } from "react";

export function MyForm({ onRegister }) {
  const [value, setValue] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    onRegister(value);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen gap-y-4 ">
        <h1 className="flex flex-row items-center gap-2">Welcome</h1>
        <div className="bg-slate-700 p-4 rounded-lg text-white flex flex-col gap-4 w-3/4 md:w-1/2 lg:w-1/4 xl:w-1/5">
          {/* {message !== "" ? <h2 className="text-xl">{message}</h2> : <></>} */}
          <h2 className="text-xl">Enter your username</h2>
          <hr></hr>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="username"
              className="bg-slate-800  rounded-md px-4 py-4 text-white"
              onChange={(e) => setValue(e.target.value)}
            />

            <button type="submit" className="bg-cyan-500 p-2 rounded-md">
              Submit
            </button>
          </form>
          {/* {error !== "" && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
