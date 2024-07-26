import useTasksContext from "@/hooks/useTasksContext"
import TaskCard from "./TaskCard"
import TaskForm from "./TaskForm"
import { Skeleton } from "./ui/skeleton"

export default function TaskList() {
  const { tasks, isLoading } = useTasksContext()

  const SkeletonTasks = () => {
    return (
      <>
        <Skeleton className="w-full h-32" />
        <Skeleton className="md:w-[400px] h-32" />
        <Skeleton className="md:w-[400px] h-32" />
        <Skeleton className="w-[150px] h-10" />
      </>
    )
  }

  return (
    <div className="space-y-3 md:w-[400px] flex-1">
      <p className="text-lg font-bold mb-2">Tasks</p>
      {isLoading ? (
        <SkeletonTasks />
      ) : (
        <>
          {tasks?.map((t, i) => (
            <TaskCard key={i} task={t} />
          ))}
          <TaskForm />
        </>
      )}
    </div>
  )
}
