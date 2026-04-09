
import mongoose from 'mongoose';

const TermsConditionsSchema = new mongoose.Schema({
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
const TermsConditions = mongoose.models.TermsConditions || mongoose.model('TermsConditions', TermsConditionsSchema);

export default TermsConditions;
