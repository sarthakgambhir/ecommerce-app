"use client"
import { useState, useEffect, useSyncExternalStore } from "react"
import { useRouter } from "next/navigation"

let cartSnapshotCacheRaw = null
let cartSnapshotCacheValue = []

function subscribeToCart(callback) {
  window.addEventListener("storage", callback)
  window.addEventListener("cart-updated", callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener("cart-updated", callback)
  }
}

function getCartSnapshot() {
  const raw = localStorage.getItem("cart") || "[]"
  if (raw === cartSnapshotCacheRaw) {
    return cartSnapshotCacheValue
  }
  cartSnapshotCacheRaw = raw
  cartSnapshotCacheValue = JSON.parse(raw)
  return cartSnapshotCacheValue
}

function getCartServerSnapshot() {
  return null
}

export default function CheckoutPage() {
  const cart = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getCartServerSnapshot
  )
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [ordered, setOrdered] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!ordered && Array.isArray(cart) && cart.length === 0) {
      router.push("/cart")
    }
  }, [ordered, cart, router])

  function getItemId(item) {
    return item._id || item.id
  }

  const safeCart = Array.isArray(cart) ? cart : []
  const total = safeCart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const formattedTotal = new Intl.NumberFormat("en-IN").format(total)

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
      items: safeCart,
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
    window.dispatchEvent(new Event("cart-updated"))

    setLoading(false)
    setOrdered(true)
  }

  if (ordered) {
    return (
      <main className="container-page max-w-2xl text-center">
        <div className="card p-8">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">Order Placed</h1>
          <p className="mb-6 text-gray-500">
            Thank you {name}! Your order has been placed successfully.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    )
  }

  if (!Array.isArray(cart)) {
    return <main className="container-page max-w-3xl text-gray-500">Loading checkout...</main>
  }

  return (
    <main className="container-page max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Checkout</h1>

      {/* Order Summary */}
      <div className="card mb-6 p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
        {safeCart.map((item) => (
          <div key={getItemId(item)} className="mb-2 flex justify-between text-sm text-gray-600">
            <span>{item.name} × {item.qty}</span>
            <span>₹{new Intl.NumberFormat("en-IN").format(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>₹{formattedTotal}</span>
        </div>
      </div>

      {/* Customer Details */}
      <div className="card mb-6 p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Your Details</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
          />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>
      </div>

      <button onClick={handlePlaceOrder} disabled={loading} className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50">
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </main>
  )
}