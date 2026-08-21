# robtiel.de

Hardtekk. Dark Techno. Gabber. — Website von Robtiel.

Repo: https://github.com/Robtiel-kotworker/robtiel.de

Produktion über **Cloudflare Workers**. Die drei Games bleiben auf ihren eigenen Workern (`*.workers.dev`).

## Bilder (einmalig)

Badge + Wordmark sind schon im Repo. Die großen Fotos (Hero, Bunker, App-Karten) am besten so hochladen:

1. Im Repo auf **Add file → Upload files**
2. Diese Dateien nach `public/brand/` ziehen:
   - `hero.jpg`
   - `bunker.jpg`
   - `cube.jpg`
   - `brettanien.jpg`
   - `hardtekkmon.jpg`
3. Optional `og.jpg` nach `public/`
4. Commit auf `main`

Ohne die Fotos läuft die Seite trotzdem — nur dunkler, ohne Bunker/Hero-Bild.

## 1. Worker aus diesem Repo

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Import a repository**
2. GitHub **Robtiel-kotworker**, Repo **robtiel.de**, Branch `main`
3. Build-Einstellungen (Node musst du **nicht** eintragen — steht im Repo als `.nvmrc`):

   | Feld | Wert |
   |---|---|
   | Build command | `npm run build:cf` |
   | Deploy command | `npx wrangler deploy` |
   | Root directory | `/` |

   Gibt es kein Feld „Node.js“: einfach leer lassen / überspringen.
   Optional später: Worker → **Settings** → **Build** → **Build Variables and Secrets** → Variable `NODE_VERSION` = `22`

4. **Save and Deploy**

Der Worker heißt `robtiel-de` und ist danach unter `robtiel-de.<dein-account>.workers.dev` erreichbar.

## 2. Domain verbinden

**Zuerst** `robtiel.de` vom Hardtekkmon-Worker lösen:

1. Cloudflare → Workers → der Hardtekkmon-Worker
2. **Settings** → **Domains & Routes** → `robtiel.de` → **Remove**

Sonst lässt Cloudflare die Domain nicht einem zweiten Worker zuweisen. Hardtekkmon bleibt über
https://hardtekkmon---rote-chupa-chups.robtiel-kotworker.workers.dev erreichbar.

Dann:

1. Worker **robtiel-de** → **Settings** → **Domains & Routes** → **Add** → **Custom domain**
2. `robtiel.de` eintragen (optional extra `www.robtiel.de`)
3. DNS legt Cloudflare selbst an — kein CNAME per Hand nötig, wenn die Domain schon auf Cloudflare ist.

SSL kommt automatisch.

## 3. Checkliste

- [ ] `robtiel-de.*.workers.dev` lädt Home, Feed, Apps
- [ ] Cube Timer / Brettanien / Hardtekkmon öffnen sich in einem neuen Tab
- [ ] SoundCloud-Player im Feed spielt
- [ ] Impressum + Datenschutz sichtbar
- [ ] `robtiel.de` zeigt diese Seite, nicht mehr Hardtekkmon

## Games (bleiben wo sie sind)

| App | URL |
|---|---|
| Cube Timer Online | https://cube-timer-online.robtiel-kotworker.workers.dev |
| Way to Brettanien | https://tamagotchi.robtiel-kotworker.workers.dev |
| Hardtekkmon | https://hardtekkmon---rote-chupa-chups.robtiel-kotworker.workers.dev |

## Lokal (optional)

```bash
npm install
npm run build:cf
npx wrangler deploy
```
