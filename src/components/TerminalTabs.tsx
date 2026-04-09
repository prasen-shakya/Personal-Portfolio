import { useEffect, useState } from "react";
import { pages, type PageKey } from "../config";
import { pageLabels } from "../lib/terminal";

type TerminalTabsProps = {
  activePage: PageKey;
  onSelect: (page: PageKey) => void;
};

export function TerminalTabs({ activePage, onSelect }: TerminalTabsProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopTabClassName =
    "flex shrink-0 items-center self-stretch cursor-pointer border-0 px-4 py-2 whitespace-nowrap transition-colors duration-150 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px]";
  const mobileTabClassName =
    "block w-full cursor-pointer border-0 px-3 py-2 text-left transition-colors duration-150 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px]";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activePage]);

  return (
    <header>
      <nav
        className="flex items-stretch overflow-x-auto overflow-y-hidden whitespace-nowrap bg-terminal-surface0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[640px]:hidden"
        aria-label="Portfolio pages"
      >
        {pages.map((page) => {
          const isActive = page === activePage;
          const tabClassName = isActive
            ? `${desktopTabClassName} bg-terminal-blue font-bold text-terminal-crust shadow-[inset_0_-1px_0_var(--color-terminal-crust)]`
            : `${desktopTabClassName} bg-terminal-surface0 text-terminal-text hover:bg-terminal-surface1/70 hover:text-terminal-rosewater`;

          return (
            <button key={page} type="button" className={tabClassName} onClick={() => onSelect(page)} aria-pressed={isActive}>
              {pageLabels[page]}
            </button>
          );
        })}
        <div className="flex-1 bg-terminal-surface0 max-[640px]:hidden" aria-hidden="true" />
      </nav>
      <div className="hidden bg-terminal-surface0 max-[640px]:block">
        <div className="flex items-center justify-between gap-3 px-3 py-2">
          <span className="truncate font-bold text-terminal-blue">{pageLabels[activePage]}</span>
          <button
            type="button"
            className="flex min-h-9 min-w-9 items-center justify-center rounded-md border border-terminal-surface1 bg-terminal-base px-2 text-terminal-text outline-none transition-colors duration-150 hover:bg-terminal-surface1/70 hover:text-terminal-rosewater focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px]"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-terminal-nav"
            aria-label="Toggle navigation menu"
          >
            <span className="flex flex-col gap-1" aria-hidden="true">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
        {isMobileMenuOpen ? (
          <nav id="mobile-terminal-nav" className="border-t border-terminal-surface1 bg-terminal-base" aria-label="Mobile portfolio pages">
            {pages.map((page) => {
              const isActive = page === activePage;
              const tabClassName = isActive
                ? `${mobileTabClassName} bg-terminal-blue font-bold text-terminal-crust`
                : `${mobileTabClassName} text-terminal-text hover:bg-terminal-surface1/70 hover:text-terminal-rosewater`;

              return (
                <button key={page} type="button" className={tabClassName} onClick={() => onSelect(page)} aria-pressed={isActive}>
                  {pageLabels[page]}
                </button>
              );
            })}
          </nav>
        ) : null}
      </div>
      <div className="h-px bg-terminal-surface1" aria-hidden="true" />
    </header>
  );
}
