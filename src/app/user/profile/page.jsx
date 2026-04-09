"use client"
import React from 'react'
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FiLogOut, FiUser } from "react-icons/fi";
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout'

export default function ProfilePage() {
    const { data: session } = useSession();

    return (
        <InnerDashboardLayout>
            <div className="w-full mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500">Manage your account information and settings.</p>
                </div>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    <FiLogOut />
                    Sign Out
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white flex items-center justify-center">
                        {session?.user?.image ? (
                            <img
                                src={session?.user?.image || "/avatar.jpg"}
                                alt={session?.user?.name || "Profile"}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <FiUser className="text-5xl text-gray-400" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            {session?.user?.name || 'User'}
                        </h2>
                        <p className="text-xl text-gray-600 mt-1">
                            {session?.user?.email || "No email provided"}
                        </p>
                        <div className="mt-4 flex gap-4">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                Customer Account
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Account Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Display Name</p>
                                    <p className="font-medium">{session?.user?.name || 'Not set'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="font-medium">{session?.user?.email || 'Not set'}</p>
                                </div>
                                {session?.user?.phone && (
                                    <div>
                                        <p className="text-sm text-gray-500">Phone Number</p>
                                        <p className="font-medium">{session?.user?.phone}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Security</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                Your account is secured via {session?.user?.email ? 'Google' : 'Phone'} authentication.
                            </p>
                            {/* <Button variant="outline" disabled>
                                Update Profile Details
                            </Button> */}
                            {/* <p className="text-xs text-gray-400 mt-2 italic">Profile editing is coming soon.</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </InnerDashboardLayout>
    )
}
