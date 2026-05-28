"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Product data:", data)  // ← added this
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log("Error:", err)          // ← added this
        setLoading(false)
      })
  }, [id])

  const [added, setAdded] = useState(false)

function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const existing = cart.find((item) => item.id === product.id)

  if (existing) {
    existing.qty += 1
  } else {
    cart.push({ ...product, qty: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  window.dispatchEvent(new Event("storage")) // ← updates navbar count
  setAdded(true)
  setTimeout(() => setAdded(false), 2000)   // ← resets after 2 seconds
}

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>
  if (!product || product.error) return <div className="p-8 text-red-500">Product not found.</div>

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-xl"
        />
        <div className="flex flex-col justify-center">
          <p className="text-sm text-gray-400 mb-1">{product.category}</p>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-6">₹{product.price}</p>
          <button
           onClick={addToCart}
            className={`px-6 py-3 rounded-lg transition font-semibold w-full ${
              added
                ? "bg-green-500 text-white"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  )
}
