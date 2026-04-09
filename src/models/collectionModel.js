import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: true,
    },
    featureOnHomePage: {
      type: Boolean,
      required: true,
    },
    saleStart: {
      type: Date,
    },
    saleEnd: {
      type: Date,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
        variantName: {
          type: String,
          required: true,
        },
        variantId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Avoid recompilation in Next.js
const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
