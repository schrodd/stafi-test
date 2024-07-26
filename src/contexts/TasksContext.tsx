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

  const addTask = async (task: TaskData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task)
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const tasks = await response.json()

      setTasks(tasks)
      toast({ title: "Great!", description: "You've created a new task successfully." })
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('http://localhost:3000/api/tasks', {
          method: 'GET'
        })

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const tasks = await response.json()

        setTasks(tasks)
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
