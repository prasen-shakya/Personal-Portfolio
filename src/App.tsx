import { TerminalTabs } from "./components/TerminalTabs";
import { portfolioData, type PortfolioConfig } from "./config";
import { usePortfolioController } from "./hooks/usePortfolioController";
import { getContactRows } from "./lib/terminal";
import { ContactView } from "./views/ContactView";
import { ExperienceView } from "./views/ExperienceView";
import { HomeView } from "./views/HomeView";
import { ProjectsView } from "./views/ProjectsView";
import { SkillsView } from "./views/SkillsView";

function ErrorState({ error }: { error: string }) {
  return (
    <main className="min-h-screen min-h-dvh bg-terminal-mantle font-terminal text-base leading-[1.35] text-terminal-text max-[640px]:text-sm">
      <section className="flex min-h-screen min-h-dvh flex-col justify-center bg-terminal-base p-8 max-[640px]:px-3 max-[640px]:py-5 max-[480px]:px-[0.6rem]">
        <pre className="whitespace-pre-wrap text-terminal-red">
          {`config.yaml could not be loaded\n\n${error}`}
        </pre>
      </section>
    </main>
  );
}

function PortfolioApp({ config }: { config: PortfolioConfig }) {
  const {
    activePage,
    selectExperience,
    selectProject,
    selectSkillCategory,
    selectedExperience,
    selectedProject,
    selectedSkillCategory,
    setActivePage,
    statusText,
  } = usePortfolioController(config);

  const contactRows = getContactRows(config.contact);

  let content = null;

  if (activePage === "home") {
    content = (
      <HomeView
        asciiArt={config.asciiArt}
        intro={config.intro}
        title={config.title}
      />
    );
  } else if (activePage === "skills") {
    content = (
      <SkillsView
        categories={config.skills}
        selectedIndex={selectedSkillCategory}
        onSelect={selectSkillCategory}
      />
    );
  } else if (activePage === "projects") {
    content = (
      <ProjectsView
        projects={config.projects}
        selectedIndex={selectedProject}
        onSelect={selectProject}
      />
    );
  } else if (activePage === "experience") {
    content = (
      <ExperienceView
        experiences={config.experiences}
        selectedIndex={selectedExperience}
        onSelect={selectExperience}
      />
    );
  } else if (activePage === "contact") {
    content = <ContactView rows={contactRows} />;
  }

  return (
    <main className="min-h-screen min-h-dvh bg-terminal-mantle font-terminal text-base leading-[1.35] text-terminal-text max-[640px]:text-sm">
      <section className="flex min-h-screen min-h-dvh flex-col bg-terminal-base">
        <TerminalTabs activePage={activePage} onSelect={setActivePage} />
        <section className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
          {content}
        </section>
        <footer className="min-h-[1.7rem] overflow-x-auto overflow-y-hidden whitespace-nowrap bg-terminal-mantle px-4 py-[0.2rem] text-terminal-overlay0 [scrollbar-width:none] [padding-bottom:calc(0.2rem+env(safe-area-inset-bottom))] [&::-webkit-scrollbar]:hidden max-[640px]:px-3">
          {statusText}
        </footer>
      </section>
    </main>
  );
}

function App() {
  const { data, error } = portfolioData;

  if (!data) {
    return <ErrorState error={error ?? "The YAML file is missing or malformed."} />;
  }

  return <PortfolioApp config={data} />;
}

export default App;
