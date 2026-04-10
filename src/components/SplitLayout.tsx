import type { ReactNode } from "react";

type SplitLayoutProps = {
  left: ReactNode;
  right: ReactNode;
};

export function SplitLayout({ left, right }: SplitLayoutProps) {
  return (
    <section className="grid min-h-full grid-cols-[minmax(16rem,30%)_1px_minmax(0,1fr)] max-[840px]:grid-cols-1 max-[840px]:grid-rows-[auto_1px_auto]">
      <aside className="min-w-0 overflow-x-hidden overflow-y-auto px-5 py-4 max-[840px]:max-h-[30vh] max-[640px]:max-h-none max-[640px]:overflow-y-hidden max-[640px]:px-[0.9rem] max-[640px]:py-[0.7rem] max-[480px]:px-[0.7rem]">
        {left}
      </aside>
      <div
        className="bg-terminal-surface1 max-[840px]:min-h-px"
        aria-hidden="true"
      />
      <article className="min-w-0 overflow-x-hidden overflow-y-auto px-5 py-4 max-[840px]:min-h-0 max-[640px]:px-[0.9rem] max-[640px]:py-[0.85rem] max-[480px]:px-[0.7rem]">
        {right}
      </article>
    </section>
  );
}
