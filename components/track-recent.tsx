"use client";

import * as React from "react";
import { addRecent, type RecentKind } from "@/lib/recent";
import { trackEngagement } from "@/lib/engagement";

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
    trackEngagement({ kind, id, slug, title, subtitle }, "view");
    // IMPORTANT: This effect only needs to run once per page load.
    // The dependency array is intentionally empty because we don't want this to re-run
    // if props change (it should only track the initial page view).
    // If dependencies are added, users will be tracked multiple times per page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
