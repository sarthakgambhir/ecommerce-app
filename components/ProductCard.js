import Link from "next/link"
import Image from "next/image"

export default function ProductCard({ product }) {
  if (!product) return null
  const formattedPrice = new Intl.NumberFormat("en-IN").format(product.price)

  return (
    <Link
      href={`/products/${product._id}`}
      prefetch={true}
      className="card group block overflow-hidden p-3 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative mb-4 h-52 w-full overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className="px-1 pb-2">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">{product.category}</p>
        <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">{product.name}</h2>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">₹{formattedPrice}</p>
          <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">View</span>
        </div>
      </div>
    </Link>
  )
}