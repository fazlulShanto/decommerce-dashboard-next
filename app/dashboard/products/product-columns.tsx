import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { EllipsisVertical, PenSquare, Trash2 } from "lucide-react";
export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  isAvailable: boolean;
  guildId: string;
  createdAt: string;
  updatedAt: string;
};
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";
import { CreateOrderModal } from "./CreateOrderModal";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { useState, useTransition } from "react";
import { deleteProductAction } from "./product.actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
export const productTableColumns: ColumnDef<Product>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
  },
  {
    id: "price",
    header: "Price",
    accessorKey: "price",
  },
  {
    id: "isAvailable",
    header: "Is Available",
    accessorKey: "isAvailable",
    cell : ({row}) =>{
      const isAvailabe = !!row.original.isAvailable;
      if (isAvailabe){
        return <Badge className="bg-green-900 text-green-400">Yes</Badge>
      }
      return <Badge className="bg-red-900 text-red-400">No</Badge>
    }
  },
  {
    id: "updatedAt",
    header: "Last Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => format(new Date(row.getValue("updatedAt")), "PPp"),
  },
  {
    id: "column_action",
    header: "",
    cell: ({ row, table }) => <ProductColumnAction row={row} table={table} />,
  },
];

const ProductColumnAction = ({
  row,
  table,
}: {
  row: Row<Product>;
  table: Table<Product>;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    startTransition(async () => {
      const result = await deleteProductAction(row.original._id, row.original.guildId);
      if (result.success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-slate-800">
          <DropdownMenuItem onClick={() => setIsViewModalOpen(true)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
            <PenSquare className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsCreateOrderModalOpen(true)}>
            <PenSquare className="size-4" />
            Create order
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white" />
          <DropdownMenuItem className="text-red-600" onClick={handleDelete} disabled={isPending}>
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProductForm
        productData={row.original}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
      <CreateOrderModal 
        isOpen={isCreateOrderModalOpen} 
        setIsOpen={setIsCreateOrderModalOpen} 
        productData={row.original} 
      />
      <ProductDetailsModal
        isOpen={isViewModalOpen}
        setIsOpen={setIsViewModalOpen}
        productData={row.original}
      />
    </div>
  );
};
