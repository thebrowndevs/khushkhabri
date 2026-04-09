import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    themeName: { type: String, required: true },
    orderValue: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    razorpayOrderId: { type: String },
    paymentId: { type: String },
    paymentDate: { type: Date },
    status: {
      type: String,
      enum: ["created", "paid", "expired"],
      default: "created",
    },
    satsangDetails: {
        invitorName: String,
        date: Date,
        time: String,
        venue: String,
        musicUrl: String,
        contacts: [
            { name: String, phone: String }
        ]
    },
    mainDetails: {
        brideName: String,
        brideFatherName: String,
        brideMotherName: String,
        groomName: String,
        groomFatherName: String,
        groomMotherName: String,
        weddingDate: Date,
        preWeddingPhotos: [String],
        showPreWeddingPhotos: { type: Boolean, default: true },
        weddingVideo: String,
        showWeddingVideo: { type: Boolean, default: true },
        musicUrl: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
if (Order.schema.path('mainDetails') === undefined || Order.schema.path('mainDetails.musicUrl') === undefined) {
    delete mongoose.models.Order;
}
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
