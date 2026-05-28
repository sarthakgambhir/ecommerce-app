import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request, { params }) {
  await connectDB()
  const { id } = await params
  const product = await Product.findById(id)

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json(product)
}

export async function PUT(request, { params }) {
  await connectDB()
  const { id } = await params
  const body = await request.json()
  const product = await Product.findByIdAndUpdate(id, body, { new: true })

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json(product)
}

export async function DELETE(request, { params }) {
  await connectDB()
  const { id } = await params
  const product = await Product.findByIdAndDelete(id)

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json({ message: "Product deleted successfully" })
}