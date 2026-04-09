import React from 'react'

function InnerDashboardLayout({ children }) {
    return (
        <div className='w-full bg-gray-100 min-h-full p-4'>
            {children}
        </div>
    )
}

export default InnerDashboardLayout
