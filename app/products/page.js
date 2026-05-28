"use client"
import { useState, useEffect } from "react"
import ProductCard from "@/components/ProductCard"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8 text-gray-500">Loading products...</div>

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#111827" }}>All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}