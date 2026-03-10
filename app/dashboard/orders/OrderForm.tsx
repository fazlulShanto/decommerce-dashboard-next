"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { updateOrderAction } from "./order.actions";
import { toast } from "sonner";
import { OrderData } from "@/models/order.dal";

const orderSchema = z.object({
  confirmationStatus: z.enum(["pending", "confirmed", "cancelled"]),
  deliveryStatus: z.enum(["pending", "processing", "delivered", "cancelled"]),
  paymentStatus: z.enum(["pending", "completed", "failed", "refunded"]),
  deliveryInfo: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  orderData: OrderData | null;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  isOpen,
  setIsOpen,
  orderData,
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      confirmationStatus: "pending",
      deliveryStatus: "pending",
      paymentStatus: "pending",
      deliveryInfo: "",
    },
  });

  useEffect(() => {
    if (isOpen && orderData) {
      form.reset({
        confirmationStatus: orderData.confirmationStatus,
        deliveryStatus: orderData.deliveryStatus,
        paymentStatus: orderData.paymentStatus,
        deliveryInfo: orderData.deliveryInfo || "",
      });
    }
  }, [isOpen, orderData, form]);

  const onSubmit = (data: OrderFormValues) => {
    if (!orderData) return;
    
    startTransition(async () => {
      const result = await updateOrderAction(orderData._id, data);
      if (result.success) {
        toast.success("Order updated successfully");
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    });
  };

  if (!orderData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className="p-0 sm:max-w-md overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>Edit Order</SheetTitle>
          <SheetDescription>
            Update statuses and delivery information for this order.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 py-4 grid gap-4">
          

            <div className="grid gap-2">
              <Label>Confirmation Status</Label>
            <Select
              onValueChange={(value) => form.setValue("confirmationStatus", value as any)}
              value={form.watch("confirmationStatus")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.confirmationStatus && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.confirmationStatus.message}
              </span>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label>Payment Status</Label>
            <Select
              onValueChange={(value) => form.setValue("paymentStatus", value as any)}
              value={form.watch("paymentStatus")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.paymentStatus && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.paymentStatus.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Delivery Status</Label>
            <Select
              onValueChange={(value) => form.setValue("deliveryStatus", value as any)}
              value={form.watch("deliveryStatus")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.deliveryStatus && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.deliveryStatus.message}
              </span>
             )}
           </div>

          <div className="grid gap-2">
            <Label htmlFor="deliveryInfo">Delivery Information</Label>
            <Textarea
              id="deliveryInfo"
              placeholder="Tracking numbers, special instructions, etc."
              {...form.register("deliveryInfo")}
            />
            {form.formState.errors.deliveryInfo && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.deliveryInfo.message}
              </span>
            )}
          </div>

          <SheetFooter className="mt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
