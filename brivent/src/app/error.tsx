"use client";

import { useEffect } from "react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center bg-[#0F172A] pt-20">
      <Container className="text-center py-24">
        <p className="text-accent text-sm font-mono tracking-widest mb-6">
          Error
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          Something went wrong.
        </h1>
        <p className="text-white/50 text-base leading-relaxed max-w-md mx-auto mb-10">
          An unexpected error occurred while loading this page. You can try
          again, or head back to the homepage.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm bg-accent text-white hover:bg-accent-dark transition-colors"
          >
            Try again
          </button>
          <Button href="/" variant="outline-dark">
            Back to homepage
          </Button>
        </div>
      </Container>
    </main>
  );
}
