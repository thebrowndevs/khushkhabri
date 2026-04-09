import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Enquiry from '@/models/enquiryModel'

export async function GET(req) {
    try {
        await connectDB()

        // Count pending vs resolved
        const [pendingCount, resolvedCount] = await Promise.all([
            Enquiry.countDocuments({ status: 'pending' }),
            Enquiry.countDocuments({ status: 'resolved' }),
        ])

        return NextResponse.json({
            pending: pendingCount,
            resolved: resolvedCount,
        })
    } catch (err) {
        console.error('Enquiries summary error:', err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
