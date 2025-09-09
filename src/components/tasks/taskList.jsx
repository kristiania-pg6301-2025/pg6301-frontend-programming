import React from "react";

export function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>
          <label>
            <input type={"checkbox"} /> {t.summary}
          </label>
        </li>
      ))}
    </ul>
  );
}
