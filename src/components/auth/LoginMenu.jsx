"use client"
// components/auth/LoginMenu.jsx
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, User, FileText, LogOut, LayoutDashboard } from 'lucide-react';
import AuthDialog from './LoginDialog';
import { FaRegCircleUser } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";

export default function LoginMenu() {
    const { data: session } = useSession();
    // console.log(session)
    const router = useRouter();
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    if (!session || !session.user) {
        return (
            <>
                <Button
                    onClick={() => setIsLoginDialogOpen(true)}
                    className=""
                >
                    Login
                </Button>
                <AuthDialog
                    open={isLoginDialogOpen}
                    onOpenChange={setIsLoginDialogOpen}
                />
            </>
        );
    }

    const { role, phone } = session.user;
    const displayName = phone;

    const getRoleColor = () => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'sub-admin': return 'bg-purple-100 text-purple-800';
            default: return 'bg-green-100 text-green-800';
        }
    };

    const getInitials = () => {
        return phone.slice(-2);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 group">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-green-500 to-green-600 p-0.5 rounded-full group-hover:from-green-600 group-hover:to-green-700 transition-all">
                                <div className="w-10 h-10 bg-white border-2 border-white rounded-full flex items-center justify-center text-gray-600 text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1">
                                <Badge className={`${getRoleColor()} px-2 py-0.5 text-xs font-medium rounded-full`}>
                                    {role}
                                </Badge>
                            </div>
                        </div>
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-72 p-0 border-0 shadow-xl rounded-xl overflow-hidden"
                >
                    {/* User profile card */}
                    <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-green-500 to-green-600 p-0.5 rounded-full group-hover:from-green-600 group-hover:to-green-700 transition-all">
                                <div className="w-10 h-10 bg-white border-2 border-white rounded-full flex items-center justify-center text-gray-600 text-base">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{displayName}</h3>
                                <div className={`inline-block ${getRoleColor()} px-2 py-0.5 rounded-full text-xs mt-1 capitalize`}>
                                    {role} account
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-2">
                        {role === 'user' && (
                            <>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-50 cursor-pointer"
                                    onClick={() => router.push('/user')}
                                >
                                    <User className="w-4 h-4 text-blue-600" />
                                    <span>My Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-50 cursor-pointer"
                                    onClick={() => router.push('/user')}
                                >
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <span>Orders History</span>
                                </DropdownMenuItem>
                            </>
                        )}

                        {(role === 'admin' || role === 'sub-admin') && (
                            <DropdownMenuItem
                                className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-50 cursor-pointer"
                                onClick={() => router.push('/admin')}
                            >
                                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                                <span>Admin Dashboard</span>
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator className="my-1" />

                        <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 p-3 rounded-md hover:bg-red-50 cursor-pointer"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <LogOut className="w-4 h-4 text-red-600" />
                                    <span className="text-red-600">Sign Out</span>
                                </DropdownMenuItem>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-md rounded-xl">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <LogOut className="w-5 h-5 text-red-500" />
                                        Confirm Sign Out
                                    </DialogTitle>
                                    <DialogDescription className="pt-2">
                                        Are you sure you want to sign out of your account?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start pt-4">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setIsLogoutDialogOpen(false)}
                                        className="px-6"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="px-6"
                                    >
                                        Sign Out
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}