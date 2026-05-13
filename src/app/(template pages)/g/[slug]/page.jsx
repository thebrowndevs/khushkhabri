import { connectDB } from "@/lib/mongodb";
import Invitation from "@/models/invitationModel";
import { notFound } from "next/navigation";
import ResponsiveTemplateWrapper from "./components/ResponsiveTemplateWrapper";
import { DEMO_SLUGS } from "@/lib/constants/demoSlugs";
import DemoCheckoutButton from "@/components/website/DemoCheckoutButton";
export async function generateMetadata({ params }) {
    const { slug } = await params;

    await connectDB();
    const invitation = await Invitation.findOne({ slug }).lean();

    if (!invitation) return {};

    const invitorName = invitation.satsangDetails?.invitorName || "Khanna Family";

    const satsangDate = invitation.satsangDetails?.date;
    const formattedDate =
        satsangDate
            ? new Date(satsangDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            : "";

    const title = `Guruji Satsang Invitation by ${invitorName} | Khushkhabri.in`;
    const description = `You are lovingly invited to attend the Guruji Satsang by ${invitorName} on ${formattedDate} | Khushkhabri.in`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://khushkhabri.in/g/${slug}`,
            images: [
                {
                    url: "/satsangseo.png", // fallback placeholder
                    width: 700,
                    height: 547,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/satsangseo.png"],
        },
    };
}

export default async function GurujiTemplatePage({ params }) {
    const { slug } = await params;

    await connectDB();
    const invitation = await Invitation.findOne({ slug }).lean();

    if (!invitation) {
        return notFound();
    }

    return (
        <>
            <ResponsiveTemplateWrapper
                invitation={JSON.parse(JSON.stringify(invitation))}
            />
            {DEMO_SLUGS.includes(slug) && (
                <DemoCheckoutButton themeName={invitation.themeName} />
            )}
        </>
    );
}
