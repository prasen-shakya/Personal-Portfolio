import { SplitLayout } from "../components/SplitLayout";
import { TerminalList } from "../components/TerminalList";
import type { Project } from "../config";
import { TERMINAL_RULE } from "../lib/terminal";

type ProjectsViewProps = {
  onSelect: (index: number) => void;
  projects: Project[];
  selectedIndex: number;
};

export function ProjectsView({ onSelect, projects, selectedIndex }: ProjectsViewProps) {
  const currentProject = projects[selectedIndex];

  return (
    <SplitLayout
      left={
        <TerminalList
          activeTone="peach"
          items={projects}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          getKey={(project) => project.name}
          getLabel={(project) => project.name}
        />
      }
      right={
        currentProject ? (
          <div>
            <h2 className="m-0 text-base font-bold text-terminal-peach">{currentProject.name}</h2>
            <div className="my-0 mr-0 mb-3 mt-[0.15rem] text-terminal-surface1">{TERMINAL_RULE}</div>
            <p className="mb-[0.85rem] mt-0 whitespace-pre-wrap text-terminal-text wrap-anywhere">{currentProject.description}</p>
            {currentProject.url ? (
              <a
                className="mb-[0.85rem] block min-w-0 break-all text-terminal-text underline hover:text-terminal-blue"
                href={currentProject.url}
                target="_blank"
                rel="noreferrer"
              >
                {currentProject.url}
              </a>
            ) : null}
            <p className="mb-0 mt-2 whitespace-pre-wrap text-terminal-sapphire wrap-anywhere">
              {"⚡ "}
              {currentProject.tech.join(" · ")}
            </p>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-terminal-overlay0">No projects found.</div>
        )
      }
    />
  );
}
