import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/useTheme";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { useRoundedMode } from "@/hooks/useRoundedMode";
import { Sun, Moon, Volume2, VolumeOff, Square, Squircle } from "lucide-react";

interface TopbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export function Topbar({ searchValue, onSearchChange, showSearch = true, searchPlaceholder = "SEARCH DATABASE..." }: TopbarProps) {
  const { isDark, toggle } = useTheme();
  const { isPlaying, toggle: toggleMusic } = useBackgroundMusic();
  const { isRounded, toggle: toggleRounded } = useRoundedMode();

  return (
    <header className="h-12 flex items-center border-b border-border px-3 gap-3 shrink-0" role="banner">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" aria-label="Toggle sidebar" />

      <div className="h-4 w-px bg-border" aria-hidden="true" />

      {showSearch && (
        <div className="flex-1 max-w-md">
          <label htmlFor="search-input" className="sr-only">Search resources</label>
          <input
            id="search-input"
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            maxLength={100}
            className="w-full h-8 px-3 bg-input border border-border text-foreground placeholder:text-muted-foreground font-tactical search-pulse focus:outline-none focus:ring-1 focus:ring-accent"
            style={{ fontSize: "0.7rem" }}
          />
        </div>
      )}

      <div className="flex-1" />

      <button
        onClick={toggleMusic}
        className="h-8 w-8 flex items-center justify-center border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors rounded-[var(--radius)]"
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
      >
        {isPlaying ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeOff className="h-3.5 w-3.5" />}
      </button>

      <button
        onClick={toggleRounded}
        className="h-8 w-8 flex items-center justify-center border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors rounded-[var(--radius)]"
        aria-label={isRounded ? "Switch to sharp corners" : "Switch to rounded corners"}
      >
        {isRounded ? <Squircle className="h-3.5 w-3.5" /> : <Square className="h-3.5 w-3.5" />}
      </button>

      <button
        onClick={toggle}
        className="h-8 w-8 flex items-center justify-center border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors rounded-[var(--radius)]"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </button>
    </header>
  );
}
