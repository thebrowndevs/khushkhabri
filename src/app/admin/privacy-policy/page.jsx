"use client";

import React, { useState } from "react";
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import Loader from '@/components/Loader';
import { usePrivacyPolicy } from '@/hooks/usePrivacyPolicy';
import NotAuthorizedPage from "@/components/notAuthorized";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Button } from "@/components/ui/button";
import PrivacyForm from "./components/PrivacyForm";

export default function PrivacyPolicyPage() {
    const {
        policyQuery,
        updatePolicy,
        createPolicy,
        permissions: { canView, canAdd, canEdit }
    } = usePrivacyPolicy();

    const {
        isPending: updating,
        mutateAsync: updateAsync,
        error: updateError
    } = updatePolicy;

    const {
        isPending: creating,
        mutateAsync: createAsync,
        error: createError
    } = createPolicy;

    const [isEditing, setIsEditing] = useState(false)

    if (!canView) return <NotAuthorizedPage />;
    if (policyQuery.isLoading) return <Loader />;

    const policy = policyQuery.data?.[0];

    return (
        <InnerDashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <h1 className="text-primary font-bold text-2xl lg:text-4xl">
                        Privacy Policy
                    </h1>
                    {policy && canEdit && (
                        <Button onClick={() => setIsEditing(true)}>Edit Policy</Button>
                    )}
                </div>

                {policy ? (
                    <div className="max-w-none p-4 border rounded-lg bg-white">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{policy.content}</ReactMarkdown>
                        <div className="mt-6 text-sm text-gray-500">
                            Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No privacy policy found</p>
                        {canAdd && (
                            <Button onClick={() => setIsEditing(true)}>
                                Create Privacy Policy
                            </Button>
                        )}
                    </div>
                )}
            </div>
            <PrivacyForm
                open={isEditing}
                onOpenChange={setIsEditing}
                data={policy}
                onUpdate={updateAsync}
                onCreate={createAsync}
                loading={updating}
                error={updateError}
            />
        </InnerDashboardLayout>
    );
}