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
    "group w-full cursor-pointer border-0 bg-transparent px-0 py-[0.12rem] text-left outline-none transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px] max-[640px]:min-h-8 max-[640px]:py-[0.18rem]";

  return (
    <div className="flex flex-col">
      {items.map((item, index) => {
        const isActive = index === selectedIndex;
        let textClassName =
          "whitespace-pre-wrap text-terminal-overlay1 group-hover:text-terminal-subtext0";

        if (isActive && activeTone === "peach") {
          textClassName = "whitespace-pre-wrap font-bold text-terminal-peach";
        } else if (isActive && activeTone === "mauve") {
          textClassName = "whitespace-pre-wrap font-bold text-terminal-mauve";
        } else if (isActive) {
          textClassName = "whitespace-pre-wrap font-bold text-terminal-blue";
        }

        return (
          <button
            key={getKey(item, index)}
            type="button"
            className={baseButtonClassName}
            onClick={() => onSelect(index)}
            aria-pressed={isActive}
          >
            <span className={textClassName}>
              {isActive ? "  ▸ " : "    "}
              {getLabel(item)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
