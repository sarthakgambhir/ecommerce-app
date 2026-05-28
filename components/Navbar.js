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
    return () => window.removeEventListener("storage", updateCount)
  }, [])

  return (
    <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
      <Link href="/" className="text-xl font-bold">MyStore</Link>
      <div className="flex gap-6 items-center">
        <Link href="/products" className="text-gray-600 hover:text-black transition">
          Products
        </Link>
        <Link href="/cart" className="relative text-gray-600 hover:text-black transition">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}