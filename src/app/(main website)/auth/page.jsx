import Image from 'next/image'
import React from 'react'
import { LoginForm } from './login-form'

function page() {
    return (
        <div className="grid min-h-svh md:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <img
                            src={'/logo.png'}
                            alt="logo1"
                            className='h-20 w-auto'
                        />
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div >
            <div className="bg-muted relative hidden md:block">
                <img
                    src="/images/auth-bg.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
            </div>
        </div >
    )
}

export default page