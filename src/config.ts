import { parse } from "yaml";
import configSource from "../config.yaml?raw";

export const pages = [
  "home",
  "skills",
  "projects",
  "experience",
  "contact",
] as const;

export type PageKey = (typeof pages)[number];

type RawSkillItem = string | { name?: string; level?: number };

type RawConfig = {
  name?: string;
  title?: string;
  ascii_art?: string;
  intro?: string;
  skills?: Array<{
    category?: string;
    items?: RawSkillItem[];
  }>;
  projects?: Array<{
    name?: string;
    description?: string;
    tech?: string[];
    url?: string;
    links?: Array<{
      label?: string;
      href?: string;
    }>;
    media?: Array<{
      type?: string;
      src?: string;
      alt?: string;
      caption?: string;
    }>;
  }>;
  experiences?: Array<{
    company?: string;
    role?: string;
    location?: string;
    period?: string;
    highlights?: string[];
  }>;
  contact?: {
    email?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    twitter?: string;
    resume?: string;
  };
};

export type SkillItem = {
  name: string;
  level: number;
};

export type SkillCategory = {
  category: string;
  items: SkillItem[];
};

export type Project = {
  name: string;
  description: string;
  tech: string[];
  url: string;
  links: ProjectLink[];
  media: ProjectMedia[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  caption: string;
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
};

export type Contact = {
  email: string;
  github: string;
  linkedin: string;
  website: string;
  twitter: string;
  resume: string;
};

export type PortfolioConfig = {
  name: string;
  title: string;
  asciiArt: string;
  intro: string;
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  contact: Contact;
};

export type PortfolioDataResult = {
  data: PortfolioConfig | null;
  error: string | null;
};

function asText(value: string | undefined): string {
  return value?.trim() ?? "";
}

function normalizeSkillItem(item: RawSkillItem): SkillItem {
  if (typeof item === "string") {
    return {
      name: item.trim(),
      level: 0,
    };
  }

  return {
    name: asText(item.name),
    level:
      typeof item.level === "number"
        ? Math.max(0, Math.min(5, Math.round(item.level)))
        : 0,
  };
}

function normalizeConfig(raw: RawConfig): PortfolioConfig {
  return {
    name: asText(raw.name),
    title: asText(raw.title),
    asciiArt: raw.ascii_art?.trimEnd() ?? "",
    intro: raw.intro?.trim() ?? "",
    skills: (raw.skills ?? [])
      .map((category) => ({
        category: asText(category.category),
        items: (category.items ?? [])
          .map(normalizeSkillItem)
          .filter((item) => item.name.length > 0),
      }))
      .filter((category) => category.category.length > 0),
    projects: (raw.projects ?? [])
      .map((project) => ({
        name: asText(project.name),
        description: asText(project.description),
        tech: (project.tech ?? []).map(asText).filter(Boolean),
        url: asText(project.url),
        links: (project.links ?? [])
          .map((link) => ({
            label: asText(link.label),
            href: asText(link.href),
          }))
          .filter((link) => link.label.length > 0 && link.href.length > 0),
        media: (project.media ?? [])
          .map((item): ProjectMedia => ({
            type: item.type === "video" ? "video" : "image",
            src: asText(item.src),
            alt: asText(item.alt),
            caption: asText(item.caption),
          }))
          .filter((item) => item.src.length > 0),
      }))
      .filter((project) => project.name.length > 0),
    experiences: (raw.experiences ?? [])
      .map((experience) => ({
        company: asText(experience.company),
        role: asText(experience.role),
        location: asText(experience.location),
        period: asText(experience.period),
        highlights: (experience.highlights ?? []).map(asText).filter(Boolean),
      }))
      .filter((experience) => experience.company.length > 0),
    contact: {
      email: asText(raw.contact?.email),
      github: asText(raw.contact?.github),
      linkedin: asText(raw.contact?.linkedin),
      website: asText(raw.contact?.website),
      twitter: asText(raw.contact?.twitter),
      resume: asText(raw.contact?.resume),
    },
  };
}

export function parsePortfolioConfig(source: string): PortfolioDataResult {
  try {
    const parsed = parse(source) as RawConfig;

    return {
      data: normalizeConfig(parsed ?? {}),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Unable to parse config.yaml",
    };
  }
}

export const portfolioData = parsePortfolioConfig(configSource);
