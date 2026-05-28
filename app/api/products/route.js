import { getAllProducts } from "@/lib/products"

export async function GET() {
  const products = getAllProducts()
  return Response.json(products)
}

export async function POST(request) {
  const body = await request.json()

  if (!body.name || !body.price) {
    return Response.json(
      { error: "Name and price are required" },
      { status: 400 }
    )
  }

  const newProduct = {
    id: Date.now().toString(),
    name: body.name,
    price: body.price,
    description: body.description || "",
    image: body.image || "",
    category: body.category || "",
  }

  return Response.json(newProduct, { status: 201 })
}