// app/layout.jsx
import "./globals.css";
import { Poppins, Montserrat, DM_Sans, Anton } from "next/font/google";
import AuthProvider from "@/components/auth/AuthProvider";
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  metadataBase: new URL("https://khushkhabri.in"),
  title: {
    default: "Khushkhabri - Create & Send Beautiful Digital Invitations",
    template: "%s | Khushkhabri",
  },
  description:
    "Khushkhabri helps you create and send stunning digital invitations for weddings, engagements and special events. Share your moments with beautifully designed templates.",
  keywords: [
    "Khushkhabri",
    "Digital Invitation",
    "Wedding Invitation Website",
    "Online Wedding Cards",
    "Invitation Maker India",
    "E Invite Platform",
    "Wedding Website Builder",
    "Indian Wedding Invitations",
  ],
  openGraph: {
    title: "Khushkhabri - Digital Invitation Platform",
    description:
      "Design and share beautiful digital invitations for weddings and events with Khushkhabri. Easy to create, customize and send.",
    url: "https://khushkhabri.in",
    siteName: "Khushkhabri",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Khushkhabri Digital Invitation Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khushkhabri - Digital Invitation Platform",
    description:
      "Create elegant digital invitations for weddings and events. Share instantly with your loved ones.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://khushkhabri.in",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        {/* Structured Data for Brand Authority */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Khushkhabri",
              url: "https://khushkhabri.in",
              logo: "https://khushkhabri.in/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 9990440099",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: "English",
              }
            }),
          }}
        />

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "wf6nd6ufsm");
  `}
        </Script>

      </head>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${dmSans.variable} ${anton.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>

        {/* <div className="max-[1024px]:hidden">
          <EnquiryWidget />
        </div> */}

        {/* <ContactWidget /> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GJ9BGPR68N"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-GJ9BGPR68N');
  `}
        </Script>
      </body>
    </html>
  );
}