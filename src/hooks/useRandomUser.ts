import { UserData } from "@/types/user.types"
import { useState, useEffect } from "react"

const useRandomUser = () => {
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

  return { user, isLoading, error }
}

export default useRandomUser
