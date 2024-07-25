import { TaskData, TaskPriority } from "./tasks.types"

export interface TaskFormProps {
  placeholders?: {
    title?: string
    dueDate?: string
    priority?: TaskPriority
  }
}