"use client"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div style={{ backgroundColor: "#000", color: "#fff" }} className="py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to MyStore</h1>
        <p className="text-xl mb-8" style={{ color: "#9ca3af" }}>
          Discover the best products at unbeatable prices
        </p>
        <Link
          href="/products"
          style={{ backgroundColor: "#fff", color: "#000" }}
          className="px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition inline-block"
        >
          Shop Now →
        </Link>
      </div>

      {/* Features Section */}
      <div style={{ backgroundColor: "#f9fafb" }} className="py-16 px-8">
        <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "#111827" }}>
          Why Shop With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#111827" }}>Free Delivery</h3>
            <p className="text-sm" style={{ color: "#6b7280" }}>On all orders above ₹999</p>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#111827" }}>Quality Products</h3>
            <p className="text-sm" style={{ color: "#6b7280" }}>100% genuine products</p>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}>
            <div className="text-4xl mb-3">↩️</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: "#111827" }}>Easy Returns</h3>
            <p className="text-sm" style={{ color: "#6b7280" }}>7 day return policy</p>
          </div>
        </div>
      </div>
    </main>
  )
}