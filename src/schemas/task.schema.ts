"use client"

import { TaskPriority } from "@/types/tasks.types"
import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(2).max(50),
  dueDate: z
    .string()
    .refine((date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/
      return regex.test(date)
    }, "Invalid date format. Expected YYYY-MM-DD")
    .transform((date) => new Date(date))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date value"
    }),
  priority: z.nativeEnum(TaskPriority)
})
