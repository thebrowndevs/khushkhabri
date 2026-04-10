import React, { useState } from 'react';
import { FaPaperPlane, FaUser, FaPhone, FaEnvelope, FaComment } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Message sent successfully! We will contact you soon.');
                setFormData({ name: '', phone: '', email: '', message: '' });
            } else {
                const errorData = await response.json();
                // Ensure error is a string to avoid React render error
                const errorMessage = typeof errorData.error === 'string' 
                    ? errorData.error 
                    : (errorData.error?.message || 'Failed to send message. Please try again.');
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative p-6 sm:p-8 rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 right-10 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-white rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 bg-white rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-1/2 left-1/4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-20"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${6 + Math.random() * 4}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            <div className="relative z-10">
                <div className="text-center mb-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Send Us a Message</h3>
                    <div className="w-12 sm:w-16 h-1 bg-blue-300 mx-auto rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            icon={<FaUser />}
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            icon={<FaPhone />}
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <InputField
                        icon={<FaEnvelope />}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <TextareaField
                        icon={<FaComment />}
                        name="message"
                        placeholder="Share your idea in brief"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 sm:py-4 rounded-md font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center text-sm sm:text-base md:text-lg ${isSubmitting
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600'
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                <FaPaperPlane className="mr-2" />
                                Send Message
                            </>
                        )}
                    </button>
                </form>
            </div>

            <Toaster position="top-right" toastOptions={{
                duration: 4000,
                style: { background: '#363636', color: '#fff' },
                success: { duration: 3000, iconTheme: { primary: '#10B981', secondary: '#fff' } },
            }} />

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(5deg); }
                }
            `}</style>
        </div>
    );
};

const InputField = ({ icon, ...props }) => (
    <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-blue-300 group-focus-within:text-blue-400">{icon}</span>
        </div>
        <input
            {...props}
            className="w-full py-3 sm:py-4 pl-10 pr-4 bg-white/90 backdrop-blur-sm rounded-md border-2 border-transparent focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-gray-800 placeholder-gray-500 text-sm sm:text-base transition-all duration-300"
        />
    </div>
);

const TextareaField = ({ icon, ...props }) => (
    <div className="relative group">
        <div className="absolute top-4 left-3">
            <span className="text-blue-300 group-focus-within:text-blue-400">{icon}</span>
        </div>
        <textarea
            {...props}
            rows={4}
            className="w-full py-3 sm:py-4 pl-10 pr-4 bg-white/90 backdrop-blur-sm rounded-md border-2 border-transparent focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-gray-800 placeholder-gray-500 text-sm sm:text-base transition-all duration-300 resize-none"
        />
    </div>
);

export default ContactForm;
