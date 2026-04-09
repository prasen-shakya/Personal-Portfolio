import type { SkillCategory } from "../config";
import { TERMINAL_RULE } from "../lib/terminal";
import { SplitLayout } from "../components/SplitLayout";
import { TerminalList } from "../components/TerminalList";

type SkillsViewProps = {
  categories: SkillCategory[];
  onSelect: (index: number) => void;
  selectedIndex: number;
};

export function SkillsView({
  categories,
  onSelect,
  selectedIndex,
}: SkillsViewProps) {
  const currentCategory = categories[selectedIndex];

  return (
    <SplitLayout
      left={
        <TerminalList
          activeTone="mauve"
          items={categories}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          getKey={(category) => category.category}
          getLabel={(category) => category.category}
        />
      }
      right={
        currentCategory ? (
          <div>
            <h2 className="m-0 text-base font-bold text-terminal-mauve">
              {currentCategory.category}
            </h2>
            <div className="my-0 mr-0 mb-3 mt-[0.15rem] text-terminal-surface1">
              {TERMINAL_RULE}
            </div>

            <div className="flex flex-col">
              {currentCategory.items.map((item) =>
                item.level > 0 ? (
                  <div
                    key={item.name}
                    className="flex flex-wrap items-baseline gap-x-[0.2rem] gap-y-[0.2rem] whitespace-pre-wrap text-terminal-green max-[640px]:items-start"
                  >
                    <span className="inline-block w-[18ch] shrink-0 max-[640px]:w-full">
                      {item.name}
                    </span>
                    <span className="text-terminal-blue">
                      {"█".repeat(item.level * 2)}
                    </span>
                    <span className="text-terminal-surface1">
                      {"░".repeat((5 - item.level) * 2)}
                    </span>
                    <span className="text-terminal-subtext0">
                      {" "}
                      {item.level}/5
                    </span>
                  </div>
                ) : (
                  <div
                    key={item.name}
                    className="whitespace-pre-wrap text-terminal-green"
                  >
                    {"  ● "}
                    {item.name}
                  </div>
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-terminal-overlay0">
            No skills found.
          </div>
        )
      }
    />
  );
}
