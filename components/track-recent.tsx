"use client";

import * as React from "react";
import { addRecent, type RecentKind } from "@/lib/recent";

type Props = {
  kind: RecentKind;
  id: string;
  slug: string;
  title: string;
  subtitle: string;
};

export function TrackRecent({ kind, id, slug, title, subtitle }: Props) {
  React.useEffect(() => {
    addRecent({ kind, id, slug, title, subtitle });
    // run once per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}