import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/contexts/UserContext"
import { TasksProvider } from "@/contexts/TasksContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stafi assessment - Andrés Molina",
  description: "Stafi assessment - Andrés Molina"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UserProvider>
      <TasksProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </TasksProvider>
    </UserProvider>
  )
}
