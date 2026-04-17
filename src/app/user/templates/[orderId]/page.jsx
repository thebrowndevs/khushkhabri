import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/orderModel";
import Invitation from "@/models/invitationModel";
import { THEMES, getThemeByThemeName } from '@/lib/constants/themes';
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import Image from 'next/image';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Hash, ShieldCheck, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import InviteForm from '../../components/InviteForm';
import InvitationList from '../../components/InvitationList';
import CustomizationForm from '../../components/CustomizationForm';
import SatsangInviteForm from '../../components/SatsangInviteForm';

export default async function TemplatePage({ params, searchParams }) {
    const { orderId } = await params;
    const { inviteId } = await searchParams;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return (
            <InnerDashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center p-8 bg-red-50 border border-red-100 rounded-3xl max-w-md">
                        <p className="text-red-600 font-semibold text-lg">Unauthorized access. Please login.</p>
                        <Link href="/" className="mt-4 inline-block text-red-500 hover:underline">Go back home</Link>
                    </div>
                </div>
            </InnerDashboardLayout>
        );
    }

    await connectDB();
    const orderDoc = await Order.findById(orderId).lean();
    if (!orderDoc) return null; // handled below

    const allInvitesRaw = await Invitation.find({ order: orderId }).sort({ createdAt: -1 }).lean();

    // Ensure plain objects for serialization
    const order = JSON.parse(JSON.stringify(orderDoc));
    const allInvites = JSON.parse(JSON.stringify(allInvitesRaw));
    const existingInvite = inviteId ? allInvites.find(i => i._id.toString() === inviteId) : allInvites[0];

    // Authorization check
    if (!order || order.user.toString() !== session.user.id || order.status !== 'paid') {
        return (
            <InnerDashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center p-8 bg-amber-50 border border-amber-100 rounded-3xl max-w-md">
                        <ShieldCheck className="mx-auto text-amber-500 mb-4" size={48} />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid or unauthorized access</h2>
                        <p className="text-gray-600 mb-6">You don't have permission to access this template or the order is not completed.</p>
                        <Link href="/user/templates" className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                            Back to My Templates
                        </Link>
                    </div>
                </div>
            </InnerDashboardLayout>
        );
    }

    const themeInfo = getThemeByThemeName(order.themeName) || {
        title: order.themeName,
        image: "/templates/sikh/preview.png",
        category: "Template",
        description: "Your personalized invitation theme."
    };

    const isSatsang = themeInfo.category === "Guruji Satsang" || order.themeName === "guruji1";
    const isEditing = !!inviteId && !!existingInvite;

    return (
        <InnerDashboardLayout>
            <div className="max-w-4xl mx-auto space-y-3 pb-2">
                {/* Navigation Header */}
                <div className="flex items-center justify-between mt-3">
                    <Link href="/user/templates" className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Templates</span>
                    </Link>
                </div>

                {/* Main Header Card */}
                <div className="bg-white rounded-sm md:rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                    {/* MOBILE LAYOUT */}
                    <div className="sm:hidden flex items-center justify-between p-3 gap-3">
                        <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                            {/* Tiny Thumbnail */}
                            <div className="w-10 h-14 relative bg-gray-50 border border-gray-100 rounded-sm overflow-hidden shrink-0">
                                <Image src={themeInfo.image} alt={themeInfo.title} fill className="object-cover" />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col min-w-0 justify-center">
                                <h1 className="text-[13px] font-bold text-gray-900 truncate mb-0.5">{themeInfo.title}</h1>
                                <div className="text-[9px] text-gray-500 font-mono truncate mb-1">
                                    <span>#{order.orderId.slice(-6)}</span> <span className="mx-1 text-gray-300">•</span> <span>{format(new Date(order.createdAt), 'MMM d, yy')}</span>
                                </div>
                                <span className="w-max bg-gray-50 border border-gray-100 px-1 py-[2px] rounded text-[8px] font-bold text-[#8b2c3c] uppercase tracking-wider">
                                    {themeInfo.category.split(' ')[0]}
                                </span>
                            </div>
                        </div>

                        {/* Button */}
                        <a
                            href={themeInfo.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 px-3 py-1.5 bg-white text-[#8b2c3c] border border-[#8b2c3c] rounded-sm font-bold text-[10px] hover:bg-[#8b2c3c] hover:text-white transition-all shadow-sm"
                        >
                            Preview
                        </a>
                    </div>

                    {/* DESKTOP LAYOUT */}
                    <div className="hidden sm:flex items-center justify-between p-4 gap-6">
                        <div className="flex items-center gap-5 min-w-0 overflow-hidden">
                            {/* Small Thumbnail instead of Huge Image */}
                            <div className="w-16 h-20 relative bg-gray-50 border border-gray-100 rounded-sm overflow-hidden shrink-0 shadow-sm">
                                <Image src={themeInfo.image} alt={themeInfo.title} fill className="object-cover" />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col min-w-0 justify-center">
                                <div className="flex items-center gap-3 mb-1.5">
                                    <h1 className="text-lg font-bold text-gray-900 truncate">{themeInfo.title}</h1>
                                    <span className="bg-gray-50 border border-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-[#8b2c3c] uppercase tracking-wider">
                                        {themeInfo.category}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                                    <div className="flex items-center gap-1.5 font-mono">
                                        <Hash size={12} className="text-gray-400" />
                                        #{order.orderId}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={12} className="text-gray-400" />
                                        {format(new Date(order.createdAt), 'MMMM d, yyyy')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <a
                            href={themeInfo.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 px-5 py-2.5 bg-white text-[#8b2c3c] border-2 border-[#8b2c3c] rounded-lg font-bold text-sm hover:bg-[#8b2c3c] hover:text-white transition-all shadow-sm flex items-center justify-center whitespace-nowrap"
                        >
                            View Live Demo
                        </a>
                    </div>
                </div>

                {/* Dynamic Content Section */}
                {isSatsang ? (
                    <SatsangInviteForm order={order} existingInvite={existingInvite} />
                ) : isEditing ? (
                    <div className="space-y-2">
                        <div className="pt-2 pb-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Edit Custom Invitation</h3>
                                <p className="text-sm text-gray-500">Focus mode: update event details and side selection.</p>
                            </div>
                        </div>
                        <CustomizationForm invitation={existingInvite} orderId={order._id} />
                    </div>
                ) : (
                    <>
                        <InviteForm order={order} />

                        <div className="space-y-4 md:space-y-6 mt-1 md:mt-1">
                            <InvitationList
                                invitations={allInvites}
                                orderId={order._id}
                                isDisabled={!order.mainDetails}
                            />
                        </div>
                    </>
                )}

                {/* Status Indicator */}
                <div className="flex items-center justify-center gap-2 text-[12px] font-bold text-green-600 bg-green-50 w-max mx-auto px-4 rounded-full border border-green-100 uppercase tracking-widest">
                    <ShieldCheck size={14} />
                    Verified Paid Template
                </div>
            </div>
        </InnerDashboardLayout>
    );
}