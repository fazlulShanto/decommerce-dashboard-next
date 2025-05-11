import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
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

export const productTableColumns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
];
