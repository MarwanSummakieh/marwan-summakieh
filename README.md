# MarwanOS — marwansummakieh.com

Portfolio of Marwan Summakieh, branded around the wildstyle **MARWAN OS** graffiti piece (source: `public/brand/marwanos-tag.webp`, exported from `MarwanOS.psd`).

## Site map

- `/` — the wall: hero with the piece, **Fresh Paint** (2026 work), back catalog, paid work, contact band.
- `/work` — every project grouped by shelf (Systems/OS · Software · Games & VR · Research) plus client case files and work history.
- `/devlog` — the **Blackbook**: one entry per unique repository, newest first. `/devlog/[slug]` opens a dossier (focus, milestones, stack, source, media).
- `/contact`
- `/software`, `/games`, `/about`, `/projects`, `/tools` redirect to `/work`.
- Optional AI assistant drawer ("Ask the wall") backed by `app/api/chat`.

## Content

All copy is structured data:

- `lib/gameJourney.ts` — `gameProjects`: every piece. Fields: `category`, `year`, `fresh` (surfaces on the home wall), `hook`, `image`, `note`, `links`.
- `lib/profile.ts` — name, tagline, availability, experience, client case files, contact/socials.
- `app/api/chat/marwan-context.txt` — the assistant's knowledge; keep in sync when adding pieces.

To add a project: append to `gameProjects`, set `category`/`year`, add a GitHub link (that's what puts it in the Blackbook), optionally `fresh: true` and an image under `public/work/`.

## Brand system

Tokens live in `app/globals.css` (`--tag` neon green, `--violet`, `--pink`, `--peach`, `--sky`, `--chalk`, `--concrete`) and are exposed to Tailwind in `tailwind.config.ts`. Reusable classes: `.piece` (halo + black stroke card), `.sticker`, `.marble` / `.marble-text`, `.outline-text`, `.splat`, `.drips`, `.btn-tag` / `.btn-ghost`, `.chip`. Display type is Bangers, annotations are Permanent Marker, body is Geist. Shared components: `components/brand/`.

## Tech Stack

- Next.js App Router (16) with TypeScript and Tailwind CSS.
- Framer Motion for the chat drawer.
- Vercel KV and Upstash rate limiting for the chat endpoint.

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 after the server starts. Update structured content in the files under `lib/` to change copy globally.

Leave the KV values empty for local testing to bypass rate limiting.

## Deployment

The site is deployed on Vercel. Pushes to `main` trigger production builds. Verify the chat route before shipping by running `npm run build`.
