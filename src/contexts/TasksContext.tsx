"use client"

import { useToast } from "@/components/ui/use-toast"
import { TaskData, TaskPriority } from "@/types/tasks.types"
import React, { createContext, ReactNode, useEffect, useState } from "react"

interface TasksContextProps {
  tasks: TaskData[] | null
  setTasks: React.Dispatch<React.SetStateAction<TaskData[] | null>>
  isLoading: boolean
  error: unknown
  addTask: (task: TaskData) => void
}

export const TasksContext = createContext<TasksContextProps | null>(null)

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskData[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const { toast } = useToast()

  const fakeFetch = (): Promise<{ results: TaskData[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          results: [
            {
              title: "Complete project report",
              description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
              dueDate: "2024-08-01",
              priority: TaskPriority.HIGH
            },
            {
              title: "Schedule meeting with team",
              description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
              dueDate: "2024-07-26",
              priority: TaskPriority.MEDIUM
            },
            {
              title: "Review pull requests",
              description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
              dueDate: "2024-07-28",
              priority: TaskPriority.LOW
            }
          ]
        })
      }, 1000)
    })
  }

  const addTask = (task: TaskData) => {
    // The approach here would be a POST to the backend api, and if it's successful, then a GET to load the updated list of tasks.
    // For this example, i'm going to add the task data directly to the context state.
    setTasks((tl) => {
      return tl ? [...tl, task] : [task]
    })
    toast({ title: "Great!", description: "You've created a new task successfully." })
  }

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fakeFetch()

        if (!response.results) {
          throw new Error("Network response was not ok")
        }

        setTasks(response.results)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  return (
    <TasksContext.Provider value={{ tasks, setTasks, isLoading, error, addTask }}>{children}</TasksContext.Provider>
  )
}
