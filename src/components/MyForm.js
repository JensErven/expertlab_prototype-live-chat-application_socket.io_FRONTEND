import React, { useState } from "react";

export function MyForm({ onRegister }) {
  const [value, setValue] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    onRegister(value);
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Register</h1>
      <input onChange={(e) => setValue(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
}
