"use client"

import { TaskPriority } from "@/types/tasks.types"
import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  dueDate: z.date(),
  priority: z.nativeEnum(TaskPriority)
})
