// app/about-us/layout.jsx

export const metadata = {
    title: "About Khushkhabri | Create & Send Beautiful Digital Invitations",
    description:
        "Khushkhabri is India's leading digital invitation platform, helping you create stunning wedding, engagement, and event invites with ease. Discover our story and vision.",
    keywords: [
        "Khushkhabri",
        "About Khushkhabri",
        "Digital Invitation India",
        "Wedding Invite Maker",
        "Online Invitation Platform",
        "Engagement Invitations",
        "Event Management Invitations",
        "Digital Wedding Cards"
    ],
    openGraph: {
        title: "About Khushkhabri | Digital Invitation & Event Experts",
        description:
            "Discover how Khushkhabri makes it easy to design and share beautiful digital invitations for your most special moments.",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Khushkhabri - Digital Invitation Platform",
            },
        ],
        url: "https://khushkhabri.in/about-us",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Khushkhabri | Digital Invitation Platform",
        description:
            "We help you celebrate your special moments with elegant and customizable digital invitations.",
        images: ["/logo.png"],
    },
    alternates: {
        canonical: "https://khushkhabri.in/about-us",
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function Layout({ children }) {
    return (
        <>
            {/* Structured Data for About Page */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        name: "About Khushkhabri",
                        url: "https://khushkhabri.in/about-us",
                        description:
                            "Khushkhabri is a digital invitation platform providing stunning templates for weddings, engagements, and special events.",
                        mainEntity: {
                            "@type": "Organization",
                            name: "Khushkhabri",
                            url: "https://khushkhabri.in",
                        },
                    }),
                }}
            />
            {children}
        </>
    );
}