import TestimonialSlider from "@/components/website/home/TestimonialSlider";
import NavBar from "@/components/website/common/Navbar";
import FAQ from "@/components/website/home/FAQ";
import Footer from "@/components/website/common/Footer";
import SmoothScroll from "@/components/website/common/SmoothScroll";
import VideoInvitesHero from "@/components/website/video-invites/VideoInvitesHero";
import DemoVideosSection from "@/components/website/video-invites/DemoVideosSection";

export const metadata = {
  title: 'Video Invitations | Khushkhabri',
  description: 'Premium designed video invitations tailored to your unique requirements. Crafted by experts in multiple languages.',
}

export default function VideoInvitesPage() {
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
    </SmoothScroll>
  );
}
