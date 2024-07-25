export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  URGENT = "Urgent"
}

export interface TaskData {
  title: string
  dueDate: string
  priority: TaskPriority
}