import { UserGenders } from "./user.types"

export interface UserFormProps {
  placeholders?: {
    firstName?: string
    lastName?: string
    email?: string
    gender?: UserGenders
    address?: string
  }
}