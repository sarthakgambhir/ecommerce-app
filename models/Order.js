import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  items: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "placed" },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)