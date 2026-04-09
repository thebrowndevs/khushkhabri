import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import LoaderButton from '../custom/LoaderButton';

function LogoutDialog({ open, onOpenChange }) {
    const [loading, setLoading] = useState(false)

    function handleSignOut() {
        setLoading(true)
        try {
            signOut({ callbackUrl: '/' })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                        onClick={() => onOpenChange(false)}
                        className="px-6"
                    >
                        Cancel
                    </Button>
                    <LoaderButton
                        type="button"
                        loading={loading}
                        variant="destructive"
                        onClick={handleSignOut}
                        className="px-6"
                    >
                        Sign Out
                    </LoaderButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LogoutDialog