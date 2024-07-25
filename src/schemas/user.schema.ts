"use client"

import { UserGenders } from "@/types/user.types"
import { z } from "zod"

export const userSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(2).max(50).email(),
  gender: z.nativeEnum(UserGenders),
})
