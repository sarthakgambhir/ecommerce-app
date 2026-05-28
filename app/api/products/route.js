import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET() {
  try {
    await connectDB()
    const products = await Product.find()
    return Response.json(products)
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()

    if (!body.name || !body.price) {
      return Response.json(
        { error: "Name and price are required" },
        { status: 400 }
      )
    }

    const product = await Product.create(body)
    return Response.json(product, { status: 201 })
  } catch (error) {
    return Response.json(
      { error: "Failed to create product", details: error.message },
      { status: 500 }
    )
  }
}