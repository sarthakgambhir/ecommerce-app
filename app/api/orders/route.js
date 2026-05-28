// POST - create an order
export async function POST(request) {
    const body = await request.json()
  
    // Basic validation
    if (!body.items || body.items.length === 0) {
      return Response.json(
        { error: "Order must have at least one item" },
        { status: 400 }
      )
    }
  
    // Build the order object
    const order = {
      id: Date.now().toString(),
      items: body.items,
      totalAmount: body.totalAmount,
      customerName: body.customerName || "Guest",
      createdAt: new Date().toISOString(),
      status: "placed",
    }
  
    // For now returns the order (MongoDB will actually save it later)
    return Response.json(order, { status: 201 })
  }