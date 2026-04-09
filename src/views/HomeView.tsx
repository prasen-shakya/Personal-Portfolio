import { useLayoutEffect, useRef, useState } from "react";

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

export function HomeView({ asciiArt, intro, title }: HomeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLPreElement>(null);
  const [asciiMetrics, setAsciiMetrics] = useState<AsciiMetrics>({
    height: 0,
    scale: 1,
    width: 0,
  });

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
        if (
          current.width === nextWidth &&
          current.height === nextHeight &&
          Math.abs(current.scale - nextScale) < 0.001
        ) {
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
      <h1 className="mt-5 text-[clamp(1rem,1.6vw,1.4rem)] font-bold text-terminal-blue">{title}</h1>
      <pre className="mt-4 max-w-[74ch] whitespace-pre-wrap text-terminal-subtext0 wrap-anywhere max-[640px]:w-full max-[640px]:text-left">{intro}</pre>
    </section>
  );
}
