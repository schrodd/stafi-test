import { TaskData, TaskPriority } from "@/types/tasks.types"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

export default function TaskCard({ task }: { task: TaskData }) {
  const priorityColors: Record<TaskPriority, string> = {
    "Low": "blue",
    "Medium": "yellow",
    "High": "orange",
    "Urgent": "red"
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-md">{task.title}</CardTitle>
        <CardDescription className="line-clamp-1">{task.description}</CardDescription>
        <CardDescription className="flex gap-2 items-center">
          <span className={`flex h-2 w-2 rounded-full bg-${priorityColors[task.priority]}-500`} />
          <b>Priority:</b> {task.priority}
        </CardDescription>
        <CardDescription className="flex gap-2 items-center">
          <span className="flex h-2 w-2 rounded-full bg-slate-500" />
          <b>Due date:</b> {task.dueDate}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
