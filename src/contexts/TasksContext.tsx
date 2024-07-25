"use client"

import { TaskData, TaskPriority } from "@/types/tasks.types"
import { createContext, ReactNode, useEffect, useState } from "react"

interface TasksContextProps {
  tasks: TaskData[] | null
  setTasks: React.Dispatch<React.SetStateAction<TaskData[] | null>>
  isLoading: boolean
  error: unknown
}

export const TasksContext = createContext<TasksContextProps | null>(null)

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskData[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const fakeFetch = (): Promise<{ results: TaskData[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          results: [
            {
              title: "Send hotfix ASAP",
              dueDate: "2024-07-24",
              priority: TaskPriority.URGENT
            },
            {
              title: "Complete project report",
              dueDate: "2024-08-01",
              priority: TaskPriority.HIGH
            },
            {
              title: "Schedule meeting with team",
              dueDate: "2024-07-26",
              priority: TaskPriority.MEDIUM
            },
            {
              title: "Review pull requests",
              dueDate: "2024-07-28",
              priority: TaskPriority.LOW
            }
          ]
        })
      }, 1000)
    })
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

  return <TasksContext.Provider value={{ tasks, setTasks, isLoading, error }}>{children}</TasksContext.Provider>
}
