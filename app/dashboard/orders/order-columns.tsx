import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { OrderData } from "@/models/order.dal";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { EllipsisVertical, PenSquare, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { OrderForm } from "./OrderForm";
import { OrderDetailsModal } from "./OrderDetailsModal";
import { useState, useTransition } from "react";
import { deleteOrderAction } from "./order.actions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CopyButton } from "@/components/ui/copy-button";

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

export const orderTableColumns: ColumnDef<OrderData>[] = [
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
    id: "id",
    header: "Order ID",
    accessorKey: "_id",
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="truncate w-[80px]">{id}</span>
          <CopyButton text={id} />
        </div>
      );
    },
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
    cell: ({ row }) => {
      const customerId = row.original.customerId;
      return (
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="truncate w-[80px]">{customerId}</span>
          <CopyButton text={customerId} />
        </div>
      );
    },
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
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      return (
        <Badge className={getStatusBadgeVariant(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "delivery_status",
    header: "Delivery Status",
    accessorKey: "deliveryStatus",
    cell: ({ row }) => {
      const status = row.original.deliveryStatus;
      return (
        <Badge className={getStatusBadgeVariant(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
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
    cell: ({ row, table }) => <OrderColumnAction row={row} table={table} />,
  },
];

const OrderColumnAction = ({
  row,
  table,
}: {
  row: Row<OrderData>;
  table: Table<OrderData>;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    startTransition(async () => {
      const result = await deleteOrderAction(row.original._id);
      if (result.success) {
        toast.success("Order deleted successfully");
        table.resetRowSelection();
      } else {
        toast.error("Failed to delete order");
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
          <DropdownMenuSeparator className="bg-white" />
          <DropdownMenuItem className="text-red-600" onClick={handleDelete} disabled={isPending}>
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <OrderForm
        orderData={row.original}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
      <OrderDetailsModal
        isOpen={isViewModalOpen}
        setIsOpen={setIsViewModalOpen}
        orderData={row.original}
      />
    </div>
  );
};
