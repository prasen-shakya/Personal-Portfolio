import { pages, type Contact, type PageKey } from "../config";

export const TERMINAL_RULE = "──────────────────────────────";

export const pageLabels: Readonly<Record<PageKey, string>> = {
  home: "Home",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  contact: "Contact",
};

export type ContactRow = {
  label: string;
  value: string;
  href: string;
};

export function clampIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(length - 1, index));
}

export function shiftPage(currentPage: PageKey, delta: number): PageKey {
  const currentIndex = pages.indexOf(currentPage);
  const nextIndex = clampIndex(currentIndex + delta, pages.length);

  return pages[nextIndex] ?? pages[0];
}

export function getStatusText(activePage: PageKey, isCompact: boolean): string {
  if (isCompact) {
    if (activePage === "skills" || activePage === "projects" || activePage === "experience") {
      return "  tap tabs  │  tap items  │  scroll";
    }

    return "  tap tabs  │  scroll";
  }

  let hints = "  ← → pages";

  if (activePage === "skills" || activePage === "projects" || activePage === "experience") {
    hints += "  │  ↑ ↓ select";
  }

  return hints;
}

export function getContactRows(contact: Contact): ContactRow[] {
  const rows: ContactRow[] = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Resume", value: contact.resume ? "View Resume" : "", href: contact.resume },
    { label: "GitHub", value: contact.github, href: contact.github },
    { label: "LinkedIn", value: contact.linkedin, href: contact.linkedin },
    { label: "Website", value: contact.website, href: contact.website },
    { label: "Twitter", value: contact.twitter, href: contact.twitter },
  ];

  return rows.filter((row) => row.value);
}

export function isEditableTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)
  );
}
