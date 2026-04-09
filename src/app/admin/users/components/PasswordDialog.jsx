import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

export default function PasswordDialog({ open, onOpenChange, userId, changePassword }) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({
        defaultValues: { newPassword: '', confirmNewPassword: '' }
    });

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const newPassword = watch('newPassword', '');

    const onSubmit = async data => {
        try {
            await changePassword.mutateAsync({ id: userId, ...data });
            onOpenChange(false);
            reset();
        } catch (error) {
            // Handle error if needed
        }
    };

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (!open) reset();
            onOpenChange(open);
        }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Lock className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                    <DialogTitle className="text-center">Change Password</DialogTitle>
                    <DialogDescription className="text-center">
                        Enter and confirm your new password
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                    {/* New Password */}
                    <div>
                        <Label htmlFor="newPassword" className="mb-2 block">New Password</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                {...register('newPassword', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                })}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
                        )}
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <Label htmlFor="confirmNewPassword" className="mb-2 block">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmNewPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                {...register('confirmNewPassword', {
                                    required: 'Please confirm your password',
                                    validate: val => val === newPassword || 'Passwords do not match'
                                })}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirmNewPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmNewPassword.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                onOpenChange(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="min-w-[120px]"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </div>
                            ) : "Update Password"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}