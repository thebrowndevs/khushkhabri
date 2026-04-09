"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Eye,
  CheckCircle2,
  XCircle,
  ListChecks,
  Mail,
  Phone,
  User,
  Clock,
  Star,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function EnquiryDetailsDialog({ enquiry }) {
  // Format dates using date-fns
  const createdAt = format(
    new Date(enquiry.createdAt),
    "dd MMM yyyy 'at' h:mm a"
  );
  const updatedAt = format(
    new Date(enquiry.updatedAt),
    "dd MMM yyyy 'at' h:mm a"
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="hover:bg-gray-100">
          <Eye size={18} className="text-gray-600" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:w-5xl p-6 bg-white rounded-xl">
        <DialogHeader className="border-b pb-3 mb-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <ListChecks size={22} className="text-primary" />
              Enquiry Details
            </DialogTitle>
            <div className="flex gap-2">
              <Badge
                variant={
                  enquiry.status === "resolved" ? "success" : "destructive"
                }
                className="flex items-center gap-1 py-1"
              >
                {enquiry.status === "resolved" ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <XCircle size={14} />
                )}
                {enquiry.status.charAt(0).toUpperCase() +
                  enquiry.status.slice(1)}
              </Badge>

              {enquiry.important && (
                <Badge
                  variant="warning"
                  className="flex items-center gap-1 py-1"
                >
                  <Star size={14} className="fill-yellow-400" />
                  Important
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
              Customer Information
            </h3>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <User size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{enquiry.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Mail size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{enquiry.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Phone size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{enquiry.contact}</p>
              </div>
            </div>
          </div>

          {/* Enquiry Metadata */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
              Enquiry Metadata
            </h3>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Clock size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Submitted On</p>
                <p className="font-medium">{createdAt}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Clock size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{updatedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Message Section */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
            Message
          </h3>
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-2 rounded-full mt-1">
              <MessageSquare size={18} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="mt-1 bg-gray-50 p-4 rounded-lg border text-gray-700">
                {enquiry.message}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
