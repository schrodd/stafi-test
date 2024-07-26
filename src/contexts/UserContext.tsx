"use client"

import { useToast } from "@/components/ui/use-toast"
import { UserData } from "@/types/user.types"
import { createContext, ReactNode, useEffect, useState } from "react"

interface UserContextProps {
  user: UserData | null
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>
  isLoading: boolean
  error: unknown
  updateUserData: (userData: UserData) => void
}

export const UserContext = createContext<UserContextProps | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const { toast } = useToast()

  const updateUserData = async (userData: UserData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3000/api/user`, {
        method: "PUT",
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()

      setUser(data)
      toast({ title: "Great!", description: "You've updated your data successfully." })
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`http://localhost:3000/api/user`)

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await response.json()

        setUser(data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, error, updateUserData }}>{children}</UserContext.Provider>
  )
}
