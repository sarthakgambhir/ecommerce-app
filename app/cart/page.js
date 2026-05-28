"use client"
import { useSyncExternalStore } from "react"
import Link from "next/link"
import CartItem from "@/components/Cartitem"

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
  return []
}

export default function CartPage() {
  const cart = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getCartServerSnapshot
  )

  function getItemId(item) {
    return item._id || item.id
  }

  function saveCart(updatedCart) {
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cart-updated"))
  }

  function handleRemove(id) {
    const updated = cart.filter((item) => getItemId(item) !== id)
    saveCart(updated)
  }

  function handleUpdateQty(id, newQty) {
    if (newQty < 1) {
      handleRemove(id)
      return
    }
    const updated = cart.map((item) =>
      getItemId(item) === id ? { ...item, qty: newQty } : item
    )
    saveCart(updated)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  if (cart.length === 0) {
    return (
      <main className="p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-blue-500 hover:underline">
          Continue Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <CartItem
          key={getItemId(item)}
          item={item}
          onRemove={handleRemove}
          onUpdateQty={handleUpdateQty}
        />
      ))}

      <div className="bg-white p-4 rounded-xl shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold">₹{total}</span>
        </div>
        <Link
          href="/checkout"
          className="block text-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </main>
  )
}