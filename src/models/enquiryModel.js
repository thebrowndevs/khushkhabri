import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name must be less than 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
        },
        contact: {
            type: String,
            required: [true, 'Contact number is required'],
            trim: true,
            match: [/^\d{7,15}$/, 'Please provide a valid contact number'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
            minlength: [10, 'Message must be at least 10 characters long'],
            maxlength: [1000, 'Message must be under 1000 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'resolved'],
            default: 'pending'
        },
        important: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
