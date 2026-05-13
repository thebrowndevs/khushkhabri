export const revalidate = 60;

import TestimonialSlider from "@/components/website/home/TestimonialSlider";
import NavBar from "@/components/website/common/Navbar";
import FAQ from "@/components/website/home/FAQ";
import Footer from "@/components/website/common/Footer";
import ContactSection from "@/components/website/common/ContactSection";
import TemplatesSection from "@/components/website/home/TemplatesSection";
import HeroSection2 from "@/components/website/home/HeroSection2";
import ComparisonSection from "@/components/website/home/ComparisonSection";
import ComparisonTableSection from "@/components/website/home/ComparisonTableSection";
import FeatureVisualSection from "@/components/website/home/FeatureVisualSection";
import HowItWorksSection from "@/components/website/home/HowItWorksSection";
import SmoothScroll from "@/components/website/common/SmoothScroll";
import FeaturedBy from "@/components/website/home/FeaturedBy";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default async function Home() {
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
        <div className="relative z-10">
          {/* First Fold (Navbar + Hero) */}
          <div className="flex flex-col min-h-[100dvh] sm:min-h-[100vh]">
            <NavBar />
            <HeroSection2 />
            <FeaturedBy />
          </div>

          {/* Templates Section */}
          <TemplatesSection />

          {/* UNIFIED BACKGROUND WRAPPER FOR SMOOTH BLENDING */}
          <div
            className="relative w-full z-20 pb-5"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 0px, rgba(255,248,249,0.95) 150px, rgba(255,248,249,0.95) calc(100% - 150px), rgba(255,255,255,0) 100%)"
            }}
          >
            {/* Comparison Section (Boring vs Digital) */}
            <div className="hidden sm:block">
              <ComparisonSection />
            </div>

            {/* Comparison Table Section (Detailed features) */}
            <ComparisonTableSection />

            {/* Feature Visual Grid Section */}
            <FeatureVisualSection />

            {/* How It Works Steps */}
            <HowItWorksSection />

            <TestimonialSlider />
            <FAQ />
          </div>

          {/* Contact Section */}
          <div className="pt-0 pb-20 relative z-20">
            <ContactSection bgColor={'bg-white'} />
          </div>
          <Footer />
        </div>
      </div>
      <WhatsAppWidget />

    </SmoothScroll>
  );
}