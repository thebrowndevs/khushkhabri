import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Invitation from "@/models/invitationModel";
import Order from "@/models/orderModel";
import Theme from "@/models/themeModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();
        const {
            orderId,
            inviteId,
            themeName,
            brideName,
            brideFatherName,
            brideMotherName,
            groomName,
            groomFatherName,
            groomMotherName,
            weddingDate,
            side,
            events,
            rsvpNumber,
            preWeddingPhotos,
            showPreWeddingPhotos,
            weddingVideo,
            showWeddingVideo,
            musicUrl,
            isCustomization,
            isCreateNew,
            isSatsang,
            satsangDetails
        } = body;

        if (!orderId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (isSatsang) {
            const updatedOrder = await Order.findByIdAndUpdate(orderId, {
                satsangDetails
            }, { new: true });

            let invitation = await Invitation.findOne({ order: orderId });
            
            if (!invitation) {
                const baseSlug = satsangDetails.invitorName ? satsangDetails.invitorName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'invitation';
                const xyz = Math.random().toString(36).substring(2, 5);
                const slug = `guruji-satsang-by-${baseSlug}-${xyz}`;
                
                const theme = await Theme.findOne({ name: order.themeName || themeName });
                const themeType = theme?.type || "satsang";

                invitation = await Invitation.create({
                    user: session.user.id,
                    order: orderId,
                    themeName: order.themeName || themeName,
                    type: themeType,
                    slug,
                    satsangDetails
                });
            } else {
                invitation.satsangDetails = satsangDetails;
                await invitation.save();
            }

            return NextResponse.json({ success: true, invitation, order: updatedOrder });
        } else if (isCustomization) {
            // Handle Customization (Invitations)
            let invitation;

            if (isCreateNew) {
                // Generate a unique slug: groom-weds-bride-xyz
                const names = order.mainDetails || { groomName: 'couple', brideName: 'name' };
                const g = names.groomName || 'groom';
                const b = names.brideName || 'bride';
                const base = `${g.toLowerCase().replace(/\s+/g, '-')}-weds-${b.toLowerCase().replace(/\s+/g, '-')}`;
                const xyz = Math.random().toString(36).substring(2, 5); // 3-letter code
                const slug = `${base}-${xyz}`;

                // Fetch theme to get type
                const theme = await Theme.findOne({ name: order.themeName || themeName });
                const themeType = theme?.type || "wedding";

                invitation = await Invitation.create({
                    user: session.user.id,
                    order: orderId,
                    themeName: order.themeName || themeName,
                    type: themeType,
                    slug,
                    weddingDetails: {
                        side: side || 'bride',
                        // Initialize with main details from order? Usually yes.
                        bride: { name: order.mainDetails.brideName, father: order.mainDetails.brideFatherName, mother: order.mainDetails.brideMotherName },
                        groom: { name: order.mainDetails.groomName, father: order.mainDetails.groomFatherName, mother: order.mainDetails.groomMotherName },
                        weddingDate: order.mainDetails.weddingDate,
                    },
                    events: events || [],
                    rsvpNumber: rsvpNumber || '',
                    mainDetails: {
                        preWeddingPhotos: preWeddingPhotos || [],
                        showPreWeddingPhotos: showPreWeddingPhotos !== undefined ? showPreWeddingPhotos : true,
                        weddingVideo: weddingVideo || '',
                        showWeddingVideo: showWeddingVideo !== undefined ? showWeddingVideo : true,
                        musicUrl: musicUrl || '',
                    }
                });
            } else if (inviteId) {
                invitation = await Invitation.findById(inviteId);
                if (!invitation) return NextResponse.json({ error: "Invitation not found" }, { status: 404 });

                if (side) invitation.weddingDetails.side = side;
                if (events) invitation.events = events;
                if (rsvpNumber !== undefined) {
                    invitation.rsvpNumber = rsvpNumber;
                    // Force mark as modified if needed
                    invitation.markModified('rsvpNumber');
                }

                if (!invitation.mainDetails) invitation.mainDetails = {};
                if (preWeddingPhotos !== undefined) invitation.mainDetails.preWeddingPhotos = preWeddingPhotos;
                if (showPreWeddingPhotos !== undefined) invitation.mainDetails.showPreWeddingPhotos = showPreWeddingPhotos;
                if (weddingVideo !== undefined) invitation.mainDetails.weddingVideo = weddingVideo;
                if (showWeddingVideo !== undefined) invitation.mainDetails.showWeddingVideo = showWeddingVideo;
                if (musicUrl !== undefined) invitation.mainDetails.musicUrl = musicUrl;

                // Ensure wedding details are up to date from order
                if (order.mainDetails) {
                    invitation.weddingDetails.bride = { 
                        name: order.mainDetails.brideName, 
                        father: order.mainDetails.brideFatherName, 
                        mother: order.mainDetails.brideMotherName 
                    };
                    invitation.weddingDetails.groom = { 
                        name: order.mainDetails.groomName, 
                        father: order.mainDetails.groomFatherName, 
                        mother: order.mainDetails.groomMotherName 
                    };
                    invitation.weddingDetails.weddingDate = order.mainDetails.weddingDate;
                }

                await invitation.save();
            }

            return NextResponse.json({ success: true, invitation });
        } else {
            // Handle Main Details (Order)
            console.log("Saving main details for order:", orderId, { brideName, groomName });
            const updatedOrder = await Order.findByIdAndUpdate(orderId, {
                mainDetails: {
                    brideName,
                    brideFatherName,
                    brideMotherName,
                    groomName,
                    groomFatherName,
                    groomMotherName,
                    weddingDate: new Date(weddingDate),
                    preWeddingPhotos: preWeddingPhotos || [],
                    showPreWeddingPhotos: showPreWeddingPhotos !== undefined ? showPreWeddingPhotos : true,
                    weddingVideo: weddingVideo || '',
                    showWeddingVideo: showWeddingVideo !== undefined ? showWeddingVideo : true,
                    musicUrl: musicUrl || '',
                }
            }, { new: true });

            // Sync changes to all invitations under this order
            await Invitation.updateMany({ order: orderId }, {
                $set: {
                    "weddingDetails.bride": { 
                        name: brideName, 
                        father: brideFatherName, 
                        mother: brideMotherName 
                    },
                    "weddingDetails.groom": { 
                        name: groomName, 
                        father: groomFatherName, 
                        mother: groomMotherName 
                    },
                    "weddingDetails.weddingDate": new Date(weddingDate),
                    "mainDetails.preWeddingPhotos": preWeddingPhotos || [],
                    "mainDetails.showPreWeddingPhotos": showPreWeddingPhotos !== undefined ? showPreWeddingPhotos : true,
                    "mainDetails.weddingVideo": weddingVideo || '',
                    "mainDetails.showWeddingVideo": showWeddingVideo !== undefined ? showWeddingVideo : true,
                    "mainDetails.musicUrl": musicUrl || '',
                }
            });

            console.log("Updated order result:", updatedOrder.mainDetails);
            return NextResponse.json({ success: true, order: updatedOrder });
        }

        return NextResponse.json({ success: true, invitation });
    } catch (err) {
        console.error("Save invitation API error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
