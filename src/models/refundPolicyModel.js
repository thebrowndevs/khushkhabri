// models/RefundPolicy.js
import mongoose from 'mongoose';

const RefundPolicySchema = new mongoose.Schema({
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    content: {
        type: String, // store your rich-text HTML/Markdown here
        required: true,
    },
});

// Prevent model overwrite upon hot-reload in Next.js dev
const RefundPolicy = mongoose.models.RefundPolicy || mongoose.model('RefundPolicy', RefundPolicySchema);

export default RefundPolicy;
