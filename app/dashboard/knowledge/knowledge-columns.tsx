"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { EllipsisVertical, PenSquare, Trash2, Eye, Brain } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { deleteKnowledgeAction, trainKnowledgeAction } from "./knowledge.actions";
import { toast } from "sonner";
import { KnowledgeData } from "@/models/knowledge.dal";
import { KnowledgeEditorModal } from "./KnowledgeEditorModal";
import { KnowledgeDetailsModal } from "./KnowledgeDetailsModal";

const trainingStatusConfig = {
  not_trained: { label: "Not Trained", className: "bg-slate-700 text-slate-300" },
  training: { label: "Training...", className: "bg-yellow-900 text-yellow-400" },
  trained: { label: "Trained", className: "bg-green-900 text-green-400" },
  failed: { label: "Failed", className: "bg-red-900 text-red-400" },
};

export const knowledgeTableColumns: ColumnDef<KnowledgeData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    id: "source",
    header: "Source",
    accessorKey: "source",
    cell: ({ row }) => {
      const source = row.original.source;
      return (
        <Badge className={source === "uploaded" ? "bg-blue-900 text-blue-400" : "bg-purple-900 text-purple-400"}>
          {source === "uploaded" ? "Uploaded" : "Created"}
        </Badge>
      );
    },
  },
  {
    id: "charCount",
    header: "Characters",
    accessorKey: "charCount",
    cell: ({ row }) => {
      const count = row.original.charCount;
      return <span className="text-sm text-slate-400">{count.toLocaleString()} / 12,000</span>;
    },
  },
  {
    id: "training_status",
    header: "Training Status",
    accessorKey: "training_status",
    cell: ({ row }) => {
      const status = row.original.training_status || "not_trained";
      const config = trainingStatusConfig[status];
      return <Badge className={config.className}>{config.label}</Badge>;
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
    cell: ({ row, table }) => <KnowledgeColumnAction row={row} table={table} />,
  },
];

const KnowledgeColumnAction = ({
  row,
  table,
}: {
  row: Row<KnowledgeData>;
  table: Table<KnowledgeData>;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this knowledge entry?")) return;
    startTransition(async () => {
      const result = await deleteKnowledgeAction(row.original._id, row.original.guildId);
      if (result.success) {
        toast.success("Knowledge entry deleted successfully");
      } else {
        toast.error("Failed to delete knowledge entry");
      }
    });
  };

  const handleTrain = () => {
    startTransition(async () => {
      const result = await trainKnowledgeAction([row.original._id]);
      if (result.success) {
        toast.success("Training started");
      } else {
        toast.error("Failed to train");
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
            <Eye className="size-4" />
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
            <PenSquare className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleTrain} disabled={isPending}>
            <Brain className="size-4" />
            Train
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white" />
          <DropdownMenuItem className="text-red-600" onClick={handleDelete} disabled={isPending}>
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <KnowledgeEditorModal
        knowledgeData={row.original}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        guildId={row.original.guildId}
      />
      <KnowledgeDetailsModal
        isOpen={isViewModalOpen}
        setIsOpen={setIsViewModalOpen}
        knowledgeData={row.original}
      />
    </div>
  );
};
