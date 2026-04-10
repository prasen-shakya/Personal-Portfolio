import type { ReactNode } from "react";

type SplitLayoutProps = {
  left: ReactNode;
  right: ReactNode;
};

export function SplitLayout({ left, right }: SplitLayoutProps) {
  return (
    <section className="grid min-h-full grid-cols-[minmax(16rem,30%)_1px_minmax(0,1fr)] max-[840px]:grid-cols-1 max-[840px]:gap-3 max-[840px]:p-3 max-[480px]:gap-2.5 max-[480px]:p-[0.7rem]">
      <aside className="min-w-0 overflow-x-hidden overflow-y-auto px-5 py-4 max-[840px]:max-h-[30vh] max-[840px]:rounded-xl max-[840px]:border max-[840px]:border-terminal-surface1/80 max-[840px]:bg-terminal-mantle/45 max-[840px]:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] max-[640px]:max-h-[34vh] max-[640px]:px-[0.9rem] max-[640px]:py-[0.85rem] max-[480px]:px-[0.7rem]">
        {left}
      </aside>
      <div
        className="bg-terminal-surface1 max-[840px]:hidden"
        aria-hidden="true"
      />
      <article className="min-w-0 overflow-x-hidden overflow-y-auto px-5 py-4 max-[840px]:min-h-0 max-[840px]:rounded-xl max-[840px]:border max-[840px]:border-terminal-surface1/80 max-[840px]:bg-terminal-mantle/45 max-[840px]:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] max-[640px]:px-[0.9rem] max-[640px]:py-[0.85rem] max-[480px]:px-[0.7rem]">
        {right}
      </article>
    </section>
  );
}
