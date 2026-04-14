'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BigNav({ onLoginClick, session, status }) {

    const pathname = usePathname()

    const menu = [
        { label: 'Home', href: '/' },
        { label: 'Templates', href: '/templates' },
        { label: 'Video Invites', href: '/video-invites' },
        { label: 'About Us', href: '/about-us' },
        { label: 'Blogs', href: '/blogs' },
        { label: 'Contact Us', href: '/contact-us' },
    ]

    if (status === 'authenticated') {
        menu.push({ label: 'My Profile', href: '/user' });
    } else {
        menu.push({ label: 'Login', action: onLoginClick });
    }

    return (
        <div className="flex justify-center items-center space-x-10 py-4">

            {menu.map((link, idx) => {

                const isActive =
                    link.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(link.href)

                if (link.action) {
                    return (
                        <button
                            key={idx}
                            onClick={link.action}
                            className={`relative text-sm font-medium group transition text-gray-700 hover:text-black`}
                        >
                            {link.label}
                            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-transparent">
                                <div className="h-full transition-all duration-300 origin-left w-0 group-hover:w-full bg-black" />
                            </div>
                        </button>
                    )
                }

                return (
                    <Link
                        key={idx}
                        href={link.href}
                        className={`relative text-sm font-medium group transition
                            ${isActive ? 'text-black' : 'text-gray-700 hover:text-black'}
                            `}
                    >
                        {link.label}

                        <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-transparent">
                            <div
                                className={`h-full transition-all duration-300 origin-left
                                    ${isActive
                                        ? 'w-full bg-black'
                                        : 'w-0 group-hover:w-full bg-black'
                                    }`}
                            />
                        </div>

                    </Link>
                )
            })}

        </div>
    )
}