import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Invitation from "@/models/invitationModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Invitation ID is required" }, { status: 400 });
        }

        const invitation = await Invitation.findById(id);
        if (!invitation) {
            return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
        }

        // Verify ownership
        if (invitation.user.toString() !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await Invitation.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Invitation deleted successfully" });
    } catch (err) {
        console.error("Delete invitation error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
