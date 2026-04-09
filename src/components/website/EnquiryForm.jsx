'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function EnquiryForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (data) => {
        setError(null);
        try {
            await axios.post('/api/enquiry', data);
            reset();
            const msg = 'Enquiry Created Successfully. We will get back to you soon.';
            setSuccessMsg(msg);
            setSubmitted(true);
            toast.success('Enquiry Created Successfully.');

            // After 5s, clear message and show form again
            setTimeout(() => {
                setSubmitted(false);
                setSuccessMsg(null);
            }, 5000);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                'Something went wrong';
            setError(message);
            toast.error(message);
            console.error(err);
        }
    };

    // If the form was just submitted successfully, show only the success UI
    if (submitted) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-md text-center">
                <p className="text-green-600 font-semibold mb-2">{successMsg}</p>
                <p className="text-gray-500 text-sm">You can submit another enquiry in a moment.</p>
            </div>
        );
    }

    // Otherwise, show the form
    return (
        <div className="bg-white p-2">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-primary mb-3">
                Want you own App/Website?
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.name
                            ? 'border-red-500 ring-red-200'
                            : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.email
                            ? 'border-red-500 ring-red-200'
                            : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Contact Number */}
                <div>
                    <input
                        type="tel"
                        placeholder="Contact Number"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.contact
                            ? 'border-red-500 ring-red-200'
                            : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('contact', {
                            required: 'Contact number is required',
                            minLength: { value: 10, message: 'Minimum 10 digits required' },
                            maxLength: { value: 15, message: 'Maximum 15 digits allowed' },
                        })}
                    />
                    {errors.contact && (
                        <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
                    )}
                </div>

                {/* Message */}
                <div className="mb-2">
                    <textarea
                        rows={4}
                        placeholder="Write your message"
                        className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${errors.message
                            ? 'border-red-500 ring-red-200'
                            : 'border-gray-300 focus:ring-blue-200'
                            }`}
                        {...register('message', { required: 'Message is required' })}
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                </div>

                {/* Inline Error */}
                {error && <p className="text-red-600 text-sm">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center bg-primary text-white font-semibold py-2 rounded-md hover:bg-[#231d35] transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Sending...
                        </>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
            <Toaster position="top-right" />
        </div>
    );
}
