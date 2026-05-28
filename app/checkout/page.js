"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const [cart, setCart] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [ordered, setOrdered] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]")
    if (stored.length === 0) {
      router.push("/cart")
    }
    setCart(stored)
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  
  async function handlePlaceOrder() {
    if (!name || !email || !address) {
      alert("Please fill in all fields")
      return
    }
  
    if (!validateEmail(email)) {
      alert("Please enter a valid email address")
      return
    }
  
    if (name.length < 3) {
      alert("Please enter your full name")
      return
    }
  
    if (address.length < 10) {
      alert("Please enter a complete address")
      return
    }
  
    setLoading(true)
    // ... rest of your code stays the same

    const order = {
      customerName: name,
      customerEmail: email,
      customerAddress: address,
      items: cart,
      totalAmount: total,
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })

    const data = await res.json()

    // save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    existingOrders.push(data)
    localStorage.setItem("orders", JSON.stringify(existingOrders))

    // clear the cart
    localStorage.removeItem("cart")

    setLoading(false)
    setOrdered(true)
  }

  if (ordered) {
    return (
      <main className="p-8 max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-3xl font-bold mb-4">🎉 Order Placed!</h1>
          <p className="text-gray-500 mb-6">
            Thank you {name}! Your order has been placed successfully.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2 text-sm">
            <span>{item.name} × {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Customer Details */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Your Details</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </main>
  )
}