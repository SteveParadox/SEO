"use client";

import * as React from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type CopyButtonProps = {
  text: string;
  analyticsEvent?: "prompt_copy";
  label?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
};

export function CopyButton({
  text,
  analyticsEvent,
  label = "Copy",
  className,
  variant = "outline",
  size = "sm",
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      try {
        textarea.select();
        if (!document.execCommand("copy")) return;
      } catch {
        return;
      } finally {
        textarea.remove();
      }
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
    if (analyticsEvent) track(analyticsEvent);
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={onCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
      {copied ? "Copied" : label}
    </Button>
  );
}