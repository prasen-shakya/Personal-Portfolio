import { useLayoutEffect, useRef, useState } from "react";
import { useCompactViewport } from "../hooks/useCompactViewport";

type HomeViewProps = {
  asciiArt: string;
  intro: string;
  title: string;
};

type AsciiMetrics = {
  height: number;
  scale: number;
  width: number;
};

const DESKTOP_NAVIGATION_COPY = "Navigate with arrow keys and learn more about me!";
const MOBILE_NAVIGATION_COPY =
  "Tap through the sections below to explore more about me.";
const MOBILE_DESKTOP_HINT =
  "For the full terminal-style experience, this site is even better on desktop.";

function getResponsiveIntro(intro: string, isCompact: boolean): string {
  if (!isCompact) {
    return intro;
  }

  const mobileCopy = `${MOBILE_NAVIGATION_COPY}\n\n${MOBILE_DESKTOP_HINT}`;

  if (intro.includes(DESKTOP_NAVIGATION_COPY)) {
    return intro.replace(DESKTOP_NAVIGATION_COPY, mobileCopy);
  }

  return `${intro.trimEnd()}\n\n${mobileCopy}`;
}

export function HomeView({ asciiArt, intro, title }: HomeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLPreElement>(null);
  const isCompact = useCompactViewport();
  const [asciiMetrics, setAsciiMetrics] = useState<AsciiMetrics>({
    height: 0,
    scale: 1,
    width: 0,
  });
  const responsiveIntro = getResponsiveIntro(intro, isCompact);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const art = artRef.current;

    if (!container || !art || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateMetrics = () => {
      const nextWidth = art.scrollWidth;
      const nextHeight = art.scrollHeight;
      const availableWidth = container.clientWidth;

      if (!nextWidth || !nextHeight || !availableWidth) {
        return;
      }

      const nextScale = Math.min(1, availableWidth / nextWidth);

      setAsciiMetrics((current) => {
        if (current.width === nextWidth && current.height === nextHeight && Math.abs(current.scale - nextScale) < 0.001) {
          return current;
        }

        return {
          height: nextHeight,
          scale: nextScale,
          width: nextWidth,
        };
      });
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(container);
    resizeObserver.observe(art);

    return () => resizeObserver.disconnect();
  }, [asciiArt]);

  const asciiWrapperStyle =
    asciiMetrics.width > 0 && asciiMetrics.height > 0
      ? {
          height: `${asciiMetrics.height * asciiMetrics.scale}px`,
          width: `${asciiMetrics.width * asciiMetrics.scale}px`,
        }
      : undefined;

  return (
    <section className="flex min-h-full flex-col items-center justify-center px-6 py-8 text-center max-[640px]:justify-start max-[640px]:px-3 max-[640px]:py-5 max-[480px]:px-[0.6rem]">
      <div className="flex w-full max-w-[38rem] flex-col items-center gap-4 max-[640px]:px-1 max-[640px]:py-2">
        <div ref={containerRef} className="flex w-full justify-center overflow-visible">
          <div className="relative max-w-full overflow-visible" style={asciiWrapperStyle}>
            <pre
              ref={artRef}
              className="absolute left-0 top-0 inline-block whitespace-pre font-bold leading-[1.05] text-terminal-mauve text-[clamp(0.38rem,0.95vw,1rem)] max-[640px]:text-[0.32rem] max-[480px]:text-[0.24rem] max-[360px]:text-[0.19rem]"
              style={{ transform: `scale(${asciiMetrics.scale})`, transformOrigin: "top left" }}
            >
              {asciiArt}
            </pre>
          </div>
        </div>
        <h1 className="m-0 text-[clamp(1rem,1.6vw,1.4rem)] font-bold text-terminal-blue max-[640px]:pt-1">{title}</h1>
        <pre className="m-0 max-w-[74ch] whitespace-pre-wrap text-terminal-subtext0 wrap-anywhere max-[640px]:w-full max-[640px]:text-left">{responsiveIntro}</pre>
      </div>
    </section>
  );
}
