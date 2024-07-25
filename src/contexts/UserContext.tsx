"use client"

import { UserData } from "@/types/user.types"
import { createContext, ReactNode, useEffect, useState } from "react"

interface UserContextProps {
  user: UserData | null
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>
  isLoading: boolean
  error: unknown
}

export const UserContext = createContext<UserContextProps | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://randomuser.me/api`)

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await response.json()
        setUser(data.results[0])
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return <UserContext.Provider value={{ user, setUser, isLoading, error }}>{children}</UserContext.Provider>
}
