type HomeViewProps = {
  asciiArt: string;
  intro: string;
  title: string;
};

export function HomeView({ asciiArt, intro, title }: HomeViewProps) {
  return (
    <section className="flex min-h-full flex-col items-center justify-center px-6 py-8 text-center max-[640px]:justify-start max-[640px]:px-3 max-[640px]:py-5 max-[480px]:px-[0.6rem]">
      <div className="max-w-full overflow-hidden max-[640px]:w-full">
        <pre className="font-bold leading-none text-terminal-mauve text-[clamp(0.38rem,0.95vw,1rem)] max-[640px]:text-[clamp(0.22rem,1vw,0.42rem)] max-[480px]:text-[clamp(0.18rem,0.95vw,0.28rem)]">
          {asciiArt}
        </pre>
      </div>
      <h1 className="mt-5 text-[clamp(1rem,1.6vw,1.4rem)] font-bold text-terminal-blue">{title}</h1>
      <pre className="mt-4 max-w-[74ch] whitespace-pre-wrap text-terminal-subtext0 wrap-anywhere max-[640px]:w-full max-[640px]:text-left">{intro}</pre>
    </section>
  );
}
