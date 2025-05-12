import { Plus, Search, ToggleLeft, Trash, User, X } from "lucide-react";
import { FC, useEffect, useState } from "react";
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
import { type Product } from "./product-columns";
import { useReactTable } from "@tanstack/react-table";

interface AgentTableToolbarProps {
  table: ReturnType<typeof useReactTable<Product>>;
}

export const ProductTableToolbar: FC<AgentTableToolbarProps> = ({ table }) => {
  const isSelectionMode = !!Object.keys({}).length;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await handleBulkDelete();
      toast({
        // @ts-expect-error just bad type defination!
        title: <p className="text-green-400">{t("Delete Successful")}</p>,
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
        title: <p className="text-red-500">{t("Failed to delete")}</p>,
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
        <div>{renderBulkDeleteOption()}</div>
      </div>

      {/* <DeleteAlert
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title={t(
          `Delete {{${Object.keys(rowSelection).length}}} Custom Agent?`
        )}
        description={
          <p className="text-sm text-textSecondary">
            {t(
              `This will permanently delete {{${
                Object.keys(rowSelection).length
              }}} custom agents that you have selected. Are you sure you want to delete?`
            )}
          </p>
        }
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isConfirming={isDeleting}
      /> */}
    </div>
  );
};
