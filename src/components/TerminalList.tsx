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
    "group w-full cursor-pointer border-0 bg-transparent px-0 py-[0.12rem] text-left outline-none transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px] max-[640px]:min-h-10 max-[640px]:rounded-md max-[640px]:px-2 max-[640px]:py-[0.45rem]";

  return (
    <div className="flex flex-col max-[640px]:gap-1">
      {items.map((item, index) => {
        const isActive = index === selectedIndex;
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
