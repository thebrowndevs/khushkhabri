import React from 'react'
import NavBar from '@/components/website/common/Navbar';
import Footer from '@/components/website/common/Footer';
import ContactSection from '@/components/website/common/ContactSection';
import ContactHero from '@/components/website/home/ContactHero';
import SmoothScroll from '@/components/website/common/SmoothScroll';

export const metadata = {
    title: "Contact Us | Khushkhabri - Digital Invitations",
    description:
        "Get in touch with Khushkhabri for any queries about digital invitations, wedding planning, event management, or custom e-invite solutions.",
    keywords: [
        "Contact Khushkhabri",
        "Digital Invitation Support",
        "Wedding Planning Help",
        "E-Invite Assistance",
        "Event Management Support",
        "Custom Invitation Queries"
    ],
    alternates: {
        canonical: "https://khushkhabri.in/contact-us",
    },
    openGraph: {
        title: "Contact Us - Khushkhabri",
        description:
            "Get in touch with Khushkhabri for any queries about digital invitations and event planning.",
        url: "https://khushkhabri.in/contact-us",
        type: "website",
    },
    twitter: {
        title: "Contact Us - Khushkhabri",
        description:
            "Get in touch with Khushkhabri for any queries about digital invitations.",
    },
};

export default async function page() {
    return (
        <SmoothScroll>
            <div className="relative min-h-screen w-full">
                {/* GLOBAL FIXED BACKGROUND FOR PARALLAX */}
                <div
                    className="fixed inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/bg/pinkbg.png')`, backgroundColor: '#FFEAED' }}
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
        </SmoothScroll>
    )
}

