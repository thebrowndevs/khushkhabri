// lib/upload.js
import cloudinary from './cloudinary'

// Accepts either a filesystem path or a dataURI string
export async function uploadToCloudinary(source) {
    const uploadOpts = {
        resource_type: 'auto',
        folder: 'order_documents',
    }

    // If it’s a data URI we pass it directly; else, assume it’s a file path
    const result = await cloudinary.uploader.upload(
        source,
        uploadOpts
    )

    return {
        public_id: result.public_id,
        secure_url: result.secure_url,
    }
}
