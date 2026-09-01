import { createFileRoute } from "@tanstack/react-router";
import { IMPRESSUM } from "@/lib/catalog";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [{ title: "Datenschutz — robtiel" }],
  }),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 md:px-8 md:py-14">
      <article className="metal-panel legal-prose p-6 md:p-10">
        <p className="font-display text-xs tracking-[0.28em] text-orange uppercase">Rechtliches</p>
        <h1 className="mt-2 font-display text-4xl tracking-[0.08em] uppercase">Datenschutz</h1>
        <p className="mt-2 text-sm text-muted">
          Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13, 14 DSGVO
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>
          {IMPRESSUM.name}
          <br />
          {IMPRESSUM.street}
          <br />
          {IMPRESSUM.zipCity}
          <br />
          {IMPRESSUM.country}
          <br />
          E-Mail: <a href={`mailto:${IMPRESSUM.email}`}>{IMPRESSUM.email}</a>
        </p>

        <h2>2. Hosting</h2>
        <p>
          Diese Website wird über Infrastruktur in der Cloud bereitgestellt. Dabei werden
          technisch notwendige Server-Logfiles (z. B. IP-Adresse, Zeitpunkt, aufgerufene
          Seite, Browser/OS) verarbeitet, um den Betrieb, die Sicherheit und die
          Fehleranalyse zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse am sicheren Betrieb).
        </p>

        <h2>3. Aufruf der Website</h2>
        <p>
          Beim bloßen Besuch dieser Seiten setzen wir keine Tracking-Cookies und erstellen keine
          Nutzungsprofile für Werbung.
        </p>

        <h2>4. App-Klicks (verschiedene IP-Adressen)</h2>
        <p>
          Wenn Sie unter „Apps / Games“ eine App öffnen, zählen wir, von wie vielen verschiedenen
          IP-Adressen dieser Klick kommt. Dieselbe Adresse wird pro App nur einmal gezählt.
          Gespeichert wird nicht die IP-Adresse selbst, sondern ein nicht umkehrbarer Hash.
          Zweck ist die Reichweitenmessung der einzelnen Tools. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse an der Auswertung der Nutzung).
        </p>

        <h2>5. SoundCloud</h2>
        <p>
          Im Bereich „Feed“ können Tracks über den Player von SoundCloud (SoundCloud Limited /
          SoundCloud Inc., USA) abgespielt werden. Beim Start eines Tracks baut Ihr Browser
          eine Verbindung zu SoundCloud auf. Dabei können Daten (u. a. IP-Adresse,
          Geräteinformationen) an SoundCloud übermittelt und dort Cookies gesetzt werden.
          Die Datenübermittlung in die USA kann auf Grundlage von Standardvertragsklauseln
          erfolgen. Rechtsgrundlage der Einbindung nach Interaktion ist Art. 6 Abs. 1 lit. f
          DSGVO bzw. Art. 6 Abs. 1 lit. a DSGVO, soweit eine Einwilligung über den
          Drittanbieter eingeholt wird.
        </p>
        <p>
          Weitere Informationen:{" "}
          <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">
            soundcloud.com/pages/privacy
          </a>
        </p>

        <h2>6. Apps auf Cloudflare</h2>
        <p>
          Die Spiele und Tools unter „Apps / Games“ werden auf eigener Infrastruktur bei
          Cloudflare, Inc. bereitgestellt und in einem neuen Tab geöffnet. Für die dortige
          Datenverarbeitung gelten die Hinweise der jeweiligen App bzw. von Cloudflare.
        </p>

        <h2>7. Externe Links</h2>
        <p>
          Links zu Twitch und YouTube führen auf Angebote Dritter. Erst beim Anklicken
          verlassen Sie diese Website; es gelten die Datenschutzhinweise der jeweiligen
          Anbieter.
        </p>

        <h2>8. Kontaktaufnahme</h2>
        <p>
          Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen mitgeteilten
          Daten zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Die Daten
          werden gelöscht, wenn sie für den Zweck nicht mehr erforderlich sind, sofern keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>

        <h2>9. Ihre Rechte</h2>
        <p>Sie haben gegenüber dem Verantwortlichen folgende Rechte:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde
          (Art. 77 DSGVO), etwa beim Landesbeauftragten für den Datenschutz und die
          Informationsfreiheit Rheinland-Pfalz.
        </p>

        <h2>10. SSL/TLS</h2>
        <p>
          Diese Seite nutzt eine verschlüsselte Verbindung, um die Übertragung vertraulicher
          Inhalte zu schützen.
        </p>
      </article>
    </main>
  );
}
