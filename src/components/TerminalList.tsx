import { Fragment, useEffect, useRef, useState } from "react";

type TerminalListProps<T> = {
  activeTone?: "blue" | "mauve" | "peach";
  getKey: (item: T, index: number) => string;
  getLabel: (item: T) => string;
  items: T[];
  onSelect: (index: number) => void;
  selectedIndex: number;
};

export function TerminalList<T,>({
  activeTone = "blue",
  getKey,
  getLabel,
  items,
  onSelect,
  selectedIndex,
}: TerminalListProps<T>) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const baseButtonClassName =
    "group w-full cursor-pointer border-0 bg-transparent px-0 py-[0.12rem] text-left outline-none transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px] max-[640px]:min-h-0 max-[640px]:w-auto max-[640px]:shrink-0 max-[640px]:snap-start max-[640px]:px-0 max-[640px]:py-0";

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const updateScrollState = () => {
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
      setCanScrollLeft(scroller.scrollLeft > 4);
      setCanScrollRight(maxScrollLeft - scroller.scrollLeft > 4);
    };

    updateScrollState();

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(scroller);
    window.addEventListener("resize", updateScrollState);
    scroller.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollState);
      scroller.removeEventListener("scroll", updateScrollState);
    };
  }, [items.length, selectedIndex]);

  return (
    <div className="relative flex flex-col">
      <div className="hidden items-center justify-between px-1 pb-2 text-[0.62rem] uppercase tracking-[0.18em] text-terminal-overlay0 max-[640px]:flex">
        <span>Topics</span>
        <span className={`transition-opacity duration-200 ${canScrollLeft || canScrollRight ? "opacity-100" : "opacity-0"}`}>
          Swipe to browse
        </span>
      </div>
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex flex-col max-[640px]:flex-row max-[640px]:items-center max-[640px]:gap-2 max-[640px]:overflow-x-auto max-[640px]:overflow-y-hidden max-[640px]:scroll-smooth max-[640px]:whitespace-nowrap max-[640px]:[scrollbar-width:none] max-[640px]:[&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => {
            const isActive = index === selectedIndex;
            const buttonClassName = isActive
              ? `${baseButtonClassName}`
              : `${baseButtonClassName}`;
            let textClassName =
              "whitespace-pre-wrap text-terminal-overlay1 group-hover:text-terminal-subtext0 max-[640px]:leading-6";

            if (isActive && activeTone === "peach") {
              textClassName = "whitespace-pre-wrap font-bold text-terminal-peach max-[640px]:leading-6";
            } else if (isActive && activeTone === "mauve") {
              textClassName = "whitespace-pre-wrap font-bold text-terminal-mauve max-[640px]:leading-6";
            } else if (isActive) {
              textClassName = "whitespace-pre-wrap font-bold text-terminal-blue max-[640px]:leading-6";
            }

            return (
              <Fragment key={getKey(item, index)}>
                <button
                  type="button"
                  className={buttonClassName}
                  onClick={() => onSelect(index)}
                  aria-pressed={isActive}
                >
                  <span className={`${textClassName} max-[640px]:hidden`}>
                    {isActive ? "  ▸ " : "    "}
                    {getLabel(item)}
                  </span>
                  <span className={`hidden ${textClassName} max-[640px]:inline-flex max-[640px]:items-center max-[640px]:gap-1.5 max-[640px]:whitespace-nowrap`}>
                    {isActive ? (
                      <span className="text-center opacity-90" aria-hidden="true">
                        ▸
                      </span>
                    ) : null}
                    <span>{getLabel(item)}</span>
                  </span>
                </button>
                {index < items.length - 1 ? (
                  <span className="hidden text-terminal-surface1 max-[640px]:inline-block" aria-hidden="true">
                    │
                  </span>
                ) : null}
              </Fragment>
            );
          })}
        </div>
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 hidden w-8 transition-opacity duration-200 max-[640px]:block ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(to right, var(--color-terminal-base), transparent)" }}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 hidden w-10 transition-opacity duration-200 max-[640px]:block ${canScrollRight ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(to left, var(--color-terminal-base), transparent)" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
