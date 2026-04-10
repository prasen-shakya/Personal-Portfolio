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
  const baseButtonClassName =
    "group w-full cursor-pointer border-0 bg-transparent px-0 py-[0.12rem] text-left outline-none transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px] max-[640px]:min-h-0 max-[640px]:w-auto max-[640px]:shrink-0 max-[640px]:px-0 max-[640px]:py-0";

  return (
    <div className="flex flex-col max-[640px]:flex-row max-[640px]:items-center max-[640px]:gap-4 max-[640px]:overflow-x-auto max-[640px]:overflow-y-hidden max-[640px]:whitespace-nowrap max-[640px]:[scrollbar-width:none] max-[640px]:[&::-webkit-scrollbar]:hidden">
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
          <button
            key={getKey(item, index)}
            type="button"
            className={buttonClassName}
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
          >
            <span className={`${textClassName} max-[640px]:hidden`}>
              {isActive ? "  ▸ " : "    "}
              {getLabel(item)}
            </span>
            <span className={`hidden ${textClassName} max-[640px]:inline-flex max-[640px]:items-center max-[640px]:gap-2 max-[640px]:whitespace-nowrap`}>
              <span className="text-center opacity-80" aria-hidden="true">
                {isActive ? "▸" : "•"}
              </span>
              <span>{getLabel(item)}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
