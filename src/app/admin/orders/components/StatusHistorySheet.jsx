'use client'

import React from "react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"

export default function StatusHistorySheet({ open, onOpenChange, order }) {
    if (!order?.status) return null

    const reversedStatus = [...order.status].reverse()

    console.log(reversedStatus)

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[500px]">
                <SheetHeader>
                    <SheetTitle>Status History</SheetTitle>
                </SheetHeader>

                <ScrollArea className="h-[80vh] space-y-4 pr-2 px-4">
                    {reversedStatus.map((entry, idx) => (
                        <div key={idx} className="border-b py-4 space-y-1">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="capitalize">
                                    {entry.currentStatus}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-auto">
                                    {entry?.date && format(new Date(entry.date), "dd MMM yyyy, hh:mm a")}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700">{entry.message || "-"}</p>
                        </div>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
