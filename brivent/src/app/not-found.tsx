import Link from "next/link";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center bg-[#0F172A] pt-20">
      <Container className="text-center py-24">
        <p className="text-accent text-sm font-mono tracking-widest mb-6">
          404
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="text-white/50 text-base leading-relaxed max-w-md mx-auto mb-10">
          The page you are looking for may have been moved, renamed, or
          never existed. Let&rsquo;s get you back on track.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button href="/" variant="primary">
            Back to homepage
          </Button>
          <Button href="/contact" variant="outline-dark">
            Contact us
          </Button>
        </div>
        <p className="mt-10">
          <Link
            href="/work"
            className="text-white/40 hover:text-accent text-sm transition-colors"
          >
            Or explore our work →
          </Link>
        </p>
      </Container>
    </main>
  );
}
