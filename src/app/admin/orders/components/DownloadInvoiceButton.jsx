// app/components/DownloadInvoiceButton.jsx
'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { OrderInvoice } from './OrderInvoice';
import { Button } from '@/components/ui/button';

export default function DownloadInvoiceButton({ order }) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        const blob = await pdf(<OrderInvoice order={order} />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice_${order._id}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        setLoading(false);
    };

    return (
        <Button onClick={handleDownload} disabled={loading}>
            {loading ? 'Preparing PDF...' : 'Download Invoice'}
        </Button>
    );
}
