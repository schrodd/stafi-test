import { UserData } from "@/types/user.types"
import { NextRequest, NextResponse } from "next/server"

let user: UserData | null = null

export async function GET() {
  if (!user) {
    try {
      const response = await fetch("https://randomuser.me/api")

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      const { email, name, gender, location } = data.results[0]
      const { first: firstName, last: lastName } = name
      const { street, city, state, country } = location
      const address = `${street.name} ${street.number} (${city}), ${state}, ${country}`

      user = {
        email,
        firstName,
        lastName,
        gender,
        address
      }
    } catch (error) {
      console.error("Failed to fetch random user:", error)
      return NextResponse.json({ message: "Failed to fetch user data" }, { status: 500 })
    }
  }

  return NextResponse.json(user, { status: 200 })
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body) {
      return new NextResponse("Invalid input", { status: 400 })
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate loading delay

    user = {...user, ...body}

    return new NextResponse(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return new NextResponse("Error processing request", { status: 500 })
  }
}