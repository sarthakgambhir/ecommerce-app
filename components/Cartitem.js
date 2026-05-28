import Image from "next/image"

export default function CartItem({ item, onRemove, onUpdateQty }) {
    const itemId = item._id || item.id
    return (
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow mb-4">
        <div className="relative w-20 h-20">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded-lg"
            sizes="80px"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{item.name}</h2>
          <p className="text-gray-500 text-sm">₹{item.price} each</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => onUpdateQty(itemId, item.qty - 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="font-semibold">{item.qty}</span>
            <button
              onClick={() => onUpdateQty(itemId, item.qty + 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">₹{item.price * item.qty}</p>
          <button
            onClick={() => onRemove(itemId)}
            className="text-red-500 text-sm mt-2 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    )
  }