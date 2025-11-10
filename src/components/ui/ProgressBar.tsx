'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className, showLabel = false }: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progresso</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
