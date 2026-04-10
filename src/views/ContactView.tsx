import type { ContactRow } from "../lib/terminal";

type ContactViewProps = {
  rows: ContactRow[];
};

export function ContactView({ rows }: ContactViewProps) {
  return (
    <section className="flex min-h-full items-center justify-center px-4 py-8 max-[640px]:justify-start max-[640px]:px-3 max-[640px]:py-5 max-[480px]:px-[0.6rem]">
      <div className="w-full max-w-208 rounded-xl border border-terminal-surface1 px-8 py-6 max-[640px]:rounded-[1.2rem] max-[640px]:border-terminal-surface1/80 max-[640px]:bg-terminal-mantle/45 max-[640px]:p-4 max-[640px]:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <h2 className="mb-6 mt-0 text-center text-base font-bold text-terminal-blue">Get In Touch</h2>
        <div className="flex flex-col gap-4 max-[480px]:gap-[0.85rem]">
          {rows.map((row) => (
            <a
              key={row.label}
              className="grid min-w-0 items-start grid-cols-[14ch_minmax(0,1fr)] no-underline outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-terminal-blue focus-visible:outline-offset-[-1px] max-[640px]:rounded-lg max-[640px]:border max-[640px]:border-terminal-surface1/80 max-[640px]:bg-terminal-base/70 max-[640px]:grid-cols-1 max-[640px]:gap-[0.2rem] max-[640px]:px-3 max-[640px]:py-2.5"
              href={row.href}
              target={row.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={row.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              <span className="text-right font-bold text-terminal-mauve max-[640px]:text-left">{row.label}</span>
              <span className="min-w-0 break-all pl-[2ch] text-terminal-text hover:text-terminal-blue max-[640px]:pl-0">{row.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
