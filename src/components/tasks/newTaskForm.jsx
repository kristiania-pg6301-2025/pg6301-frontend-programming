import React, { useState } from "react";

export function NewTaskForm({ onNewTask }) {
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onNewTask({ description, completed: false });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <strong>Description: </strong>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
