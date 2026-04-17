// app/blogs/layout.jsx

import SmoothScroll from "@/components/website/common/SmoothScroll";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata = {
    title: "Digital Invitation & Event Planning Blogs | Khushkhabri",
    description:
        "Explore expert tips and inspiration from Khushkhabri on digital wedding invitations, event planning, e-invites, and making your special moments memorable.",
    keywords: [
        "Khushkhabri Blog",
        "Digital Invitation Tips",
        "Wedding Planning Blog India",
        "E-Invite Inspiration",
        "Online Wedding Cards Guide",
        "Event Management Insights",
        "Digital Invitation Trends"
    ],
    alternates: {
        canonical: "https://khushkhabri.in/blogs",
    },
    openGraph: {
        title: "Digital Invitation & Event Planning Blogs - Khushkhabri",
        description:
            "Stay updated with the latest trends in digital invitations, wedding planning, and event management with Khushkhabri.",
        url: "https://khushkhabri.in/blogs",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Khushkhabri Blog | Digital Invitation & Event Insights",
        description:
            "Insights on digital wedding invites, e-cards, and seamless event planning.",
    },
};

export default function Layout({ children }) {
    return (
        <>
            {/* Blog Collection Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        name: "Khushkhabri Blog",
                        url: "https://khushkhabri.in/blogs",
                        description:
                            "Digital invitation trends, wedding planning tips, and event management insights by Khushkhabri.",
                        publisher: {
                            "@type": "Organization",
                            name: "Khushkhabri",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://khushkhabri.in/logo.png"
                            }
                        }
                    }),
                }}
            />
            <SmoothScroll>
                {children}
                <WhatsAppWidget />
            </SmoothScroll>
        </>
    );
}