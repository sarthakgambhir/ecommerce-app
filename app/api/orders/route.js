import { connectDB } from "@/lib/mongodb"
import Order from "@/models/Order"

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()

    if (!body.items || body.items.length === 0) {
      return Response.json(
        { error: "Order must have at least one item" },
        { status: 400 }
      )
    }

    const order = await Order.create(body)
    return Response.json(order, { status: 201 })
  } catch (error) {
    return Response.json(
      { error: "Failed to place order", details: error.message },
      { status: 500 }
    )
  }
}