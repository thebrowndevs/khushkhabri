import React from 'react'
import NavBar from '@/components/website/common/Navbar';
import Footer from '@/components/website/common/Footer';
import ContactSection from '@/components/website/common/ContactSection';
import ContactHero from '@/components/website/home/ContactHero';
import SmoothScroll from '@/components/website/common/SmoothScroll';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export const metadata = {
    title: "Contact Us | Khushkhabri - Digital Invitations Support",
    description:
        "Get in touch with Khushkhabri for any queries about digital invitations, wedding planning websites, or custom e-invite solutions. We're here to help you share your joy.",
    keywords: [
        "Contact Khushkhabri",
        "Digital Invitation Support",
        "Wedding Website Help",
        "E-Invite Assistance India",
        "Custom Invitation Queries",
        "Khushkhabri Customer Care"
    ],
    alternates: {
        canonical: "https://khushkhabri.in/contact-us",
    },
    openGraph: {
        title: "Contact Us - Khushkhabri",
        description:
            "Get in touch with Khushkhabri for support with your digital invitations and wedding websites.",
        url: "https://khushkhabri.in/contact-us",
        siteName: "Khushkhabri",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Contact Khushkhabri",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us - Khushkhabri",
        description:
            "Get in touch with Khushkhabri for any queries about digital invitations.",
        images: ["/logo.png"],
    },
};

export default async function page() {
    return (
        <SmoothScroll>
            <div className="relative min-h-screen w-full">
                {/* GLOBAL FIXED BACKGROUND FOR PARALLAX */}
                <div
                    className="fixed inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/bg/pinkbg.webp')`, backgroundColor: '#FFEAED' }}
                />
                {/* Shared Overlay */}
                <div className="fixed inset-0 z-0 bg-white/60 backdrop-blur-[2px]" />

                {/* FOREGROUND CONTENT */}
                <div className="relative z-10 flex flex-col">
                    <NavBar />

                    {/* Contact Hero Section */}
                    <ContactHero />

                    {/* Contact form and details */}
                    <div className="pb-20">
                        <ContactSection />
                    </div>

                    <Footer />
                </div>
            </div>
            <WhatsAppWidget />

        </SmoothScroll>
    )
}

