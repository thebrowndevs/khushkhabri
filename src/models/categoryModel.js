import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
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
        imageURL: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Avoid recompiling model if already defined (Next.js hot reload)
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
