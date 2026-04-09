import { useEffect, useState } from "react";

const COMPACT_VIEWPORT_QUERY = "(max-width: 640px)";

function getInitialViewportState(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(COMPACT_VIEWPORT_QUERY).matches;
}

export function useCompactViewport(): boolean {
  const [isCompact, setIsCompact] = useState(getInitialViewportState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(COMPACT_VIEWPORT_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsCompact(event.matches);
    };

    setIsCompact(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isCompact;
}
