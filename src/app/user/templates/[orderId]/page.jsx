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

    return (
        <InnerDashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6 pb-20">
                {/* Navigation Header */}
                <div className="flex items-center justify-between mt-3">
                    <Link href="/user/templates" className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Templates</span>
                    </Link>
                </div>

                {/* Main Header Card */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Theme Preview Image */}
                        <div className="w-full md:w-1/3 aspect-[3/4] relative bg-gray-50 border-r border-gray-100">
                            <Image
                                src={themeInfo.image}
                                alt={themeInfo.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#8b2c3c] shadow-sm uppercase tracking-wider">
                                    {themeInfo.category}
                                </span>
                            </div>
                        </div>

                        {/* Order & Theme Info */}
                        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                                    {themeInfo.title}
                                </h1>
                                <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                                    {themeInfo.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 mb-8">
                                <div className="space-y-1">
                                    <p className="text-[12px] uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
                                        <Hash size={12} /> Order ID
                                    </p>
                                    <p className="font-mono text-gray-700 font-medium">#{order.orderId}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[12px] uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
                                        <Calendar size={12} /> Purchase Date
                                    </p>
                                    <p className="text-gray-700 font-medium">{format(new Date(order.createdAt), 'MMMM d, yyyy')}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href={themeInfo.demoUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-white text-[#8b2c3c] border-2 border-[#8b2c3c] rounded-2xl font-bold hover:bg-[#8b2c3c] hover:text-white transition-all flex items-center justify-center grow"
                                >
                                    View Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                {isSatsang ? (
                    <SatsangInviteForm order={order} existingInvite={existingInvite} />
                ) : (
                    <>
                        <InviteForm order={order} />

                        {/* Customizations Section */}
                        {order.mainDetails && (
                            <div className="space-y-12 pt-10 border-t border-gray-100">
                                <InvitationList invitations={allInvites} />
                                
                                {allInvites.length === 0 && (
                                    <div className="bg-gray-50 border-2 border-dashed border-gray-100 rounded-[40px] p-12 text-center">
                                        <p className="text-gray-400 font-medium">No Invitations yet. Click "Create Invitation" above to start.</p>
                                    </div>
                                )}

                                {inviteId && existingInvite && (
                                    <div className="pt-10 border-t border-gray-100">
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Edit Invitation</h3>
                                            <p className="text-gray-500">Update event details and side selection for this invitation.</p>
                                        </div>
                                        <CustomizationForm invitation={existingInvite} orderId={order._id} />
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Status Indicator */}
                <div className="flex items-center justify-center gap-2 text-[12px] font-bold text-green-600 bg-green-50 w-max mx-auto px-4 py-1.5 rounded-full border border-green-100 uppercase tracking-widest">
                    <ShieldCheck size={14} />
                    Verified Paid Template
                </div>
            </div>
        </InnerDashboardLayout>
    );
}