import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    originalPrice: { type: Number, required: true, default: 7000 },
    discountedPrice: { type: Number, required: true, default: 4000 },
    isActive: { type: Boolean, default: true },
    type: {
      type: String,
      enum: ["wedding", "satsang"],
      required: true,
    }
  },
  { timestamps: true }
);

const Theme = mongoose.models.Theme || mongoose.model("Theme", themeSchema);
export default Theme;
