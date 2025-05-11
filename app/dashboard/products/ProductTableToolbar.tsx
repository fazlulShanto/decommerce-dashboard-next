import { Plus, Search, ToggleLeft, Trash, User, X } from "lucide-react";
import { FC, useState } from "react";

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
import { Product } from "./product-columns";

interface AgentTableToolbarProps {
  rowSelection: Record<string, boolean>;
  onClearRowSelection: () => void;
  handleBulkDelete: () => Promise<boolean>;
}

export const ProductTableToolbar: FC<AgentTableToolbarProps> = ({
  rowSelection,
  onClearRowSelection,
  handleBulkDelete,
}) => {
  const isSelectionMode = !!Object.keys(rowSelection).length;
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

  const renderSearchInput = () => {
    return (
      <div className="flex items-center gap-2 relative">
        <Search className="w-4 h-4 absolute transform -translate-y-1/2 ltr:left-2 rtl:right-2 top-1/2 text-textPrimary-disable" />
        <Input
          placeholder={"Search"}
          //   value={filterState?.search ?? ""}
          className="ltr:pl-7 rtl:pr-7 h-8 m-0 w-[290px]"
          onChange={
            (event) => null
            // setFilterState({ ...filterState, search: event.target.value })
          }
        />
      </div>
    );
  };

  const handleTemplateFilter = (agents: Product[]) => {
    // setFilterState((old) => ({ ...old, agents: agents }));
  };

  const renderClearFilterButton = () => {
    // const hasOtherFilters =
    //   !!filterState?.agents?.length || !!filterState?.status?.length;
    // const isSearchApplied = !!filterState?.search?.length;

    // if (!hasOtherFilters) return null;
    return (
      <Button
        className="bg-background-hover h-8 gap-1 text-xs"
        variant={"ghost"}
        onClick={() => {}}
      >
        <X className="w-4 h-4" />
        {"Clear Filters"}
      </Button>
    );
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
          onClick={onClearRowSelection}
        >
          <span>{"Cancel"}</span>
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-3">
          {renderSearchInput()}
          {renderClearFilterButton()}
        </div>

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
