import NavBar from "@/components/website/common/Navbar";
import Footer from "@/components/website/common/Footer";
import { getPrivacyPolicy } from "@/lib/main/getStaticData";
import ReactMarkdown from 'react-markdown';
import styles from './components/post.module.css';
import rehypeRaw from 'rehype-raw';
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata = {
    title: "Privacy Policy | Khushkhabri - Digital Invitations",
    description:
        "Read Khushkhabri's privacy policy to understand how we collect, use, and protect your personal information for digital invitations and event planning services.",
    keywords: [
        "Privacy Policy",
        "Khushkhabri Privacy",
        "Data Protection",
        "Privacy Policy India",
        "Digital Invitation Privacy",
        "User Data Protection"
    ],
    alternates: {
        canonical: "https://khushkhabri.in/privacy-policy",
    },
    openGraph: {
        title: "Privacy Policy - Khushkhabri",
        description:
            "Understand how Khushkhabri protects your privacy while creating beautiful digital invitations.",
        url: "https://khushkhabri.in/privacy-policy",
        type: "website",
    },
    twitter: {
        title: "Privacy Policy - Khushkhabri",
        description:
            "Read Khushkhabri's privacy policy for digital invitation services.",
    },
};

export default async function page() {
    const privacyPolicy = await getPrivacyPolicy();

    return (
        <div className="relative min-h-screen w-full flex flex-col">
            {/* GLOBAL FIXED BACKGROUND FOR PARALLAX */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/bg/pinkbg.webp')`, backgroundColor: '#FFEAED' }}
            />
            {/* Shared Overlay */}
            <div className="fixed inset-0 z-0 bg-white/60 backdrop-blur-[2px]" />

            {/* FOREGROUND CONTENT */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <NavBar />

                {privacyPolicy && (
                    <>
                        {/* Header Section */}
                        <div className="py-20 md:py-24 px-4 text-center max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-7xl text-[#5a1e2b] mb-8 leading-tight font-script">
                                Privacy Policy
                            </h1>
                            <p className="text-[#7a2535] font-medium opacity-80">
                                Last updated: {new Date(privacyPolicy.lastUpdated).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>

                        {/* Content section */}
                        <div className="max-w-5xl mx-auto px-4 pb-20 w-full">
                            <div className="bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/60">
                                <div className={`${styles.postStyle} p-8 md:p-14 text-gray-800`}>
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                        {privacyPolicy.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <Footer />
            </div>
            <WhatsAppWidget />

        </div>
    )
}
