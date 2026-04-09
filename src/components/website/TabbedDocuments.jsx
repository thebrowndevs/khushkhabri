"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TabbedDocuments = ({ subServices }) => {
    const router = useRouter()
    const tabs = subServices || [];
    const [activeTab, setActiveTab] = useState(0);
    const currentTab = tabs[activeTab] || {};

    // Calculate pricing information
    const actualPrice = currentTab.actualPrice || 0;
    const discountedPrice = currentTab.discountedPrice ?? actualPrice;

    // Determine pricing type
    const isDiscounted = discountedPrice < actualPrice;
    const isFree = discountedPrice === 0 && actualPrice === 0;
    const isRegular = !isFree && !isDiscounted;

    // Calculate discount percentage and savings
    const discountPercentage = isDiscounted
        ? Math.round(100 - (discountedPrice / actualPrice) * 100)
        : 0;
    const savings = actualPrice - discountedPrice;

    function handleClick() {
        router.replace()
    }

    return (
        <div className="w-full bg-gradient-to-br from-white to-[#f0f7ff] rounded-md overflow-hidden border border-[#00336620]">
            <div className="flex flex-col md:flex-row">
                {/* Tabs Column */}
                <div className="bg-[#f5f9ff] w-full md:w-64 border-r border-[#00336610] p-4">
                    <div className="text-[#003366] font-bold text-lg mb-4 pl-2">Services</div>
                    <div className="space-y-2">
                        {tabs.map((tab, index) => {
                            const tabActualPrice = tab.actualPrice || 0;
                            const tabDiscountedPrice = tab.discountedPrice ?? tabActualPrice;
                            const isTabDiscounted = tabDiscountedPrice < tabActualPrice;
                            const isTabFree = tabDiscountedPrice === 0 && tabActualPrice === 0;

                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`
                                        w-full text-left px-4 py-3 rounded-xl transition-all duration-300
                                        flex items-center
                                        ${activeTab === index
                                            ? 'bg-[#003366] text-white shadow-lg transform -translate-x-1'
                                            : 'bg-white text-[#003366] hover:bg-[#e6f0ff] border border-[#00336620]'
                                        }
                                    `}
                                >
                                    <div className={`w-2 h-2 rounded-full mr-3 ${activeTab === index ? 'bg-white' : 'bg-[#003366]'}`}></div>
                                    <span className="flex-1">{tab.name}</span>

                                    {/* Badge for free/discounted services */}
                                    {isTabFree && (
                                        <span className="ml-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
                                            FREE
                                        </span>
                                    )}
                                    {isTabDiscounted && (
                                        <span className="ml-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
                                            {Math.round(100 - (tabDiscountedPrice / tabActualPrice) * 100)}% OFF
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-3 sm:p-6">
                    {/* Banner Section */}
                    {isFree ? (
                        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-100 border border-emerald-200 rounded-lg p-4 flex items-center">
                            <div className="bg-emerald-500 text-white rounded-full p-2 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-emerald-800">Free Service!</h3>
                                <p className="text-emerald-700 text-sm">This service is provided at no cost</p>
                            </div>
                        </div>
                    ) : isDiscounted && (
                        <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 flex items-center">
                            <div className="bg-amber-500 text-amber-900 rounded-full p-2 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 13.047 14.01c-.04.27-.24.49-.5.59l-4.5 1.5a1 1 0 01-1.228-1.228l1.5-4.5c.1-.26.32-.46.59-.5l6.812-1.1L12.033 3.7a1 1 0 011-1.7z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-amber-800">Special Discount!</h3>
                                <p className="text-amber-700 text-sm">
                                    {discountPercentage}% off - Save ₹{savings.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Documents and Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Required Documents</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {currentTab.requiredDocuments?.map((doc, idx) => (
                                    <li key={idx}>{doc.name}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Required Details</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                {currentTab.requiredDetails?.map((det, idx) => (
                                    <li key={idx}>{det.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Pricing and Action */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-wrap items-center justify-between">
                        <div className="mb-3 md:mb-0">
                            <div className="flex items-center">
                                {isDiscounted && (
                                    <span className="text-gray-500 line-through mr-2">
                                        ₹{actualPrice.toLocaleString()}
                                    </span>
                                )}
                                <span className={`text-2xl font-bold ${isDiscounted ? 'text-amber-600' : 'text-[#003366]'}`}>
                                    {isFree ? 'FREE' : `₹${discountedPrice.toLocaleString()}`}
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                                Excluding government charges
                            </p>
                        </div>
                        <Link href={`/getService/${currentTab._id}`}>
                            <button className="bg-[#003366] hover:bg-[#002244] text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                                Get Service
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabbedDocuments;




// const tabs = [
//     {
//         title: "Private Limited Company",
//         documents: [
//             "Certificate of Incorporation",
//             "PAN card of Company",
//             "Articles of Association (AOA)",
//             "Memorandum of Association (MOA)",
//             "Resolution signed by board members",
//         ],
//     },
//     {
//         title: "Limited Liability Partnership (LLP)",
//         documents: [
//             "LLP Agreement",
//             "PAN Card of LLP",
//             "Certificate of Incorporation",
//             "Partners' address and ID proof",
//             "Digital Signature",
//         ],
//     },
//     {
//         title: "Sole Proprietorship",
//         documents: [
//             "PAN Card",
//             "Aadhar Card",
//             "Bank Account Proof",
//             "Utility Bill or Rent Agreement",
//         ],
//     },
//     {
//         title: "One Person Company (OPC)",
//         documents: [
//             "Certificate of Incorporation",
//             "PAN Card of Company",
//             "MOA and AOA",
//             "Nominee's consent form",
//             "Director's ID and address proof",
//             "Digital Signature",
//         ],
//     },
// ];
