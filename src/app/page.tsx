"use client"

import ErrorAlert from "@/components/ErrorAlert"
import UserForm from "@/components/UserForm"
import useRandomUser from "@/hooks/useRandomUser"
import { LoaderCircle } from "lucide-react"

export default function Home() {
  const { user, isLoading, error } = useRandomUser()

  return (
    <main className="bg-slate-100 w-full min-h-screen p-10 flex items-start justify-center">
      {error ? (
        <ErrorAlert message="Error fetching user data. Please try again." />
      ) : isLoading || !user ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <UserForm
          placeholders={{
            email: user.email,
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender
          }}
        />
      )}
    </main>
  )
}
