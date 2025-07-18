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
import { useState } from "react";
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
  },
  {
    id: "updatedAt",
    header: "Last Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleString(),
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
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
            <PenSquare className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white" />
          <DropdownMenuItem className="text-red-600">
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
    </div>
  );
};
