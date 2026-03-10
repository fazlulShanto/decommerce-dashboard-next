"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Product } from "./product-columns";
import { createProductAction, updateProductAction } from "./product.actions";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  isAvailable: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  productData?: Product;
  guildId?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  setIsOpen,
  productData,
  guildId,
}) => {
  const [isPending, startTransition] = useTransition();

  const isEditMode = !!productData;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      isAvailable: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (productData) {
        form.reset({
          name: productData.name || "",
          description: productData.description || "",
          price: productData.price || 0,
          isAvailable: productData.isAvailable ?? true,
        });
      } else {
        form.reset({
          name: "",
          description: "",
          price: 0,
          isAvailable: true,
        });
      }
    }
  }, [isOpen, productData, form]);

  const onSubmit = (data: ProductFormValues) => {
    startTransition(async () => {
      if (isEditMode && productData) {
        const result = await updateProductAction(productData._id, data);
        if (result.success) {
          toast.success("Product updated successfully");
          setIsOpen(false);
        } else {
          toast.error(result.error);
        }
      } else {
        if (!guildId) {
          toast.error("Guild ID is missing");
          return;
        }
        const result = await createProductAction(data, guildId);
        if (result.success) {
          toast.success("Product created successfully");
          setIsOpen(false);
          form.reset();
        } else {
          toast.error(result.error);
        }
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className="p-0 sm:max-w-md overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>{isEditMode ? "Edit Product" : "Create Product"}</SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Make changes to your product data here. Click save when you're done."
              : "Add a new product to your store."}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 py-4 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...form.register("name")} />
            {form.formState.errors.name && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.name.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...form.register("description")} />
            {form.formState.errors.description && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.description.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" step="0.01" {...form.register("price")} />
            {form.formState.errors.price && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.price.message}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="isAvailable"
              checked={form.watch("isAvailable")}
              onCheckedChange={(checked) => form.setValue("isAvailable", checked as boolean)}
            />
            <Label htmlFor="isAvailable">Is Available</Label>
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
