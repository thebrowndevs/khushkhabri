import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 120,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 220,
    },
    imageURL: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    status: {
      // active or inactive
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ status: 1 });
blogSchema.index({ featured: 1 });
blogSchema.index({ categories: 1, status: 1 });
blogSchema.index({ slug: 1, status: 1 });
blogSchema.index({ featured: 1, status: 1 });
blogSchema.index({ tags: 1, status: 1 });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
