import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);

// Avoid recompiling model if already defined (Next.js hot reload)
const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);

export default Tag;
