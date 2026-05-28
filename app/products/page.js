import ProductCard from "@/components/ProductCard"
import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"

export const revalidate = 60

export default async function ProductsPage() {
  await connectDB()
  const products = await Product.find().lean()

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