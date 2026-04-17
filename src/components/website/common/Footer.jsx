'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { FiMail, FiPhone } from 'react-icons/fi'

export default function Footer() {

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
    { label: "About Us", href: "/about-us" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "My Profile", href: "/profile" }
  ]

  return (
    <footer className="bg-[#4b0f1a] text-white">

      <div className="max-w-7xl mx-auto w-[85%] px-6 py-14">

        {/* Logo + Tagline */}
        <div className="flex flex-col items-center text-center mb-12">

          <Image
            src="/logoWhite.png"
            alt="Khushkhabari"
            width={220}
            height={80}
            className="h-14 w-auto"
          />

          <p className="text-sm text-gray-300 mt-3 italic">
            Create beautiful invitations and share your happiness with loved ones
          </p>

        </div>


        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-3 gap-10 border-t border-b border-[#7a2535] py-10">

          {/* Quick Links */}
          <div className="text-center md:text-start">

            <h3 className="font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col space-y-2 text-gray-300">

              {quickLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}

            </div>

          </div>



          {/* Policies */}
          <div className="text-center">

            <h3 className="font-semibold text-lg mb-4">
              Policies
            </h3>

            <div className="flex flex-col space-y-2 text-gray-300">

              <Link
                href="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/refund-policy"
                className="hover:text-white transition"
              >
                Refund Policy
              </Link>

              <Link
                href="/terms&conditions"
                className="hover:text-white transition"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>



          {/* Contact + Social */}
          <div className="text-center md:text-right">

            <h3 className="font-semibold text-lg mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-gray-300">

              <div className="flex justify-center md:justify-end items-center gap-2">
                <FiMail />
                <a
                  href="mailto:khushkhabri@gmail.com"
                  className="hover:text-white transition"
                >
                  khushkhabri@gmail.com
                </a>
              </div>

              <div className="flex justify-center md:justify-end items-center gap-2">
                <FiPhone />
                <a
                  href="tel:+918878789898"
                  className="hover:text-white transition"
                >
                  +91 8878789898
                </a>
              </div>

            </div>


            {/* Social */}
            <div className="flex justify-center md:justify-end gap-4 mt-6">

              <a
                href="#"
                className="bg-[#6b1a2a] p-3 rounded-full hover:bg-[#8c2236] transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="bg-[#6b1a2a] p-3 rounded-full hover:bg-[#8c2236] transition"
              >
                <FaYoutube size={18} />
              </a>

            </div>

          </div>

        </div>



        {/* Bottom Copyright */}
        <div className="text-center text-sm text-gray-400 mt-8 space-y-2">
          <p>© {new Date().getFullYear()} Khushkhabri. All rights reserved.</p>
          <p className="text-gray-500">
            Designed and Developed by{" "}
            <a
              // href="https://www.browndevs.com"
              href="https://brandbabaa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Brand Babaa
            </a>
          </p>
        </div>

      </div>

    </footer>
  )
}