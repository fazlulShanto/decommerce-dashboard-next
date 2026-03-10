"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { OrderData } from "@/models/order.dal";
import { format } from "date-fns";

interface OrderDetailsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  orderData: OrderData | null;
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "confirmed":
    case "completed":
    case "delivered":
      return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
    case "pending":
    case "processing":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200";
    case "cancelled":
    case "failed":
    case "refunded":
      return "bg-red-100 text-red-700 hover:bg-red-100 border-red-200";
    default:
      return "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200";
  }
};

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  setIsOpen,
  orderData,
}) => {
  if (!orderData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className="p-0 sm:max-w-md overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>Order Details</SheetTitle>
          <SheetDescription>
            Read-only information about this order.
          </SheetDescription>
        </SheetHeader>
        
        <div className="px-4 py-6 grid gap-6">
          <div className="grid gap-4">
            
            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Order ID</Label>
              <div className="font-mono text-sm flex items-center justify-between bg-slate-100/50 p-2 rounded">
                <span className="truncate mr-2">{orderData._id}</span>
                <CopyButton text={orderData._id} successMessage="Order ID copied!" />
              </div>
            </div>

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Product details</Label>
              <div className="font-medium text-base">
                {orderData.productName}
              </div>
              <div className="text-sm font-medium mt-1">
                Base Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(orderData.price)}
              </div>
            </div>

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Payment details</Label>
              <div className="text-sm font-medium">
                Amount Paid: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(orderData.paymentAmount)}
              </div>
              {orderData.paymentMethod && (
                <div className="text-sm text-muted-foreground mt-1">
                  Method: {orderData.paymentMethod}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 border-b pb-3">
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Payment Status</Label>
                <div>
                  <Badge className={getStatusBadgeVariant(orderData.paymentStatus)}>
                    {orderData.paymentStatus.charAt(0).toUpperCase() + orderData.paymentStatus.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Delivery Status</Label>
                <div>
                  <Badge className={getStatusBadgeVariant(orderData.deliveryStatus)}>
                    {orderData.deliveryStatus.charAt(0).toUpperCase() + orderData.deliveryStatus.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="grid gap-1 col-span-2 mt-2">
                <Label className="text-muted-foreground text-xs uppercase">Confirmation</Label>
                <div>
                  <Badge className={getStatusBadgeVariant(orderData.confirmationStatus)}>
                    {orderData.confirmationStatus.charAt(0).toUpperCase() + orderData.confirmationStatus.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Delivery Information</Label>
              <div className="text-sm whitespace-pre-wrap">
                {orderData.deliveryInfo || <span className="text-muted-foreground italic">No delivery info provided</span>}
              </div>
            </div>

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Customer (Discord ID)</Label>
              <div className="font-mono text-sm flex items-center justify-between bg-slate-100/50 p-2 rounded">
                <span className="truncate mr-2">{orderData.customerId}</span>
                <CopyButton text={orderData.customerId} successMessage="Customer ID copied!" />
              </div>
            </div>

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Guild ID</Label>
              <div className="font-mono text-sm flex items-center justify-between bg-slate-100/50 p-2 rounded">
                <span className="truncate mr-2">{orderData.guildId}</span>
                <CopyButton text={orderData.guildId} successMessage="Guild ID copied!" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Created</Label>
                <div className="text-sm">
                  {format(new Date(orderData.createdAt || new Date()), "PPp")}
                </div>
              </div>
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Last Updated</Label>
                <div className="text-sm">
                  {format(new Date(orderData.updatedAt || new Date()), "PPp")}
                </div>
              </div>
            </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
