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
  const formattedTotal = new Intl.NumberFormat("en-IN").format(total)

  if (cart.length === 0) {
    return (
      <main className="container-page max-w-2xl text-center">
        <div className="card p-10">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mb-6 text-gray-500">Looks like you have not added anything yet.</p>
          <Link href="/products" className="inline-flex rounded-full bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800">
          Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container-page max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Your Cart</h1>

      {cart.map((item, index) => (
        <CartItem
          key={getItemId(item)}
          item={item}
          onRemove={handleRemove}
          onUpdateQty={handleUpdateQty}
          isPriority={index === 0}
        />
      ))}

      <div className="card mt-8 p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-700">Total</span>
          <span className="text-3xl font-bold text-gray-900">₹{formattedTotal}</span>
        </div>
        <Link
          href="/checkout"
          className="block rounded-xl bg-black px-6 py-3 text-center font-semibold text-white hover:bg-gray-800"
        >
          Proceed to Checkout
        </Link>
      </div>
    </main>
  )
}