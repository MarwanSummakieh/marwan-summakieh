# marwansummakieh.com

Portfolio of Marwan Summakieh, branded around his wildstyle **MARWAN** graffiti piece (source: `public/brand/marwanos-tag.webp`, exported from `MarwanOS.psd`).

## Site map

- `/` — hero with the piece, current (2026) work, older projects, experience, contact.
- `/work` — every project grouped by type (Systems/OS · Software · Games & VR · Research) plus client case files and work history.
- `/devlog` — one entry per repository, newest first. `/devlog/[slug]` opens a detail page (focus, milestones, stack, source, media).
- `/contact`
- `/software`, `/games`, `/about`, `/projects`, `/tools` redirect to `/work`.
- Optional AI assistant drawer ("Ask me anything") backed by `app/api/chat`.

## Content

All copy is structured data:

- `lib/gameJourney.ts` — `gameProjects`: every project. Fields: `category`, `year`, `fresh` (surfaces on the home page), `hook`, `image`, `note`, `links`.
- `lib/profile.ts` — name, tagline, availability, experience, client case files, contact/socials.
- `app/api/chat/marwan-context.txt` — the assistant's knowledge; keep in sync when adding pieces.

Copy tone: plain and conversational — no themed jargon. To add a project: append to `gameProjects`, set `category`/`year`, add a GitHub link (that's what lists it in the devlog), optionally `fresh: true` and an image under `public/work/`.

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
