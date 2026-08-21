# robtiel.de

Hardtekk. Industrial. Raw. — Website von Robtiel.

Produktion über **Cloudflare Workers**, Code in diesem Repo.

## Cloudflare (GitHub → Domain)

Die Domain `robtiel.de` liegt schon bei Cloudflare. Die drei Apps bleiben auf ihren Workern; diese Seite wird der neue Worker für die **Startseite**.

### 1. Worker aus diesem Repo

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Import a repository**
2. Account **Robtiel-kotworker**, Repo **robtiel.de**, Branch `main`
3. Build-Einstellungen:

   | Feld | Wert |
   |---|---|
   | Build command | `npm run build:cf` |
   | Deploy command | `npx wrangler deploy` |
   | Root directory | `/` |
   | Node.js | `22` |

4. **Save and Deploy**

Der Worker heißt `robtiel-de` und ist danach unter `robtiel-de.*.workers.dev` erreichbar.

### 2. Domain verbinden

1. Im Worker **robtiel-de** → **Settings** → **Domains & Routes** → **Add** → **Custom domain**
2. `robtiel.de` eintragen (optional extra `www.robtiel.de`)
3. Cloudflare legt den DNS-Eintrag selbst an — **kein** CNAME per Hand nötig, wenn die Domain schon auf Cloudflare ist.

**Achtung:** `robtiel.de` zeigt aktuell auf Hardtekkmon. Sobald du die Custom Domain hier zuweist, ist die Startseite diese Website. Hardtekkmon bleibt über den bestehenden Worker / `workers.dev`-Link erreichbar.

Falls die Domain schon an einen anderen Worker gebunden ist: dort unter Domains **entfernen**, dann hier hinzufügen.

### 3. Checkliste

- [ ] `robtiel-de.*.workers.dev` lädt Home, Feed, Apps
- [ ] Cube Timer / Brettanien / Hardtekkmon öffnen sich in einem neuen Tab
- [ ] SoundCloud-Player im Feed spielt
- [ ] Impressum + Datenschutz sichtbar
- [ ] `robtiel.de` zeigt diese Seite (SSL automatisch)

## Deploy per CLI

```bash
npm install
npm run build:cf
npx wrangler deploy
```
