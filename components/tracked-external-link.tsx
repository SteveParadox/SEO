"use client";

import * as React from "react";
import { trackEngagement } from "@/lib/engagement";
import type { UnifiedKind } from "@/lib/data";

type TrackedExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  kind: UnifiedKind;
  id: string;
  slug?: string;
  title?: string;
  subtitle?: string;
};

export function TrackedExternalLink({
  kind,
  id,
  slug,
  title,
  subtitle,
  onClick,
  children,
  ...props
}: TrackedExternalLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEngagement({ kind, id, slug, title, subtitle }, "outbound");
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
