import { Link } from "@tanstack/react-router";
import { DiamondMark, HazardMarks } from "./icons";

export function SiteFooter({ cinematic = false }: { cinematic?: boolean }) {
  if (cinematic) {
    return (
      <footer className="relative z-10 px-4 pb-8 pt-4 text-center">
        <div className="mx-auto mb-5 flex max-w-xl items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-orange/50 to-orange/80" />
          <DiamondMark className="size-5 text-orange" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-orange/50 to-orange/80" />
        </div>
        <p className="font-display text-sm tracking-[0.38em] text-muted uppercase">
          Hardtekk. Industrial. Raw.
        </p>
        <p className="mt-2 font-display text-xs tracking-[0.32em] text-orange uppercase">
          Est. 2021
        </p>
        <LegalRow />
      </footer>
    );
  }

  return (
    <footer className="relative z-10 mt-16 border-t border-border/80 bg-bg/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="flex items-center gap-3 font-display text-xs tracking-[0.22em] text-muted uppercase">
          Built for Hardtekk. Made to endure.
          <HazardMarks className="h-3 w-7 text-orange" />
        </p>
        <p className="font-display text-xs tracking-[0.18em] text-muted uppercase">
          robtiel.de // 2026
        </p>
        <LegalRow />
      </div>
    </footer>
  );
}

function LegalRow() {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-4 font-display text-xs tracking-[0.18em] text-muted uppercase md:pt-0">
      <Link to="/impressum" className="hover:text-fg">
        Impressum
      </Link>
      <span aria-hidden="true">|</span>
      <Link to="/datenschutz" className="hover:text-fg">
        Datenschutz
      </Link>
    </p>
  );
}
