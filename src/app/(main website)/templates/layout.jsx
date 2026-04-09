// app/(main website)/templates/layout.jsx

import React from 'react'

export const metadata = {
    title: "Digital Invitation Templates | Wedding, Engagement & Event Invites - Khushkhabri",
    description:
        "Explore beautiful digital invitation templates for weddings, engagements, birthdays, and all special occasions. Create stunning e-invites with Khushkhabri.",
    keywords: [
        "Khushkhabri Templates",
        "Digital Invitation Templates",
        "Wedding Invitation Templates",
        "Engagement Invitation Templates",
        "Birthday Invitation Templates",
        "E-Invite Templates",
        "Online Wedding Cards",
        "Event Invitation Templates",
        "Custom Invitation Designs"
    ],
    alternates: {
        canonical: "https://khushkhabri.in/templates",
    },
    openGraph: {
        title: "Digital Invitation Templates - Khushkhabri",
        description:
            "Discover beautiful and customizable digital invitation templates for all your special moments.",
        url: "https://khushkhabri.in/templates",
        type: "website",
    },
    twitter: {
        title: "Digital Invitation Templates - Khushkhabri",
        description:
            "Create stunning e-invites for weddings, engagements, and events with our beautiful templates.",
    },
};

function layout({ children }) {
    return (
        <>
            {children}
        </>
    )
}

export default layout