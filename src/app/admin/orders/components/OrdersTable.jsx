'use client'

import React, { useState } from 'react'
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, MoreHorizontal } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import TableSkeleton from '@/components/custom/TableSkeleton'
import { format } from 'date-fns'
import OrderDetailsDialog from './OrdersDialog'
import UpdateStatusDialog from './UpdateStatusDialog'
import StatusHistorySheet from './StatusHistorySheet'
import UpdatePaymentStatus from './UpdatePaymentStatus'
import DownloadInvoiceButton from './DownloadInvoiceButton'

function OrdersTable({
    orders,
    isLoading,
    error,
    page,
    pageCount,
    onPageChange,
    updateOrder
}) {

    const [viewOrderDialog, setViewOrderDialog] = useState(false)
    const [viewingOrder, setViewingOrder] = useState(null)

    const [updateStatusDialog, setUpdateStatusDialog] = useState(false)
    const [updatePaymentStatusDialog, setUpdatePaymentStatusDialog] = useState(false)

    const [statusHistorySheet, setStatusHistorySheet] = useState(false)

    // console.log(orders)

    if (isLoading) {
        return <TableSkeleton
            rows={5}
            columns={10}
            showHeader={true}
            showPagination={true}
        />
    }

    if (error) return <p className='text-red-600'>Error: {error}</p>

    return (
        <section className="space-y-4">
            {/* Table */}
            <div className="overflow-hidden rounded-md border border-gray-200 shadow-md">
                <Table className={'bg-white'}>
                    <TableHeader className={'bg-gray-100'}>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Order Id</TableHead>
                            <TableHead>User</TableHead>
                            {/* <TableHead>Phone</TableHead> */}
                            <TableHead>Theme</TableHead>
                            <TableHead>Amount</TableHead>
                            {/* <TableHead>Status</TableHead> */}
                            <TableHead>Created At</TableHead>
                            <TableHead className='text-center'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order, idx) => {
                            return (
                                <TableRow key={order._id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{order?.orderId || '-'}</TableCell>
                                    <TableCell>
                                <div className='flex gap-2 items-center justify-start'>
                                    {order?.user?.image && <img src={order.user.image} alt={order.user.name} className='w-8 h-8 rounded-full object-cover' />}
                                    <div>
                                        <div className='text-sm'>{order?.user?.name || '-'}</div>
                                    <span className='text-xs text-muted-foreground'>{order?.user?.email || '-'}</span>
                                    </div>
                                </div>

                                    </TableCell>
                                    {/* <TableCell>{order?.user?.phone || '-'}</TableCell> */}
<TableCell className={'capitalize'}>{order?.themeName || '-'}</TableCell>

                                    <TableCell>₹{order?.totalAmount ? order.totalAmount.toLocaleString() : '-'}</TableCell>
                                    {/* <TableCell>
                                        <Badge variant="secondary" className='capitalize'>{order?.status || "-"}</Badge>
                                    </TableCell> */}
                                    {/* <TableCell>
                                        <Badge className='capitalize'>{order.type}</Badge>
                                    </TableCell> */}
                                    <TableCell>
                                        <div>
                                            <div>{format(new Date(order.createdAt), 'dd MMM yyyy')}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {format(new Date(order.createdAt), 'hh:mm a')}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='text-center'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setViewingOrder(order);
                                                        setTimeout(() => setViewOrderDialog(true), 100);
                                                    }}
                                                > View</DropdownMenuItem>
                                                {/* <DropdownMenuItem
                                                    onClick={() => {
                                                        setViewingOrder(order);
                                                        setTimeout(() => setUpdateStatusDialog(true), 100);
                                                    }}
                                                >Update Status</DropdownMenuItem> */}
                                                {/* payment status update */}
                                                {/* {order.paymentStatus !== 'paid' &&
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setViewingOrder(order);
                                                            setTimeout(() => setUpdatePaymentStatusDialog(true), 100);
                                                        }}
                                                    >Update Payment Status</DropdownMenuItem>
                                                } */}
                                                {/* <DropdownMenuItem
                                                    onClick={() => {
                                                        setViewingOrder(order)
                                                        setTimeout(() => setStatusHistorySheet(true), 100)
                                                    }}
                                                >
                                                    View Status History</DropdownMenuItem>
                                                {order.status[order.status.length - 1].currentStatus === "Delivered" && order.paymentStatus === 'paid' &&
                                                    <DropdownMenuItem>
                                                        <DownloadInvoiceButton order={order} />
                                                    </DropdownMenuItem>
                                                } */}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm text-muted-foreground">
                    Page {page} of {pageCount}
                </p>
                <div className="space-x-2">
                    <Button
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        size="sm"
                        disabled={page >= pageCount}
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            <OrderDetailsDialog
                open={viewOrderDialog}
                onOpenChange={setViewOrderDialog}
                order={viewingOrder}
            />

            <UpdateStatusDialog
                open={updateStatusDialog}
                onOpenChange={setUpdateStatusDialog}
                order={viewingOrder}
                updateOrder={updateOrder}
            />

            <UpdatePaymentStatus
                open={updatePaymentStatusDialog}
                onOpenChange={setUpdatePaymentStatusDialog}
                order={viewingOrder}
            />

            <StatusHistorySheet
                open={statusHistorySheet}
                onOpenChange={setStatusHistorySheet}
                order={viewingOrder}
            />

        </section>
    )
}

export default OrdersTable
