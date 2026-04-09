// app/(template pages)/f/[slug]/page.jsx

import { connectDB } from "@/lib/mongodb";
import Invitation from "@/models/invitationModel";
import { notFound } from "next/navigation";
import ResponsiveTemplateWrapper from "./components/ResponsiveTemplateWrapper";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    await connectDB();
    const invitation = await Invitation.findOne({ slug }).lean();

    if (!invitation) return {};

    const groomName = invitation.weddingDetails?.groom?.name || "Groom";
    const brideName = invitation.weddingDetails?.bride?.name || "Bride";
    const side = invitation.weddingDetails?.side || "groom";

    const title = `${groomName} Weds ${brideName}`;
    const description =
        side === "bride"
            ? `${brideName} is inviting you to join their wedding celebration`
            : `${groomName} is inviting you to join their wedding celebration`;

    // const imageUrl =
    //     "https://khushkhabri.vercel.app/templates/floral/floralseo.png";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://khushkhabri.vercel.app/f/${slug}`,
            images: [
                {
                    url: "/floralseo.png",
                    width: 1000,
                    height: 810,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/floralseo.png"],
        },
    };
}

export default async function FloralTemplatePage({ params }) {
    const { slug } = await params;

    await connectDB();
    const invitation = await Invitation.findOne({ slug }).lean();

    if (!invitation) {
        return notFound();
    }

    const dbEvents = invitation.events || [];
    const templateEvents = dbEvents.filter(e => e.enabled).map(e => {
        let type = e.name.toLowerCase();
        if (type === 'wedding') type = 'shaadi';
        if (type === 'mehendi') type = 'mehndi';

        return {
            type,
            active: true,
            date: e.date ? new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
            location: e.venue,
            time: e.time,
            mapLink: e.mapLink
        };
    });

    const weddingDate = invitation.weddingDetails?.weddingDate
        ? new Date(invitation.weddingDetails.weddingDate).toISOString().split('T')[0]
        : "2026-03-26";

    return (

        <ResponsiveTemplateWrapper
            invitation={JSON.parse(JSON.stringify(invitation))}
            events={templateEvents}
            weddingDate={weddingDate}
        />
    );
}