import { createFileRoute } from "@tanstack/react-router";
import { IMPRESSUM } from "@/lib/catalog";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [{ title: "Impressum — robtiel" }],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 md:px-8 md:py-14">
      <article className="metal-panel legal-prose p-6 md:p-10">
        <p className="font-display text-xs tracking-[0.28em] text-orange uppercase">Rechtliches</p>
        <h1 className="mt-2 font-display text-4xl tracking-[0.08em] uppercase">Impressum</h1>
        <p className="mt-2 text-sm text-muted">Angaben gemäß § 5 DDG</p>

        <h2>Diensteanbieter</h2>
        <p>
          {IMPRESSUM.name}
          <br />
          {IMPRESSUM.street}
          <br />
          {IMPRESSUM.zipCity}
          <br />
          {IMPRESSUM.country}
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href={`mailto:${IMPRESSUM.email}`}>{IMPRESSUM.email}</a>
        </p>

        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
          <br />
          {IMPRESSUM.name}
          <br />
          Anschrift wie oben.
        </p>

        <h2>EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
          bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          .
        </p>
        <p>
          Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor
          einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
          Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind
          wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
          fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
          der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter (unter anderem SoundCloud,
          Twitch, YouTube sowie Apps auf Cloudflare Workers), auf deren Inhalte wir keinen
          Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
          Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Links umgehend entfernen.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
          unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche
          gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
          Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </article>
    </main>
  );
}
