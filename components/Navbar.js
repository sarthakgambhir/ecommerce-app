"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    function updateCount() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const count = cart.reduce((sum, item) => sum + item.qty, 0)
      setCartCount(count)
    }

    updateCount()
    window.addEventListener("storage", updateCount)
    window.addEventListener("cart-updated", updateCount)
    return () => {
      window.removeEventListener("storage", updateCount)
      window.removeEventListener("cart-updated", updateCount)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/85 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
          MyStore
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/products" className="text-gray-600 hover:text-black font-medium">
          Products
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
          >
            <span aria-hidden>🛒</span>
            <span className="font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav >
  )
}