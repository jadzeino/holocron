import { useState, useEffect } from "react";

// Shared audio instance across all components — survives re-mounts
let sharedAudio: HTMLAudioElement | null = null;

function getAudio() {
  if (!sharedAudio) {
    const base = import.meta.env.BASE_URL;
    sharedAudio = new Audio(`${base}audio/star-wars-theme.m4a`);
    sharedAudio.loop = true;
    sharedAudio.volume = 0.3;
  }
  return sharedAudio;
}

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("holocron-music") === "on";
  });

  useEffect(() => {
    const audio = getAudio();

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }

    localStorage.setItem("holocron-music", isPlaying ? "on" : "off");
  }, [isPlaying]);

  return { isPlaying, toggle: () => setIsPlaying((p) => !p) };
}
