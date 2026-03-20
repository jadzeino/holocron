import { useState, useCallback, useRef } from "react";

interface OpeningCrawlProps {
  text: string;
}

export function OpeningCrawl({ text }: OpeningCrawlProps) {
  const [key, setKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const replay = useCallback(() => {
    setPaused(false);
    setKey((k) => k + 1);
  }, []);

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  return (
    <div className="space-y-3">
      <div
        className="crawl-container rounded"
        aria-label="Opening crawl text"
        role="region"
      >
        {/* Starfield dots */}
        <div className="crawl-stars" aria-hidden="true" />
        <p
          key={key}
          ref={textRef}
          className="crawl-text font-medium"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {text}
        </p>
      </div>

      <div className="crawl-controls flex justify-center gap-2">
        <button
          onClick={togglePause}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-border font-tactical text-muted-foreground hover:text-accent hover:border-accent transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          aria-label={paused ? "Resume opening crawl" : "Pause opening crawl"}
        >
          <span className="text-xs">{paused ? "▶" : "❚❚"}</span>
          <span>{paused ? "Resume Crawl" : "Pause Crawl"}</span>
        </button>
        <button
          onClick={replay}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-border font-tactical text-muted-foreground hover:text-accent hover:border-accent transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          aria-label="Replay opening crawl animation"
        >
          <span className="text-sm">↺</span>
          Replay Crawl
        </button>
      </div>

      {/* Accessible static text for screen readers / reduced motion */}
      <div className="sr-only">{text}</div>
    </div>
  );
}
