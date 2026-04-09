// app/admin/users/components/UserDialog.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import PasswordDialog from "./PasswordDialog";

const permissionSections = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'enquiries', name: 'Enquiries' },
    { id: 'services', name: 'Services' },
    { id: 'blogs', name: 'Blogs' },
    { id: 'categories', name: 'Categories' },
    { id: 'tags', name: 'Tags' },
    { id: 'media', name: 'Media' },
    // { id: 'settings', name: 'Settings' },
    { id: 'users', name: 'Users' },
    { id: 'testimonials', name: 'Testimonials' },
];


const permissionTypes = [
    { id: 'view', label: 'View' },
    { id: 'add', label: 'Add' },
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' }
];

export default function UserDialog({ open, onOpenChange, selectedUser, onCreate, onUpdate, isSubmitting, error, changePassword, canEdit, onlyAdmin }) {
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue, } = useForm();
    const watchRole = watch("role", "user");
    const watchPermissions = watch("permissions", {});

    const [showPassword, setShowPassword] = useState(false);

    const [pwdDialogOpen, setPwdDialogOpen] = useState(false);

    const openPwdDialog = id => {
        setPwdDialogOpen(true);
    };

    useEffect(() => {
        if (open) {
            if (selectedUser) {
                reset({
                    name: selectedUser.name || "",
                    email: selectedUser.email || "",
                    phone: selectedUser.phone || "",
                    password: selectedUser.password || "",
                    role: selectedUser.role || "user",
                    permissions: selectedUser.permissions
                });
            } else {
                reset({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    role: "user",
                    permissions: {}
                });
            }
        }
    }, [open, selectedUser, reset]);

    const handlePermissionChange = (section, type, checked) => {
        const newPermissions = { ...watchPermissions };
        if (!newPermissions[section]) newPermissions[section] = {};
        newPermissions[section][type] = checked;
        setValue("permissions", newPermissions);
    };

    const onSubmit = async (data) => {
        try {
            // const permissions = data.permissions;

            const { password, ...rest } = data;

            const userData = selectedUser
                ? rest
                : { ...rest, password };

            if (selectedUser?._id) {
                await onUpdate({ id: selectedUser._id, data: userData });
            } else {
                await onCreate(userData);
            }
            onOpenChange(false);
        } catch (error) { }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{selectedUser ? "Update User Details" : "Add New User"}</DialogTitle>
                    <DialogDescription>
                        Create or update user and assign roles and permissions.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        {/* Name */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="name" className="text-right mt-2">
                                Name<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="name"
                                    {...register("name", { required: "Name is required" })}
                                    className={clsx({ "border-red-500": errors.name })}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="email" className="text-right mt-2">
                                Email<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: "Invalid email format"
                                        }
                                    })}
                                    className={clsx({ "border-red-500": errors.email })}
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="phone" className="text-right mt-2">
                                Phone Number<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="phone"
                                    {...register("phone", { required: "Phone Number is required" })}
                                    className={clsx({ "border-red-500": errors.name })}
                                    placeholder="8965899658"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Password */}
                        {!selectedUser && watchRole !== 'user' &&
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="password" className="text-right mt-2">
                                    Password<span className="text-red-500"> *</span>
                                </Label>
                                <div className="col-span-3 relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        placeholder="Password"
                                        className={clsx({ "border-red-500": errors.password })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    {errors.password && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        }

                        {/* Role */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="role" className="text-right mt-2">
                                Role<span className="text-red-500"> *</span>
                            </Label>
                            <div className="col-span-3">
                                <select
                                    disabled={true}
                                    id="role"
                                    {...register("role", { required: "Role is required" })}
                                    className={clsx("w-full border px-3 py-2 rounded disabled:text-gray-600 disabled:bg-gray-200", {
                                        "border-red-500": errors.role,
                                    })}
                                >
                                    <option value="user">User</option>
                                    {/* {onlyAdmin &&
                                        <option value="sub-admin">Sub Admin</option>
                                    } */}
                                </select>
                                {errors.role && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.role.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Permissions (only for sub-admin) */}
                        {watchRole === "sub-admin" && (
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right mt-2">Permissions</Label>
                                <div className="col-span-3">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                        {permissionSections.map((section) => (
                                            <div
                                                key={section.id}
                                                className="border rounded-lg p-4 bg-white shadow-sm transition-all hover:shadow-md"
                                            >
                                                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                    <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                                                    {section.name}
                                                </h4>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {permissionTypes.map((type) => {
                                                        // Color mapping for each permission type
                                                        const colorMap = {
                                                            view: {
                                                                bg: 'bg-blue-50',
                                                                border: 'border-blue-200',
                                                                text: 'text-blue-700',
                                                                checkbox: 'data-[state=checked]:bg-blue-600 border-blue-300'
                                                            },
                                                            add: {
                                                                bg: 'bg-green-50',
                                                                border: 'border-green-200',
                                                                text: 'text-green-700',
                                                                checkbox: 'data-[state=checked]:bg-green-600 border-green-300'
                                                            },
                                                            edit: {
                                                                bg: 'bg-yellow-50',
                                                                border: 'border-yellow-200',
                                                                text: 'text-yellow-700',
                                                                checkbox: 'data-[state=checked]:bg-yellow-600 border-yellow-300'
                                                            },
                                                            delete: {
                                                                bg: 'bg-red-50',
                                                                border: 'border-red-200',
                                                                text: 'text-red-700',
                                                                checkbox: 'data-[state=checked]:bg-red-600 border-red-300'
                                                            }
                                                        };

                                                        const colors = colorMap[type.id] || {};
                                                        const isChecked = !!watchPermissions[section.id]?.[type.id];

                                                        return (
                                                            <div
                                                                key={type.id}
                                                                className={clsx(
                                                                    "flex items-center gap-2 p-2 rounded transition-all",
                                                                    isChecked
                                                                        ? `${colors.bg} ${colors.border} border`
                                                                        : "hover:bg-gray-50"
                                                                )}
                                                            >
                                                                <Checkbox
                                                                    id={`${section.id}-${type.id}`}
                                                                    checked={isChecked}
                                                                    onCheckedChange={(checked) =>
                                                                        handlePermissionChange(section.id, type.id, checked)
                                                                    }
                                                                    className={clsx(
                                                                        "h-5 w-5 rounded",
                                                                        colors.checkbox
                                                                    )}
                                                                />
                                                                <Label
                                                                    htmlFor={`${section.id}-${type.id}`}
                                                                    className={clsx(
                                                                        "text-sm cursor-pointer select-none",
                                                                        isChecked ? `${colors.text} font-medium` : "text-gray-600"
                                                                    )}
                                                                >
                                                                    {type.label}
                                                                </Label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {error && <p className="text-red-600 mb-5 text-sm">Error: {error}</p>}

                    <DialogFooter>
                        {onlyAdmin && selectedUser && selectedUser?.role !== 'user' &&
                            <Button variant={"outline"} type="button" disabled={isSubmitting} onClick={() => setPwdDialogOpen(true)}>
                                Update Password
                            </Button>

                        }

                        {selectedUser && onlyAdmin ?
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="animate-spin mr-1" />}
                                Update
                            </Button>
                            : <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="animate-spin mr-1" />}
                                Create
                            </Button>
                        }

                    </DialogFooter>
                </form>

                <PasswordDialog
                    open={pwdDialogOpen}
                    onOpenChange={setPwdDialogOpen}
                    userId={selectedUser?._id}
                    changePassword={changePassword}
                />

            </DialogContent>
        </Dialog>
    );
} 