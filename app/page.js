"use client"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 px-6 py-24 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-300">Modern Ecommerce Experience</p>
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-6xl">Welcome to MyStore</h1>
          <p className="mb-8 text-lg text-gray-300 md:text-xl">
          Discover the best products at unbeatable prices
          </p>
          <Link href="/products" className="inline-flex rounded-full bg-white px-8 py-3 text-lg font-semibold text-gray-900 hover:-translate-y-0.5 hover:bg-gray-100">
            Shop Now →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-page">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
          Why Shop With Us
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="card text-center p-6">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Free Delivery</h3>
            <p className="text-sm text-gray-600">On all orders above ₹999</p>
          </div>
          <div className="card text-center p-6">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Quality Products</h3>
            <p className="text-sm text-gray-600">100% genuine products</p>
          </div>
          <div className="card text-center p-6">
            <div className="text-4xl mb-3">↩️</div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Easy Returns</h3>
            <p className="text-sm text-gray-600">7 day return policy</p>
          </div>
        </div>
      </section>
    </main>
  )
}