import useTasksContext from "@/hooks/useTasksContext"
import { Plus } from "lucide-react"
import TaskCard from "./TaskCard"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

export default function TaskList() {
  const { tasks, isLoading } = useTasksContext()
  return (
    <div className="space-y-3 md:w-[400px] flex-1">
      <p className="text-lg font-bold mb-2">Tasks</p>
      {isLoading ? (
        <>
          <Skeleton className="w-full h-32" />
          <Skeleton className="md:w-[400px] h-32" />
          <Skeleton className="md:w-[400px] h-32" />
          <Skeleton className="w-[150px] h-10" />
        </>
      ) : (
        <>
          {tasks?.map((t, i) => (
            <TaskCard key={i} task={t} />
          ))}
          <Button>
            Add task
            <Plus size={16} className="ml-2" />
          </Button>
        </>
      )}
    </div>
  )
}
