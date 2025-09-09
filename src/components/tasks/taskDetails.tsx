import { useParams } from "react-router-dom";
import type { TaskItem } from "../../taskItem.js";

export function TaskDetails({ tasks }: { tasks: TaskItem[] }) {
  const { id } = useParams();
  const idAsInt = parseInt(id || "0");
  const task = tasks.find((t) => t.id == idAsInt);
  if (!task) return <h1>Task {id} not found</h1>;
  return (
    <h1>
      Showing {task.summary} {task.complete && "✅"}
    </h1>
  );
}
