import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET() {
  await connectDB()
  const products = await Product.find()
  return Response.json(products)
}

export async function POST(request) {
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
}