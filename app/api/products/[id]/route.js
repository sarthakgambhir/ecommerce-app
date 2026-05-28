import { getProductById } from "@/lib/products"

// GET one product
export async function GET(request, { params }) {
  const { id } = await params


  const product = getProductById(id)

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json(product)
}
// PUT - update a product
export async function PUT(request, { params }) {
  const product = getProductById(params.id)

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  const body = await request.json()

  // Merge existing product with updates
  const updatedProduct = {
    ...product,
    ...body,
    id: params.id, // never allow id to change
  }

  return Response.json(updatedProduct)
}

// DELETE - delete a product
export async function DELETE(request, { params }) {
  const product = getProductById(params.id)

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 })
  }

  return Response.json({ message: "Product deleted successfully" })
}