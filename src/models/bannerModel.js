import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    page: {
      type: String,
      required: true,
      enum: ["home", "about"],
    },
  },
  {
    timestamps: true,
  }
);

// Avoid recompiling model in development (for Next.js)
const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;
