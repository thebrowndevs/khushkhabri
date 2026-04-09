// app/(template pages)/s/[slug]/page.jsx

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

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://khushkhabri.vercel.app/r/${slug}`,
            images: [
                {
                    url: "/royalseo.png",
                    width: 1000,
                    height: 651,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/royalseo.png"],
        },
    };
}

export default async function SikhTemplatePage({ params }) {
    const { slug } = await params;

    await connectDB();
    const invitation = await Invitation.findOne({ slug }).lean();

    if (!invitation) {
        return notFound();
    }

    const dbEvents = invitation.events || [];
    const templateEvents = dbEvents.filter(e => e.enabled).map(e => {
        let type = e.name.toLowerCase();
        if (type === 'wedding') type = 'anand_karaj';
        if (type === 'mehendi') type = 'mehndi';

        return {
            type,
            active: true,
            date: e.date ? new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
            location: e.venue,
            time: e.time,
            mapLink: e.mapLink,
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