import React from "react";

export function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>
          <label>
            <input type={"checkbox"} checked={t.completed} /> {t.summary}
          </label>
        </li>
      ))}
    </ul>
  );
}
