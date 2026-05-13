import TestimonialSlider from "@/components/website/home/TestimonialSlider";
import NavBar from "@/components/website/common/Navbar";
import FAQ from "@/components/website/home/FAQ";
import Footer from "@/components/website/common/Footer";
import AboutEssence from "@/components/website/home/AboutEssence";
import AboutHero from "@/components/website/home/AboutHero";
import SmoothScroll from "@/components/website/common/SmoothScroll";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function AboutPage() {
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

          {/* About Hero Section */}
          <AboutHero />

          {/* UNIFIED BACKGROUND WRAPPER FOR SMOOTH BLENDING */}
          <div
            className="relative w-full z-20 pb-5"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 0px, rgba(255,248,249,0.95) 150px, rgba(255,248,249,0.95) calc(100% - 150px), rgba(255,255,255,0) 100%)"
            }}
          >
            {/* Why Khushkhabri Section */}
            <AboutEssence />

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
