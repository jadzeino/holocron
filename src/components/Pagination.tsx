import { useState } from "react";

interface PaginationProps {
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  total: number;
}

export function Pagination({ page, hasNext, hasPrev, onPageChange, total }: PaginationProps) {
  const totalPages = Math.ceil(total / 10);
  const [jumpValue, setJumpValue] = useState("");
  const [showJump, setShowJump] = useState(false);

  const handleJump = () => {
    const target = parseInt(jumpValue, 10);
    if (target >= 1 && target <= totalPages) {
      onPageChange(target);
      setJumpValue("");
      setShowJump(false);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 gap-2 flex-wrap" role="navigation" aria-label="Pagination">
      <span className="font-tactical text-muted-foreground">
        {total} RECORDS // PAGE {page} OF {totalPages} {totalPages === 1 ? "PAGE" : "PAGES"}
      </span>
      <div className="flex items-center gap-2">
        {showJump ? (
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJump()}
              placeholder={`1–${totalPages}`}
              className="h-8 w-20 px-2 border border-border bg-input text-foreground font-tactical text-center focus:outline-none focus:ring-1 focus:ring-accent rounded-[var(--radius)]"
              style={{ fontSize: "0.7rem" }}
              autoFocus
            />
            <button
              onClick={handleJump}
              className="h-8 px-3 border border-border font-tactical text-foreground hover:border-accent hover:text-accent transition-colors focus:outline-none focus:ring-1 focus:ring-accent rounded-[var(--radius)]"
            >
              GO
            </button>
            <button
              onClick={() => { setShowJump(false); setJumpValue(""); }}
              className="h-8 px-2 border border-border font-tactical text-muted-foreground hover:border-accent hover:text-accent transition-colors focus:outline-none focus:ring-1 focus:ring-accent rounded-[var(--radius)]"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowJump(true)}
            disabled={totalPages <= 1}
            className="h-8 px-3 border border-border font-tactical text-muted-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-accent rounded-[var(--radius)]"
            aria-label="Jump to page"
          >
            GO TO
          </button>
        )}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev}
          className="h-8 px-4 border border-border font-tactical text-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-accent rounded-[var(--radius)]"
          aria-label="Previous page"
        >
          ← PREV
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          className="h-8 px-4 border border-border font-tactical text-foreground hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-accent rounded-[var(--radius)]"
          aria-label="Next page"
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
