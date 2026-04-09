import { useEffect, useState } from "react";
import type { PageKey, PortfolioConfig } from "../config";
import {
  clampIndex,
  getStatusText,
  isEditableTarget,
  shiftPage,
} from "../lib/terminal";
import { useCompactViewport } from "./useCompactViewport";

type PortfolioController = {
  activePage: PageKey;
  selectExperience: (index: number) => void;
  selectProject: (index: number) => void;
  selectSkillCategory: (index: number) => void;
  setActivePage: (page: PageKey) => void;
  selectedExperience: number;
  selectedProject: number;
  selectedSkillCategory: number;
  statusText: string;
};

export function usePortfolioController(
  config: PortfolioConfig,
): PortfolioController {
  const [activePage, setActivePage] = useState<PageKey>("home");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState(0);
  const isCompact = useCompactViewport();

  const skillCount = config.skills.length;
  const projectCount = config.projects.length;
  const experienceCount = config.experiences.length;

  const selectSkillCategory = (index: number) => {
    setSelectedSkillCategory(clampIndex(index, skillCount));
  };

  const selectProject = (index: number) => {
    setSelectedProject(clampIndex(index, projectCount));
  };

  const selectExperience = (index: number) => {
    setSelectedExperience(clampIndex(index, experienceCount));
  };

  useEffect(() => {
    document.title = `${config.name} | Portfolio`;
  }, [config.name]);

  useEffect(() => {
    setSelectedSkillCategory((current) => clampIndex(current, skillCount));
    setSelectedProject((current) => clampIndex(current, projectCount));
    setSelectedExperience((current) => clampIndex(current, experienceCount));
  }, [experienceCount, projectCount, skillCount]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "h") {
        event.preventDefault();
        setActivePage((currentPage) => shiftPage(currentPage, -1));
        return;
      }

      if (event.key === "ArrowRight" || event.key === "l") {
        event.preventDefault();
        setActivePage((currentPage) => shiftPage(currentPage, 1));
        return;
      }

      if (event.key === "ArrowUp" || event.key === "k") {
        event.preventDefault();

        if (activePage === "skills") {
          setSelectedSkillCategory((current) => clampIndex(current - 1, skillCount));
        }

        if (activePage === "projects") {
          setSelectedProject((current) => clampIndex(current - 1, projectCount));
        }

        if (activePage === "experience") {
          setSelectedExperience((current) =>
            clampIndex(current - 1, experienceCount),
          );
        }

        return;
      }

      if (event.key === "ArrowDown" || event.key === "j") {
        event.preventDefault();

        if (activePage === "skills") {
          setSelectedSkillCategory((current) => clampIndex(current + 1, skillCount));
        }

        if (activePage === "projects") {
          setSelectedProject((current) => clampIndex(current + 1, projectCount));
        }

        if (activePage === "experience") {
          setSelectedExperience((current) =>
            clampIndex(current + 1, experienceCount),
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePage, experienceCount, projectCount, skillCount]);

  return {
    activePage,
    selectExperience,
    selectProject,
    selectSkillCategory,
    setActivePage,
    selectedExperience,
    selectedProject,
    selectedSkillCategory,
    statusText: getStatusText(activePage, isCompact),
  };
}
