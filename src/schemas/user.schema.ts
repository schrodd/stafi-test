"use client"

import { z } from "zod"

export enum Genders {
  MASCULINE = "Masculine",
  FEMININE = "Feminine",
  NON_BINARY = "Non-binary",
  PRIVATE = "Prefer not to say"
}

export const userSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  gender: z.nativeEnum(Genders),
})
