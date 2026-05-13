import TestimonialSlider from "@/components/website/home/TestimonialSlider";
import NavBar from "@/components/website/common/Navbar";
import FAQ from "@/components/website/home/FAQ";
import Footer from "@/components/website/common/Footer";
import SmoothScroll from "@/components/website/common/SmoothScroll";
import VideoInvitesHero from "@/components/website/video-invites/VideoInvitesHero";
import DemoVideosSection from "@/components/website/video-invites/DemoVideosSection";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const metadata = {
  title: "Premium Video Invitations | Khushkhabri Custom Invites",
  description:
    "Expertly crafted premium video invitations tailored to your unique requirements. High-quality caricature and traditional video invites in multiple languages.",
  keywords: [
    "Premium Video Invites",
    "Caricature Video Invitations",
    "Custom Wedding Video Invites",
    "Multilingual Video Invitations",
    "Personalized E-invites",
  ],
  alternates: {
    canonical: "https://khushkhabri.in/video-invites",
  },
  openGraph: {
    title: "Premium Video Invitations - Khushkhabri",
    description: "Expertly crafted video invitations for weddings and events.",
    url: "https://khushkhabri.in/video-invites",
    siteName: "Khushkhabri",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Khushkhabri Video Invitations",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Video Invitations | Khushkhabri",
    description: "Expertly crafted video invitations for your special day.",
    images: ["/logo.png"],
  },
};

export default function VideoInvitesPage() {
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

          {/* Video Invites Hero Section */}
          <VideoInvitesHero />

          {/* UNIFIED BACKGROUND WRAPPER FOR SMOOTH BLENDING */}
          <div
            className="relative w-full z-20 pb-5"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 0px, rgba(255,248,249,0.95) 150px, rgba(255,248,249,0.95) calc(100% - 150px), rgba(255,255,255,0) 100%)"
            }}
          >
            <DemoVideosSection />

            <TestimonialSlider />
            <FAQ />
          </div>

          <Footer />
        </div>
      </div>
      <WhatsAppWidget />

    </SmoothScroll>
  );
}
