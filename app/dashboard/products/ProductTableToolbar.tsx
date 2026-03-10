import { Plus, Search, ToggleLeft, Trash, User, X, Brain, Loader2 } from "lucide-react";
import { FC, useEffect, useState, useTransition } from "react";
import { useQueryState } from "nuqs";
import {
  MultiSelect,
  MultiSelectOptionBadgeView,
} from "@/components/ui/multi-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TooltipProviderCustomised } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { type Product } from "./product-columns";
import { useReactTable } from "@tanstack/react-table";
import { ProductForm } from "./ProductForm";
import { trainProductsAction } from "./product.actions";

interface AgentTableToolbarProps {
  table: ReturnType<typeof useReactTable<Product>>;
  guildId: string;
}

export const ProductTableToolbar: FC<AgentTableToolbarProps> = ({ table, guildId }) => {
  const isSelectionMode = !!Object.keys(table.getState().rowSelection).length;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTraining, startTrainingTransition] = useTransition();

  const handleTrainSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const productIds = selectedRows.map((row) => row.original._id);
    if (productIds.length === 0) return;

    startTrainingTransition(async () => {
      const result = await trainProductsAction(productIds);
      if (result.success) {
        toast.success(`Training started for ${productIds.length} product(s)`);
        table.resetRowSelection();
      } else {
        toast.error("Failed to train products");
      }
    });
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // await handleBulkDelete();
      toast.success("Delete Successful");
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("Failed to delete");
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const renderSelectionActions = () => {
    return (
      <div className="flex gap-2 items-center">
        <Button
          size={"sm"}
          className="gap-2 text-white bg-cyan-600 hover:bg-cyan-700"
          onClick={handleTrainSelected}
          disabled={isTraining}
        >
          {isTraining ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Brain className="w-4 h-4" />
          )}
          <span>{isTraining ? "Training..." : "Train Selected"}</span>
        </Button>
        <Button
          size={"sm"}
          className="gap-2 text-white bg-red-500 hover:bg-red-600"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash className="w-4 h-4" />
          <span>{"Delete"}</span>
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          className="gap-2 text-textPrimary"
          onClick={() => table.resetRowSelection()}
        >
          <span>{"Cancel"}</span>
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isSelectionMode && renderSelectionActions()}
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span>Create Product</span>
          </Button>
        </div>
      </div>
      <ProductForm
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        guildId={guildId}
      />
    </div>
  );
};
