import { Plus, Search, ToggleLeft, Trash, User, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import {
  MultiSelect,
  MultiSelectOptionBadgeView,
} from "@/components/ui/multi-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TooltipProviderCustomised } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import { useReactTable } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { OrderData } from "@/models/order.dal";
import { deleteBulkOrderAction } from "./order.actions";

interface AgentTableToolbarProps {
  table: ReturnType<typeof useReactTable<OrderData>>;
  guildId: string;
}

export const ProductTableToolbar: FC<AgentTableToolbarProps> = ({ table, guildId }) => {
  const isSelectionMode = !!Object.keys(table.getState().rowSelection).length;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function deleteMultipleItems(itemIds: string[]) {
    try {
      const result = await deleteBulkOrderAction(itemIds);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    } catch (error) {
      console.error("Error deleting items:", error);
      throw error;
    }
  }

  const handleDelete = async () => {
    try {
      const selectedRows = Object.keys(table.getState().rowSelection);
      setIsDeleting(true);
      if (selectedRows?.length) {
        await deleteMultipleItems(selectedRows);
        router.refresh();
        table.resetRowSelection();
      } else {
        toast({
          // @ts-expect-error just bad type defination!
          title: <p className="text-red-500">{"Failed to delete"}</p>,
          description: (
            <p className="text-textPrimary text-xs">
              {"Select at least one Item."}
            </p>
          ),
        });
      }
      toast({
        // @ts-expect-error just bad type defination!
        title: <p className="text-green-400">{"Delete Successful"}</p>,
        description: (
          <p className="text-textPrimary text-xs">
            {"Custom agent has been permanently deleted."}
          </p>
        ),
      });
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        // @ts-expect-error just bad type defination!
        title: <p className="text-red-500">{"Failed to delete"}</p>,
        description: (
          <p className="text-textPrimary text-xs">
            {"Unable to delete the custom agent."}
          </p>
        ),
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const renderBulkDeleteOption = () => {
    return (
      <div className="flex gap-2 items-center">
        <Button
          size={"sm"}
          className={cn("gap-2 text-white bg-red-500 hover:bg-red-600", {
            hidden: Object.keys(table.getState().rowSelection).length <= 0,
          })}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash className="w-4 h-4" />
          <span>{"Delete"}</span>
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          className="gap-2 text-textPrimary"
          // onClick={onClearRowSelection}
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
          {isSelectionMode && renderBulkDeleteOption()}
        </div>
      </div>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
