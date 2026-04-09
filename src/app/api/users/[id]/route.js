// app/api/users/[id]/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { Actions, Resources } from "@/lib/permissions";
import { requirePermissionApi } from "@/lib/serverPermissions";
import Order from "@/models/orderModel";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const user = await User.findById(id).select("-password").populate({
      path: "orders",
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const errorResponse = await requirePermissionApi(
    req,
    Resources.USERS,
    Actions.EDIT
  );
  if (errorResponse) return errorResponse;

  await connectDB();
  try {
    const updates = await req.json();

    const user = await User.findByIdAndUpdate(params.id, updates, {
      new: true,
    });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json({ success: true, user });
  } catch (err) {
    return Response.json(
      { success: false, message: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  const errorResponse = await requirePermissionApi(
    req,
    Resources.USERS,
    Actions.DELETE
  );
  if (errorResponse) return errorResponse;

  await connectDB();
  try {
    const user = await User.findByIdAndDelete(params.id);
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return Response.json({ success: true, message: "User deleted" });
  } catch (err) {
    return Response.json(
      { success: false, message: "Failed to delete user" },
      { status: 500 }
    );
  }
}
