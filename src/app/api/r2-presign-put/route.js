import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY
    }
});

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const userId = formData.get("userId") || "anonymous";

        if (!file) {
            return Response.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const safeName = file.name.replace(/\s+/g, "_");
        const type = formData.get("type") || "assets";

        const key = `${userId}/${type}/${new Date().getFullYear()}/${uuidv4()}-${safeName}`;

        await s3.send(new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET,
            Key: key,
            Body: buffer,
            ContentType: file.type,
            ContentDisposition: `attachment; filename="${safeName}"`,
            CacheControl: "public, max-age=31536000, immutable"
        }));

        const publicUrl = `${process.env.R2_PUBLIC_BASE}/${key}`;

        return Response.json({ key, publicUrl, imageURL: publicUrl });
    } catch (err) {
        console.error("R2 Upload Error:", err);
        return Response.json({ error: "Upload failed" }, { status: 500 });
    }
}
