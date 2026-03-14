"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Render Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center bg-background text-foreground p-4">
      <h2 className="text-2xl font-bold font-headline">Something went wrong!</h2>
      <p className="text-muted-foreground max-w-md">
        An unexpected error occurred during rendering.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
