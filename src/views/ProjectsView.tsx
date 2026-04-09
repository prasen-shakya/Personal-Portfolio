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
  const projectLinks = currentProject
    ? currentProject.links.length > 0
      ? currentProject.links
      : currentProject.url
        ? [{ label: "Repo", href: currentProject.url }]
        : []
    : [];

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
            {projectLinks.map((link) => (
              <div
                key={`${currentProject.name}-${link.label}-${link.href}`}
                className="mb-[0.55rem] min-w-0 break-all text-terminal-text"
              >
                <span className="text-terminal-overlay1">[{link.label}] </span>
                <a
                  className="underline hover:text-terminal-blue"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.href}
                </a>
              </div>
            ))}
            {currentProject.media.map((item) => (
              <figure
                key={`${currentProject.name}-${item.src}`}
                className="mb-4 mt-3 max-w-[42rem] rounded border border-terminal-surface1 bg-terminal-crust/35 p-2"
              >
                {item.type === "video" ? (
                  <video
                    className="block h-auto w-full rounded border border-terminal-surface1"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={item.alt || currentProject.name}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    className="block h-auto w-full rounded border border-terminal-surface1"
                    src={item.src}
                    alt={item.alt || currentProject.name}
                    loading="lazy"
                  />
                )}
                {item.caption ? (
                  <figcaption className="mt-2 text-sm text-terminal-overlay1">
                    {item.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
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
