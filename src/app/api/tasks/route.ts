import { TaskPriority } from "@/types/tasks.types"
import { NextRequest, NextResponse } from "next/server"

const tasks = [
  {
    title: "Complete project report",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
    dueDate: "2024-08-01",
    priority: TaskPriority.HIGH
  },
  {
    title: "Schedule meeting with team",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
    dueDate: "2024-07-26",
    priority: TaskPriority.MEDIUM
  },
  {
    title: "Review pull requests",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
    dueDate: "2024-07-28",
    priority: TaskPriority.LOW
  }
]

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate loading delay
  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body) {
      return new NextResponse("Invalid input", { status: 400 })
    }

    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate loading delay

    tasks.push(body)

    return new NextResponse(JSON.stringify(tasks), { status: 201 })
  } catch (error) {
    return new NextResponse("Error processing request", { status: 500 })
  }
}
