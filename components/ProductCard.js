import Link from "next/link"

export default function ProductCard({ product }) {
  if (!product) return null

  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-xl shadow hover:shadow-md transition p-4 block"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.category}</p>
      <p className="text-black font-bold mt-1">₹{product.price}</p>
    </Link>
  )
}