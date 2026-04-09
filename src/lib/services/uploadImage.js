import { convertToBase64 } from "./convertToBase64";

export default async function uploadImage(image) {
    const base64Image = await convertToBase64(image);

    const response = await fetch('/api/upload', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image })
    })

    const imageURL = await response.json();

    return imageURL;
}