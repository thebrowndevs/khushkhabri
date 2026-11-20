import NavBar from "@/components/website/common/Navbar";
import Footer from "@/components/website/common/Footer";
import SmoothScroll from "@/components/website/common/SmoothScroll";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CustomInvitesView from "@/components/website/custom-invites/CustomInvitesView";

export const metadata = {
  title: "Bespoke & Custom Wedding Invitations | Khushkhabri",
  description:
    "Looking for a one-of-a-kind wedding invite? Khushkhabri crafts 100% custom wedding invitation websites, couple caricatures, animated video films, and digital suites tailored to your love story.",
  keywords: [
    "Custom Wedding Invitations",
    "Bespoke Wedding Websites",
    "Custom Caricature Invites",
    "Personalized Wedding Cards",
    "Luxury Digital Invites",
  ],
  alternates: {
    canonical: "https://khushkhabri.in/custom-invites",
  },
  openGraph: {
    title: "Bespoke & Custom Wedding Invitations - Khushkhabri",
    description: "Craft bespoke wedding invitation websites, couple caricatures, animated video films, and luxury digital suites designed from scratch.",
    url: "https://khushkhabri.in/custom-invites",
    siteName: "Khushkhabri",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Khushkhabri Custom Invitations",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bespoke & Custom Wedding Invitations | Khushkhabri",
    description: "Craft bespoke wedding invitation websites, couple caricatures, animated video films, and luxury digital suites designed from scratch.",
    images: ["/logo.png"],
  },
};

export default function CustomInvitesPage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full bg-[#fdfcfb]">
        {/* Global Fixed Background for Consistency */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/bg/pinkbg.webp')`, backgroundColor: '#FFEAED' }}
        />
        <div className="fixed inset-0 z-0 bg-white/75 backdrop-blur-[2px]" />

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-screen justify-between">
          <div>
            <NavBar />
            <CustomInvitesView />
          </div>
          <Footer />
        </div>
      </div>
      <WhatsAppWidget />
    </SmoothScroll>
  );
}
