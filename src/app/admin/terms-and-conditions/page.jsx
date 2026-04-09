"use client";

import React, { useState } from "react";
import InnerDashboardLayout from '@/components/dashboard/InnerDashboardLayout';
import Loader from '@/components/Loader';
import { useTermsConditions } from '@/hooks/useTermsConditions';
import NotAuthorizedPage from "@/components/notAuthorized";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Button } from "@/components/ui/button";
import TermsForm from "./components/TermsForm";

export default function TermsConditionsPage() {
    const {
        termsQuery,
        updateTerms,
        createTerms,
        permissions: { canView, canAdd, canEdit }
    } = useTermsConditions();

    const {
        isPending: updating,
        mutateAsync: updateAsync,
        error: updateError
    } = updateTerms;

    const {
        isPending: creating,
        mutateAsync: createAsync,
        error: createError
    } = createTerms;

    const [isEditing, setIsEditing] = useState(false);

    if (!canView) return <NotAuthorizedPage />;
    if (termsQuery.isLoading) return <Loader />;

    const terms = termsQuery.data?.[0];

    return (
        <InnerDashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <h1 className="text-primary font-bold text-2xl lg:text-4xl">
                        Terms & Conditions
                    </h1>
                    {/* Show Edit button only if terms exist and user can edit */}
                    {terms && canEdit && (
                        <Button onClick={() => setIsEditing(true)}>Edit Terms</Button>
                    )}
                </div>

                {/* Show existing terms */}
                {terms ? (
                    <div className="max-w-none p-4 border rounded-lg bg-white">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                            {terms.content}
                        </ReactMarkdown>
                        <div className="mt-6 text-sm text-gray-500">
                            Last updated: {new Date(terms.lastUpdated).toLocaleDateString()}
                        </div>
                    </div>
                ) : (
                    // No terms available
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No Terms & Conditions found</p>
                        {canAdd && (
                            <Button onClick={() => setIsEditing(true)}>
                                Create Terms & Conditions
                            </Button>
                        )}
                    </div>
                )}
            </div>

            {/* Edit Form */}
            <TermsForm
                open={isEditing}
                onOpenChange={setIsEditing}
                data={terms}
                onUpdate={updateAsync}
                onCreate={createAsync}
                loading={updating || creating}
                error={updateError || createError}
            />

        </InnerDashboardLayout>
    );
}
