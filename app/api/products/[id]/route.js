import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const product = await Product.findById(id)

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 })
    }

    return Response.json(product)
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch product", details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const product = await Product.findByIdAndUpdate(id, body, { new: true })

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 })
    }

    return Response.json(product)
  } catch (error) {
    return Response.json(
      { error: "Failed to update product", details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = await params
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 })
    }

    return Response.json({ message: "Product deleted successfully" })
  } catch (error) {
    return Response.json(
      { error: "Failed to delete product", details: error.message },
      { status: 500 }
    )
  }
}