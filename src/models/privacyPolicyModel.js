// models/PrivacyPolicy.js
import mongoose from 'mongoose';

const PrivacyPolicySchema = new mongoose.Schema({
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
const PrivacyPolicy = mongoose.models.PrivacyPolicy || mongoose.model('PrivacyPolicy', PrivacyPolicySchema);

export default PrivacyPolicy;
