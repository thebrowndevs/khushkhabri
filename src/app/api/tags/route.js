// api/tags/route.js

import { connectDB } from "@/lib/mongodb";
import Tag from "@/models/tagModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const tags = await Tag.find().sort({ updatedAt: -1 });
        return NextResponse.json({ data: tags });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json(); // Changed from destructuring { data }

        await connectDB();

        // Check for existing tags
        if (body.name || body.slug) {
            const existing = await Tag.findOne({
                $or: [{ name: body.name }, { slug: body.slug }]
            });

            if (existing) {
                throw new Error("Tag with this slug or name already exists. Please use a unique value.");
            }
        }

        const newTag = await Tag.create(body); // Changed from data to body
        return NextResponse.json({ success: true, tag: newTag }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}



































// import { db } from "@/lib/firebase/firebase-client";
// import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
// import { NextResponse } from 'next/server';

// export async function GET() {
//     try {
//         const q = query(collection(db, "tags"), orderBy("updatedAt", "desc"));
//         const snaps = await getDocs(q);
//         const list = snaps.docs.map((doc) => doc.data());
//         return NextResponse.json({ data: list });
//     } catch (e) {
//         return NextResponse.json({ error: e.message }, { status: 500 });
//     }
// }

// export async function POST(request) {
//     try {
//         const { data } = await request.json();

//         const firestoreRef = doc(db, `tags/${data.slug}`);
//         const existingDoc = await getDoc(firestoreRef);
//         if (existingDoc.exists()) {
//             throw new Error("Tag already exists. Please choose a unique tag.");
//         }

//         await setDoc(firestoreRef, {
//             ...data,
//             createdAt: serverTimestamp(),
//             updatedAt: serverTimestamp()
//         });

//         await updateDoc(firestoreRef, { id: firestoreRef.id });

//         return NextResponse.json({ success: true }, { status: 201 });
//     } catch (e) {
//         return NextResponse.json({ error: e.message }, { status: 400 });
//     }
// }
