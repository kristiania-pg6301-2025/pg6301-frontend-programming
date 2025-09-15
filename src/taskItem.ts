export interface TaskItem {
  id: number;
  summary: string;
  completed: boolean;
  description?: string;
}

export type TaskDelta = Partial<Omit<TaskItem, "id">>;
export type UpdateTaskEventHandler = (id: number, delta: TaskDelta) => void;
