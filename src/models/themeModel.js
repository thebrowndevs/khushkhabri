import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
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
