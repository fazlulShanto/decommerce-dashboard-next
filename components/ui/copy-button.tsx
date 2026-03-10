"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
  successMessage?: string;
  iconSize?: number;
}

export function CopyButton({ text, className, successMessage, iconSize = 14 }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    toast.success(successMessage || "Copied to clipboard");

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6 text-muted-foreground hover:text-foreground", className)}
      onClick={onCopy}
      title="Copy to clipboard"
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Check size={iconSize} className="text-green-500" />
      ) : (
        <Copy size={iconSize} />
      )}
    </Button>
  );
}
