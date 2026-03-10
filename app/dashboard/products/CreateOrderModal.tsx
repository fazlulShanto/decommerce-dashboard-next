"use client";

import { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createOrderAction } from "../orders/order.actions";
import { Product } from "./product-columns";

const createOrderSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  paymentAmount: z.coerce.number().positive("Payment amount must be positive"),
});

type CreateOrderFormValues = z.infer<typeof createOrderSchema>;

interface CreateOrderModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  productData: Product | null;
}

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  isOpen,
  setIsOpen,
  productData,
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateOrderFormValues>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerId: "",
      paymentAmount: 0,
    },
  });

  // Keep paymentAmount synced with product price when it changes or modal opens
  useEffect(() => {
    if (isOpen && productData) {
      form.reset({
        customerId: "",
        paymentAmount: productData.price,
      });
    }
  }, [isOpen, productData, form]);

  const onSubmit = (data: CreateOrderFormValues) => {
    if (!productData) return;

    startTransition(async () => {
      // Assemble full payload for the action
      const payload = {
        productName: productData.name,
        price: productData.price,
        customerId: data.customerId,
        paymentAmount: data.paymentAmount,
      };

      const result = await createOrderAction(payload, productData.guildId);
      
      if (result.success) {
        toast.success("Order created successfully");
        setIsOpen(false);
        form.reset();
      } else {
        toast.error(result.error || "Failed to create order");
      }
    });
  };

  if (!productData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className="p-0 sm:max-w-md overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>Create Order</SheetTitle>
          <SheetDescription>
            Creating a new order for product: <strong>{productData.name}</strong>
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 py-4 grid gap-4">
          
          <div className="grid gap-2">
            <Label>Product Price (Default)</Label>
            <div className="p-2 bg-slate-100 rounded text-sm text-slate-800 font-medium">
              ${productData.price.toFixed(2)}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="paymentAmount">Actual Payment Amount *</Label>
            <Input id="paymentAmount" type="number" step="0.01" {...form.register("paymentAmount")} />
            {form.formState.errors.paymentAmount && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.paymentAmount.message}
              </span>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="customerId">Customer ID *</Label>
            <Input id="customerId" {...form.register("customerId")} />
            <p className="text-xs text-muted-foreground">Enter the Discord User ID of the customer.</p>
            {form.formState.errors.customerId && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.customerId.message}
              </span>
            )}
          </div>

          <SheetFooter className="mt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Order"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
