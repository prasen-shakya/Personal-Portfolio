import { pages, type PageKey } from "../config";
import { pageLabels } from "../lib/terminal";

type TerminalTabsProps = {
  activePage: PageKey;
  onSelect: (page: PageKey) => void;
};

export function TerminalTabs({ activePage, onSelect }: TerminalTabsProps) {
  const baseTabClassName =
    "flex-none cursor-pointer border-0 px-4 py-[0.15rem] whitespace-nowrap transition-colors duration-150 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px] max-[640px]:min-h-9 max-[640px]:min-w-0 max-[640px]:flex-1 max-[640px]:basis-1/3 max-[640px]:px-2 max-[640px]:text-center max-[480px]:basis-1/2";

  return (
    <header>
      <div className="h-[calc(1rem+env(safe-area-inset-top))] bg-terminal-base max-[640px]:h-[calc(0.5rem+env(safe-area-inset-top))]" aria-hidden="true" />
      <nav
        className="flex items-stretch overflow-x-auto overflow-y-hidden whitespace-nowrap bg-terminal-surface0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[640px]:flex-wrap max-[640px]:overflow-x-hidden max-[640px]:whitespace-normal"
        aria-label="Portfolio pages"
      >
        {pages.map((page) => {
          const isActive = page === activePage;
          const tabClassName = isActive
            ? `${baseTabClassName} bg-terminal-blue font-bold text-terminal-crust shadow-[inset_0_-1px_0_var(--color-terminal-crust)]`
            : `${baseTabClassName} bg-terminal-surface0 text-terminal-text hover:bg-terminal-surface1/70 hover:text-terminal-rosewater`;

          return (
            <button key={page} type="button" className={tabClassName} onClick={() => onSelect(page)} aria-pressed={isActive}>
              {pageLabels[page]}
            </button>
          );
        })}
        <div className="flex-1 bg-terminal-surface0 max-[640px]:hidden" aria-hidden="true" />
      </nav>
      <div className="h-px bg-terminal-surface1" aria-hidden="true" />
    </header>
  );
}
