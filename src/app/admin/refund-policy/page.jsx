"use client";

import React, { useState } from "react";
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import Loader from '@/components/Loader';
import { useRefundPolicy } from '@/hooks/useRefundPolicy';
import NotAuthorizedPage from "@/components/notAuthorized";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Button } from "@/components/ui/button";
import RefundForm from "./components/RefundForm";

export default function RefundPolicyPage() {
    const {
        refundQuery,
        updateRefund,
        createRefund,
        permissions: { canView, canAdd, canEdit }
    } = useRefundPolicy();

    const {
        isPending: updating,
        mutateAsync: updateAsync,
        error: updateError
    } = updateRefund;

    const {
        isPending: creating,
        mutateAsync: createAsync,
        error: createError
    } = createRefund;

    const [isEditing, setIsEditing] = useState(false);

    if (!canView) return <NotAuthorizedPage />;
    if (refundQuery.isLoading) return <Loader />;

    const refund = refundQuery.data?.[0];

    return (
        <InnerDashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <h1 className="text-primary font-bold text-2xl lg:text-4xl">
                        Refund Policy
                    </h1>
                    {refund && canEdit && (
                        <Button onClick={() => setIsEditing(true)}>Edit Refund Policy</Button>
                    )}
                </div>

                {refund ? (
                    <div className="max-w-none p-4 border rounded-lg bg-white">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                            {refund.content}
                        </ReactMarkdown>
                        <div className="mt-6 text-sm text-gray-500">
                            Last updated: {new Date(refund.lastUpdated).toLocaleDateString()}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No Refund Policy found</p>
                        {canAdd && (
                            <Button onClick={() => setIsEditing(true)}>
                                Create Refund Policy
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <RefundForm
                open={isEditing}
                onOpenChange={setIsEditing}
                data={refund}
                onUpdate={updateAsync}
                onCreate={createAsync}
                loading={updating || creating}
                error={updateError || createError}
            />

        </InnerDashboardLayout>
    );
} 