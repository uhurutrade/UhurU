"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center bg-black text-white p-4">
          <h2 className="text-3xl font-bold">Critical Error</h2>
          <p>The application encountered a global failure.</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-white text-black rounded-md font-bold"
          >
            Reset Application
          </button>
        </div>
      </body>
    </html>
  );
}
