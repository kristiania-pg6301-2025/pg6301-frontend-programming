export interface TaskItem {
  id: number;
  summary: string;
  completed: boolean;
  description?: string;
}
export type UpdateTaskEventHandler = (
  id: number,
  delta: Partial<Omit<TaskItem, "id">>,
) => void;
