"use client"

import { useState } from "react"

export default function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false)

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const productId = product._id || product.id
    const existing = cart.find((item) => (item._id || item.id) === productId)

    if (existing) {
      existing.qty += 1
    } else {
      cart.push({ ...product, qty: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={addToCart}
      className={`w-full rounded-xl px-6 py-3 font-semibold ${
        added ? "bg-green-500 text-white" : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {added ? "✓ Added to Cart!" : "Add to Cart"}
    </button>
  )
}
