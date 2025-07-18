import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { OrderData } from "@/models/order.dal";
import { ColumnDef } from "@tanstack/react-table";

export const productTableColumns: ColumnDef<OrderData>[] = [
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
    header: "Product Name",
    accessorKey: "productName",
  },
  {
    id: "customer_id",
    header: "Customer ID",
    accessorKey: "customerId",
  },
  {
    id: "price",
    header: "Price",
    accessorKey: "price",
  },
  // {
  //   id: "payment_method",
  //   header: "Payment Method",
  //   accessorKey: "paymentMethod",
  // },
  {
    id: "payment_status",
    header: "Payment Status",
    accessorKey: "paymentStatus",
  },
  {
    id: "delivery_status",
    header: "Delivery Status",
    accessorKey: "deliveryStatus",
  },
  {
    id: "updatedAt",
    header: "Last Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleString(),
  },
];
