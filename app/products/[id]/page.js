import Image from "next/image"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/AddToCartButton"
import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"

export const revalidate = 60

export default async function ProductDetailPage({ params }) {
  const { id } = await params

  await connectDB()
  const product = await Product.findById(id).lean()

  if (!product) {
    notFound()
  }

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
          <AddToCartButton product={JSON.parse(JSON.stringify(product))} />
        </div>
      </div>
    </main>
  )
}
