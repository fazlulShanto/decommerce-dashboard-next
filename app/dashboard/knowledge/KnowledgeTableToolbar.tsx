"use client";

import { Plus, Upload, Brain, Loader2, Trash, X } from "lucide-react";
import { FC, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { KnowledgeData } from "@/models/knowledge.dal";
import { useReactTable } from "@tanstack/react-table";
import { KnowledgeEditorModal } from "./KnowledgeEditorModal";
import { trainKnowledgeAction, createKnowledgeAction } from "./knowledge.actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";

interface KnowledgeTableToolbarProps {
  table: ReturnType<typeof useReactTable<KnowledgeData>>;
  guildId: string;
}

export const KnowledgeTableToolbar: FC<KnowledgeTableToolbarProps> = ({
  table,
  guildId,
}) => {
  const isSelectionMode = !!Object.keys(table.getState().rowSelection).length;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isTraining, startTrainingTransition] = useTransition();

  const handleTrainSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const knowledgeIds = selectedRows.map((row) => row.original._id);
    if (knowledgeIds.length === 0) return;

    startTrainingTransition(async () => {
      const result = await trainKnowledgeAction(knowledgeIds);
      if (result.success) {
        toast.success(`Training started for ${knowledgeIds.length} knowledge item(s)`);
        table.resetRowSelection();
      } else {
        toast.error("Failed to train knowledge");
      }
    });
  };

  const handleUploadComplete = async (res: any[]) => {
    if (!res || res.length === 0) return;
    const file = res[0];

    try {
      // Fetch the file content to store it
      const response = await fetch(file.ufsUrl || file.url);
      const textContent = await response.text();

      const result = await createKnowledgeAction({
        name: file.name.replace(/\.txt$/, ""),
        content: textContent,
        guildId,
        source: "uploaded",
        fileUrl: file.ufsUrl || file.url,
        fileKey: file.key,
      });

      if (result.success) {
        toast.success(`"${file.name}" uploaded and saved`);
        setIsUploadModalOpen(false);
      } else {
        toast.error(result.error || "Failed to save uploaded file");
      }
    } catch (error) {
      console.error("Upload handling error:", error);
      toast.error("Failed to process uploaded file");
    }
  };

  const renderSelectionActions = () => (
    <div className="flex gap-2 items-center">
      <Button
        size="sm"
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
        variant="outline"
        size="sm"
        className="gap-2 text-textPrimary"
        onClick={() => table.resetRowSelection()}
      >
        <span>Cancel</span>
      </Button>
    </div>
  );

  return (
    <>
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
              <span>Create Knowledge</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload className="w-4 h-4" />
              <span>Upload File</span>
            </Button>
          </div>
        </div>
      </div>

      <KnowledgeEditorModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        guildId={guildId}
      />

      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Text File</DialogTitle>
            <DialogDescription>
              Upload a .txt file (max 1MB). Content will be stored and can be trained for your AI agent.
            </DialogDescription>
          </DialogHeader>
          <UploadDropzone
            endpoint="textFileUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
              toast.error(`Upload failed: ${error.message}`);
            }}
            appearance={{
              container: "border-slate-700 bg-slate-800/50",
              label: "text-cyan-400",
              allowedContent: "text-slate-400",
              button: "bg-cyan-600 hover:bg-cyan-700 text-white after:bg-cyan-700",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
