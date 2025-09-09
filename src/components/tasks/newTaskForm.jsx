import React, { useState } from "react";

export function NewTaskForm({ onNewTask }) {
  function handleSubmit(event) {
    event.preventDefault();
    onNewTask({ desciption });
  }

  const [desciption, setDesciption] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <strong>Description: </strong>
        <input
          type="text"
          value={desciption}
          onChange={(e) => setDesciption(e.target.value)}
        />
      </div>
      <div>
        <button>Create</button>
      </div>
    </form>
  );
}
