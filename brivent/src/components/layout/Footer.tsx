import Link from "next/link";
import Image from "next/image";
import { footerNav, footerLegalNav } from "@/data/navigation";
import { siteConfig } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-dark-bg border-t border-white/5 pt-16 pb-8 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[24rem] h-[24rem] rounded-full bg-accent/[0.06] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:flex-wrap gap-12 md:justify-between relative">
        <div className="flex flex-col gap-4 flex-1 min-w-[220px] md:max-w-xs">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
  src="/logos/brivent/img.png"
  alt="Brivent"
  width={64}
  height={64}
  className="w-16 h-16 object-contain"
/>
            <span className="text-xl font-bold text-white">
              {/* brivent<span className="text-flamingo">.</span> */}
            </span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-1 min-w-[140px]">
          <h4 className="text-white text-xs font-semibold tracking-widest uppercase">
            — Company
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-white/40">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 flex-1 min-w-[200px] md:max-w-sm">
          <h4 className="text-white text-xs font-semibold tracking-widest uppercase">
            — Get in touch
          </h4>
          <p className="text-white/40 text-sm">
            Have a problem worth solving? Tell us what you are trying to
            build, improve, or automate.
          </p>
          <Link
            href="/contact"
            className="inline-flex w-fit px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors"
          >
            Start a conversation
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left text-white/30 text-xs relative">
        <span>
          © {new Date().getFullYear()} {siteConfig.name} All rights
          reserved.
        </span>
        <div className="flex justify-center gap-4">
          {footerLegalNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}