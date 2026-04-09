'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiLayout, FiUser, FiLogOut } from 'react-icons/fi'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import BigNav from './BigNav'
import AuthDialog from '@/components/auth/LoginDialog'

export default function NavBar() {

    const [mobileOpen, setMobileOpen] = useState(false)
    const [authOpen, setAuthOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const pathname = usePathname()
    const { data: session, status } = useSession()

    const items = [
        { label: 'Home', href: '/' },
        { label: 'Templates', href: '/templates' },
        { label: 'About Us', href: '/about-us' },
        { label: 'Blogs', href: '/blogs' },
        { label: 'Contact Us', href: '/contact-us' },
    ]

    // Only add My Profile if authenticated
    if (status === 'authenticated') {
        // items.push({ label: 'My Profile', href: '/cs' });
    } else {
        items.push({ label: 'Login', action: () => setAuthOpen(true) });
    }

    return (
        <>
            <nav className="w-full bg-white">

                {/* Logo Row */}
                <div className="flex justify-center items-center py-1 relative border-b border-gray-100 md:border-none">

                    {/* mobile button */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="md:hidden absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiMenu size={24} />
                    </button>

                    <Link href="/" className="transition-transform hover:scale-[1.02]">
                        <img
                            src="/logo.png"
                            alt="Khushkhabri"
                            className="h-19 w-auto"
                        />
                    </Link>

                    {/* User Avatar */}
                    <div className="absolute right-4 flex items-center sm:hidden">
                        <button
                            onClick={() => {
                                if (status === 'authenticated') {
                                    setProfileOpen(true);
                                } else {
                                    setAuthOpen(true);
                                }
                            }}
                            className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-all shadow-md group"
                        >
                            <img
                                src={session?.user?.image || "/avatar.jpg"}
                                alt="User Avatar"
                                className="object-cover transition-transform group-hover:scale-110"
                            />
                        </button>
                    </div>

                </div>

                {/* Menu Row */}
                <div className="relative hidden md:block">

                    {/* Top Border */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                    <div className="max-w-7xl mx-auto">
                        <BigNav onLoginClick={() => setAuthOpen(true)} session={session} status={status} />
                    </div>

                    {/* Bottom Border */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                </div>

            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden"
                        />

                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 bottom-0 w-full z-[101] bg-white shadow-2xl p-0 flex flex-col md:hidden"
                        >
                            {/* Mobile Logo & Close */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <Link href="/" onClick={() => setMobileOpen(false)}>
                                    <img
                                        src="/logo.png"
                                        alt="Khushkhabri"
                                        className="h-10 w-auto"
                                    />
                                </Link>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col p-6 gap-2">
                                {items.map(item => {
                                    const isActive =
                                        item.href === '/'
                                            ? pathname === '/'
                                            : pathname.startsWith(item.href)

                                    if (item.action) {
                                        return (
                                            <button
                                                key={item.label}
                                                onClick={() => {
                                                    setMobileOpen(false);
                                                    item.action();
                                                }}
                                                className="text-lg font-medium text-gray-700 text-left p-3 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                                            >
                                                {item.label}
                                            </button>
                                        )
                                    }

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`text-lg font-medium p-3 rounded-xl transition-all ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </div>

                            {/* Mobile Bottom Section */}
                            <div className="mt-auto p-6 border-t border-gray-100 bg-gray-50/50">
                                {status === 'authenticated' ? (
                                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/10">
                                            <img
                                                src={session?.user?.image || "/avatar.jpg"}
                                                alt="Profile"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-900 truncate">
                                                {session.user.name || 'User'}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {session.user.email || session.user.phone}
                                            </p>
                                        </div>
                                        <Link
                                            href="/user"
                                            onClick={() => setMobileOpen(false)}
                                            className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                        >
                                            <FiLayout size={20} />
                                        </Link>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setMobileOpen(false);
                                            setAuthOpen(true);
                                        }}
                                        className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
                                    >
                                        Login to Account
                                        <FiUser size={20} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Profile Detail Dialog */}
            <AnimatePresence>
                {profileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setProfileOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-3xl shadow-2xl z-[201] overflow-hidden"
                        >
                            <div className="relative p-8">
                                <button
                                    onClick={() => setProfileOpen(false)}
                                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <FiX size={20} />
                                </button>

                                <div className="flex flex-col items-center text-center">
                                    <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mb-4">
                                        <img
                                            src={session?.user?.image || "/avatar.jpg"}
                                            alt="User"
                                            className="object-cover"
                                        />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                        {session?.user?.name || 'Welcome Back!'}
                                    </h2>
                                    <p className="text-gray-500 mb-6">
                                        {session?.user?.email || session?.user?.phone}
                                    </p>

                                    <div className="w-full space-y-3">
                                        <Link
                                            href="/user"
                                            onClick={() => setProfileOpen(false)}
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                                        >
                                            <FiLayout size={20} />
                                            Go to Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut();
                                                setProfileOpen(false);
                                            }}
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-700 font-semibold rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all border border-gray-100"
                                        >
                                            <FiLogOut size={20} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
        </>
    )
}