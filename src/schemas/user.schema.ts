import { UserGenders } from "@/types/user.types"
import { z } from "zod"

export const userSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(2).max(50).email(),
  address: z.string().min(2).max(100),
  gender: z.nativeEnum(UserGenders),
})
