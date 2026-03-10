"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/ui/copy-button";
import { KnowledgeData } from "@/models/knowledge.dal";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface KnowledgeDetailsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  knowledgeData: KnowledgeData | null;
}

const trainingStatusConfig = {
  not_trained: { label: "Not Trained", className: "bg-slate-200 text-slate-700" },
  training: { label: "Training...", className: "bg-yellow-100 text-yellow-700" },
  trained: { label: "Trained", className: "bg-green-100 text-green-700" },
  failed: { label: "Failed", className: "bg-red-100 text-red-700" },
};

export const KnowledgeDetailsModal: React.FC<KnowledgeDetailsModalProps> = ({
  isOpen,
  setIsOpen,
  knowledgeData,
}) => {
  if (!knowledgeData) return null;

  const status = knowledgeData.training_status || "not_trained";
  const statusConfig = trainingStatusConfig[status];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        className="p-0 sm:max-w-md overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>Knowledge Details</SheetTitle>
          <SheetDescription>
            Read-only information about this knowledge entry.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 py-6 grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">ID</Label>
              <div className="font-mono text-sm flex items-center justify-between bg-slate-100/50 p-2 rounded">
                <span className="truncate mr-2">{knowledgeData._id}</span>
                <CopyButton text={knowledgeData._id} successMessage="ID copied!" />
              </div>
            </div>

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Name</Label>
              <div className="font-medium text-base">{knowledgeData.name}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-b pb-3">
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Source</Label>
                <div>
                  <Badge className={knowledgeData.source === "uploaded" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}>
                    {knowledgeData.source === "uploaded" ? "Uploaded" : "Created"}
                  </Badge>
                </div>
              </div>
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Characters</Label>
                <div className="text-sm">{knowledgeData.charCount.toLocaleString()}</div>
              </div>
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Training</Label>
                <div>
                  <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
                </div>
              </div>
            </div>

            {knowledgeData.fileUrl && (
              <div className="grid gap-1 border-b pb-3">
                <Label className="text-muted-foreground text-xs uppercase">File URL</Label>
                <div className="font-mono text-xs break-all bg-slate-100/50 p-2 rounded">
                  {knowledgeData.fileUrl}
                </div>
              </div>
            )}

            <div className="grid gap-1 border-b pb-3">
              <Label className="text-muted-foreground text-xs uppercase">Content</Label>
              <ScrollArea className="h-[200px] rounded border p-3">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {knowledgeData.content || <span className="text-muted-foreground italic">No content</span>}
                </pre>
              </ScrollArea>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Created</Label>
                <div className="text-sm">
                  {format(new Date(knowledgeData.createdAt || new Date()), "PPp")}
                </div>
              </div>
              <div className="grid gap-1">
                <Label className="text-muted-foreground text-xs uppercase">Last Updated</Label>
                <div className="text-sm">
                  {format(new Date(knowledgeData.updatedAt || new Date()), "PPp")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
