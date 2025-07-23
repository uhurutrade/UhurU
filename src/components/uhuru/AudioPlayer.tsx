
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  isCompact?: boolean;
}

const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function AudioPlayer({
  isPlaying,
  duration,
  currentTime,
  onPlay,
  onPause,
  onSeek,
  isCompact = true,
}: AudioPlayerProps) {
    
  const handleSeek = (value: number[]) => {
    onSeek(value[0]);
  };
  
  const togglePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const playerClass = isCompact 
    ? "h-10 w-60" 
    : "h-14 w-full max-w-sm mt-2";

  const buttonSize = isCompact ? "h-8 w-8" : "h-10 w-10";
  const iconSize = isCompact ? "h-4 w-4" : "h-5 w-5";
  const sliderThumbSize = isCompact ? "h-3 w-3" : "h-4 w-4";

  return (
    <div className={cn("flex items-center gap-2", playerClass)}>
      <Button
        variant="ghost"
        size="icon"
        className={cn("flex-shrink-0", buttonSize)}
        onClick={togglePlayPause}
      >
        {isPlaying ? <Pause className={iconSize} /> : <Play className={iconSize} />}
      </Button>
      <div className="bg-background/20 rounded-full p-2 flex-shrink-0">
         <User className={iconSize} />
      </div>
      <div className="flex-grow flex items-center gap-2">
        <Slider
          value={[currentTime]}
          max={duration || 1}
          step={0.1}
          onValueChange={handleSeek}
          className={cn("[&>span:first-child>span]:bg-primary", !isCompact && "h-2")}
          thumbClassName={sliderThumbSize}
        />
        {duration > 0 && (
          <span className={cn("text-xs font-mono", isCompact ? "w-16" : "w-20")}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        )}
      </div>
    </div>
  );
}

// Add this to Slider component to allow thumb size override
declare module "@/components/ui/slider" {
    interface SliderProps {
        thumbClassName?: string;
    }
}
