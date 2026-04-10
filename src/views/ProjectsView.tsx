import { useEffect, useState } from "react";
import { SplitLayout } from "../components/SplitLayout";
import { TerminalList } from "../components/TerminalList";
import type { Project } from "../config";
import { TERMINAL_RULE } from "../lib/terminal";

type ProjectsViewProps = {
  onSelect: (index: number) => void;
  projects: Project[];
  selectedIndex: number;
};

type ProjectMediaGalleryProps = {
  media: Project["media"];
  projectName: string;
};

function ProjectMediaGallery({
  media,
  projectName,
}: ProjectMediaGalleryProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);

  const activeMedia =
    activeMediaIndex === null ? null : media[activeMediaIndex] ?? null;

  useEffect(() => {
    if (!activeMedia) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMediaIndex(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMedia]);

  if (media.length === 0) {
    return null;
  }

  return (
    <section className="mt-5 w-full max-w-[44rem] max-[840px]:max-w-full">
      <div className="flex flex-col gap-5 max-[640px]:gap-4">
        {media.map((item, index) => {
          return (
            <figure
              key={`${projectName}-${item.src}-${index}`}
              className="w-full overflow-hidden border border-terminal-surface1/80 bg-terminal-mantle/20"
            >
              <button
                type="button"
                className="block w-full cursor-zoom-in border-0 bg-terminal-base/65 p-0 text-left outline-none transition-colors duration-150 hover:bg-terminal-base/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px]"
                onClick={() => setActiveMediaIndex(index)}
                aria-label={`Open ${item.type} for ${projectName}`}
              >
                {item.type === "video" ? (
                  <video
                    className="block max-h-[28rem] w-full bg-terminal-base/80 object-contain max-[840px]:max-h-[23rem] max-[640px]:max-h-[18rem]"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={item.alt || projectName}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    className="block max-h-[28rem] w-full bg-terminal-base/80 object-contain max-[840px]:max-h-[23rem] max-[640px]:max-h-[18rem]"
                    src={item.src}
                    alt={item.alt || projectName}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </button>
              {item.caption ? (
                <figcaption className="border-t border-terminal-surface1/70 px-3 py-2 text-sm leading-relaxed text-terminal-subtext0 max-[640px]:px-2.5">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
      {activeMedia ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-terminal-crust/90 p-4 max-[640px]:items-stretch max-[640px]:p-2"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} media preview`}
          onClick={() => setActiveMediaIndex(null)}
        >
          <div
            className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden border border-terminal-surface1 bg-terminal-base"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-terminal-surface1/80 bg-terminal-mantle px-3 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-terminal-overlay0 max-[640px]:px-2.5">
              <span className="truncate">{projectName}</span>
              <button
                type="button"
                className="shrink-0 border-0 bg-transparent p-0 text-terminal-subtext0 outline-none transition-colors duration-150 hover:text-terminal-blue focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-2"
                onClick={() => setActiveMediaIndex(null)}
              >
                Close
              </button>
            </div>
            <div className="flex min-h-0 items-center justify-center bg-terminal-base/90 p-3 max-[640px]:flex-1 max-[640px]:p-2">
              {activeMedia.type === "video" ? (
                <video
                  className="block max-h-[calc(100dvh-9rem)] w-full bg-terminal-base object-contain max-[640px]:max-h-[calc(100dvh-7rem)]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  aria-label={activeMedia.alt || projectName}
                >
                  <source src={activeMedia.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="block max-h-[calc(100dvh-9rem)] w-full bg-terminal-base object-contain max-[640px]:max-h-[calc(100dvh-7rem)]"
                  src={activeMedia.src}
                  alt={activeMedia.alt || projectName}
                  loading="eager"
                  decoding="async"
                />
              )}
            </div>
            {activeMedia.caption ? (
              <div className="border-t border-terminal-surface1/70 px-3 py-2 text-sm leading-relaxed text-terminal-subtext0 max-[640px]:px-2.5">
                {activeMedia.caption}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}

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
            <p className="mb-0 mt-2 whitespace-pre-wrap text-terminal-sapphire wrap-anywhere">
              {"⚡ "}
              {currentProject.tech.join(" · ")}
            </p>
            <ProjectMediaGallery media={currentProject.media} projectName={currentProject.name} />
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-terminal-overlay0">No projects found.</div>
        )
      }
    />
  );
}
