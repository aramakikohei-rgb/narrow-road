"use client";

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

interface AudioPlayerProps {
  src: string;
  duration: number;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src, duration }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const howl = new Howl({
      src: [src],
      html5: true,
      preload: true,
      onend: () => {
        setIsPlaying(false);
        setCurrentTime(0);
      },
    });
    howlRef.current = howl;

    return () => {
      howl.unload();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [src]);

  function startProgressLoop() {
    function tick() {
      if (howlRef.current && howlRef.current.playing()) {
        setCurrentTime(howlRef.current.seek() as number);
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  const togglePlay = () => {
    if (!howlRef.current) return;

    if (isPlaying) {
      howlRef.current.pause();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    } else {
      howlRef.current.play();
      startProgressLoop();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (howlRef.current) {
      howlRef.current.seek(time);
      setCurrentTime(time);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center border border-border-subtle rounded-full hover:bg-accent hover:text-background transition-colors duration-300 shrink-0"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="currentColor"
          >
            <rect x="1" y="0" width="3" height="14" />
            <rect x="8" y="0" width="3" height="14" />
          </svg>
        ) : (
          <svg
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="currentColor"
          >
            <polygon points="0,0 12,7 0,14" />
          </svg>
        )}
      </button>

      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={currentTime}
        onChange={handleSeek}
        className="audio-progress flex-1"
      />

      <span className="text-xs text-text-secondary font-mono min-w-[70px] text-right shrink-0">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}
