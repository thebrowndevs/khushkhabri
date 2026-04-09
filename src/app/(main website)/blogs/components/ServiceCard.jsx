import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-xl overflow-hidden p-2 max-w-2xl mx-auto">
            <div className="w-auto aspect-square relative h-24">
                <Image
                    src={service.imageURL}
                    alt={service.name}
                    fill
                    className="object-cover rounded-lg" />
            </div>

            <Link href={`/services/${service.slug}`}>
                <div className="sm:ml-2 mt-4 sm:mt-0 flex-1">

                    <h3 className="text-lg sm:text-lg font-bold text-gray-900">{service.name}</h3>
                    <p className="text-gray-600 mt-1 text-xs sm:text-xs">{service.shortDescription}</p>

                </div>
            </Link>
        </div >
    );
};

export default ServiceCard;
