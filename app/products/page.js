"use client"
import { useState, useEffect } from "react"
import ProductCard from "@/components/ProductCard"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products")
        }
        return res.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Could not load products right now.")
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8 text-gray-500">Loading products...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>

  return (
    <main className="container-page">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Collection</p>
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-500">Discover top picks curated for daily essentials and style.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  )
}