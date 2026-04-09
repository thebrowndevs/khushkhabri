import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    company: {
      type: String,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Avoid recompiling model if already defined (Next.js hot reload)
const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
