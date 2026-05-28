import Image from "next/image"

export default function CartItem({ item, onRemove, onUpdateQty, isPriority = false }) {
  const itemId = item._id || item.id
  const lineTotal = new Intl.NumberFormat("en-IN").format(item.price * item.qty)
  const unitPrice = new Intl.NumberFormat("en-IN").format(item.price)

  return (
      <div className="card mb-4 flex items-center gap-4 p-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
            priority={isPriority}
            loading={isPriority ? "eager" : "lazy"}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
          <p className="text-sm text-gray-500">₹{unitPrice} each</p>
          <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
            <button
              onClick={() => onUpdateQty(itemId, item.qty - 1)}
              className="h-8 w-8 rounded-full bg-white text-lg font-medium text-gray-700 hover:bg-gray-100"
            >
              -
            </button>
            <span className="min-w-6 text-center font-semibold text-gray-900">{item.qty}</span>
            <button
              onClick={() => onUpdateQty(itemId, item.qty + 1)}
              className="h-8 w-8 rounded-full bg-white text-lg font-medium text-gray-700 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-lg font-bold text-gray-900">₹{lineTotal}</p>
          <button
            onClick={() => onRemove(itemId)}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
  )
}