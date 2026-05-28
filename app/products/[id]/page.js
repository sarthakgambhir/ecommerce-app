"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product")
        }
        return res.json()
      })
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id])

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
  setTimeout(() => setAdded(false), 2000)   // ← resets after 2 seconds
}

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>
  if (!product || product.error) return <div className="p-8 text-red-500">Product not found.</div>

  return (
    <main className="container-page max-w-5xl">
      <div className="card flex flex-col gap-8 p-5 md:flex-row md:p-8">
        <div className="relative h-80 w-full overflow-hidden rounded-xl md:w-1/2 md:h-[28rem]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">{product.category}</p>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mb-5 leading-relaxed text-gray-600">{product.description}</p>
          <p className="mb-6 text-3xl font-bold text-gray-900">₹{new Intl.NumberFormat("en-IN").format(product.price)}</p>
          <button
           onClick={addToCart}
            className={`w-full rounded-xl px-6 py-3 font-semibold ${
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
