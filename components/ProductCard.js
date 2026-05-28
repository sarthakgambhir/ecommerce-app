import Link from "next/link"
import Image from "next/image"

export default function ProductCard({ product }) {
  if (!product) return null

  return (
    <Link
      href={`/products/${product._id}`}
      className="bg-white rounded-xl shadow hover:shadow-md transition p-4 block"
    >
      <div className="relative w-full h-48 mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.category}</p>
      <p className="text-black font-bold mt-1">₹{product.price}</p>
    </Link>
  )
}