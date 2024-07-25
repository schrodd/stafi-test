"use client"

import { useToast } from "@/components/ui/use-toast"
import { UserContextData, UserData } from "@/types/user.types"
import { createContext, ReactNode, useEffect, useState } from "react"

interface UserContextProps {
  user: UserContextData | null
  setUser: React.Dispatch<React.SetStateAction<UserContextData | null>>
  isLoading: boolean
  error: unknown
  updateUserData: (userData: UserContextData) => void
}

export const UserContext = createContext<UserContextProps | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const { toast } = useToast()

  const updateUserData = (userData: UserContextData) => {
    // The approach here would be a POST to the backend api, and if it's successful, then a GET to load the updated user data.
    // For this example, i'm going to overwrite data directly into the context state.
    setUser((user) => ({ ...user, ...userData }))
    toast({ title: "Great!", description: "You've updated your data successfully." })
  }

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
        const { email, name, gender, location } = data.results[0]
        const { first: firstName, last: lastName } = name
        const { street, city, state, country } = location
        const address = `${street.name} ${street.number} (${city}), ${state}, ${country}`

        setUser({
          email,
          firstName,
          lastName,
          gender,
          address
        })
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
