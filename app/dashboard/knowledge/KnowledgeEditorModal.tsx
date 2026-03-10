"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { KnowledgeData } from "@/models/knowledge.dal";
import { useState, useTransition } from "react";
import { createKnowledgeAction, updateKnowledgeAction } from "./knowledge.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const MAX_CHARS = 12000;

interface KnowledgeEditorModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  knowledgeData?: KnowledgeData | null;
  guildId: string;
}

export const KnowledgeEditorModal: React.FC<KnowledgeEditorModalProps> = ({
  isOpen,
  setIsOpen,
  knowledgeData,
  guildId,
}) => {
  const isEditMode = !!knowledgeData;
  const [name, setName] = useState(knowledgeData?.name || "");
  const [content, setContent] = useState(knowledgeData?.content || "");
  const [isPending, startTransition] = useTransition();

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHARS;

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (isOverLimit) {
      toast.error(`Content exceeds ${MAX_CHARS.toLocaleString()} character limit`);
      return;
    }

    startTransition(async () => {
      let result;
      if (isEditMode && knowledgeData) {
        result = await updateKnowledgeAction(knowledgeData._id, { name, content });
      } else {
        result = await createKnowledgeAction({ name, content, guildId });
      }

      if (result.success) {
        toast.success(isEditMode ? "Knowledge updated" : "Knowledge created");
        setIsOpen(false);
        if (!isEditMode) {
          setName("");
          setContent("");
        }
      } else {
        toast.error(result.error || "Something went wrong");
      }
    });
  };

  // Reset form when modal opens with new data
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setName(knowledgeData?.name || "");
      setContent(knowledgeData?.content || "");
    }
    setIsOpen(open);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        className="p-0 sm:max-w-lg overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>{isEditMode ? "Edit Knowledge" : "Create Knowledge"}</SheetTitle>
          <SheetDescription>
            {isEditMode
              ? "Update the name or content of this knowledge entry."
              : "Create a new text-based knowledge entry for your AI agent."}
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 py-6 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="knowledge-name">Name</Label>
            <Input
              id="knowledge-name"
              placeholder="e.g. Return Policy, Shipping FAQ..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-cyan-400/70"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="knowledge-content">Content</Label>
              <span
                className={`text-xs font-mono ${
                  isOverLimit ? "text-red-400" : charCount > MAX_CHARS * 0.9 ? "text-yellow-400" : "text-slate-400"
                }`}
              >
                {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
            </div>
            <Textarea
              id="knowledge-content"
              placeholder="Enter your knowledge content here..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              rows={16}
              className="resize-none font-mono text-sm focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-cyan-400/70"
            />
            {isOverLimit && (
              <p className="text-xs text-red-400">
                Content exceeds the {MAX_CHARS.toLocaleString()} character limit by{" "}
                {(charCount - MAX_CHARS).toLocaleString()} characters.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending || isOverLimit || !name.trim()}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEditMode ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
