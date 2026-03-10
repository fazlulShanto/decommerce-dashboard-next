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
import { Product } from "./product-columns";
import { format } from "date-fns";

interface ProductDetailsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  productData: Product | null;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  setIsOpen,
  productData,
}) => {
  if (!productData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className="p-0 sm:max-w-md overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>Product Details</SheetTitle>
          <SheetDescription>
            Read-only information about this product.
          </SheetDescription>
        </SheetHeader>
        
        <div className="px-4 py-6 grid gap-6">
          <div className="grid gap-4">
            
            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Product ID</Label>
              <div className="font-mono text-sm flex items-center justify-between bg-slate-100/50 p-2 rounded">
                <span className="truncate mr-2">{productData._id}</span>
                <CopyButton text={productData._id} successMessage="Product ID copied!" />
              </div>
            </div>

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Name & Emoji</Label>
              <div className="font-medium text-base">
                {productData.emoji} {productData.name}
              </div>
            </div>

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Description</Label>
              <div className="text-sm whitespace-pre-wrap">
                {productData.description || <span className="text-muted-foreground italic">No description provided</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b pb-3">
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Price</Label>
                <div className="font-medium">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(productData.price)}
                </div>
              </div>
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Availability</Label>
                <div>
                  {productData.isAvailable ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Available</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Unavailable</Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Guild ID</Label>
              <div className="font-mono text-sm flex items-center justify-between bg-slate-100/50 p-2 rounded">
                <span className="truncate mr-2">{productData.guildId}</span>
                <CopyButton text={productData.guildId} successMessage="Guild ID copied!" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Created</Label>
                <div className="text-sm">
                  {format(new Date(productData.createdAt || new Date()), "PPp")}
                </div>
              </div>
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Last Updated</Label>
                <div className="text-sm">
                  {format(new Date(productData.updatedAt || new Date()), "PPp")}
                </div>
              </div>
            </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
