import { useEffect } from "react";
import { HazardMarks } from "./icons";

const TELETUBBIES = "https://www.teletubbies.com";

export function FskGate({
  gameHref,
  onConfirm,
  onClose,
}: {
  gameHref: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-bg/80 px-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fsk-gate-title"
        className="metal-panel metal-panel-red w-full max-w-md p-6 md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="mb-3 flex items-center gap-2 font-display text-xs tracking-[0.28em] text-red uppercase">
          <HazardMarks className="h-3 w-7" />
          FSK 18
        </p>
        <h2 id="fsk-gate-title" className="font-display text-3xl tracking-[0.08em] uppercase">
          Bist du 18?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Hardtekkmon enthält grafische Inhalte und obszöne Darstellungen. Deshalb ist das Spiel
          FSK 18. Nur für Erwachsene.
        </p>
        <p className="mt-3 text-base leading-relaxed text-fg">Bist du mindestens 18 Jahre alt?</p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-red px-4 font-display text-sm tracking-[0.18em] text-white uppercase"
            onClick={() => {
              onConfirm();
              window.open(gameHref, "_blank", "noopener,noreferrer");
              onClose();
            }}
          >
            Ja
          </button>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-bg/70 px-4 font-display text-sm tracking-[0.18em] text-muted uppercase shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
            onClick={() => {
              window.open(TELETUBBIES, "_blank", "noopener,noreferrer");
              onClose();
            }}
          >
            Nein
          </button>
        </div>
      </div>
    </div>
  );
}
