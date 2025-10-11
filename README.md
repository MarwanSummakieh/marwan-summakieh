# Marwan Summakieh Digital Space

This repository contains the source for marwansummakieh.com, a human-centered AI portfolio that documents current research, front-end engagements, and contact pathways.

## Site Highlights

- Overview landing page that introduces current availability, mission, and recent impact highlights.
- Dedicated sections for Projects, Toolkit, and About, each backed by structured content in `lib/profile.ts` and `lib/gameJourney.ts`.
- Contact page with direct channels and curated social links.
- Optional AI assistant (drawer) that answers questions using the persona defined in `app/api/chat`.

## Tech Stack

- Next.js App Router with TypeScript and Tailwind CSS styling.
- Framer Motion for interactive elements and animations.
- Vercel KV and Upstash rate limiting for the chat endpoint.
- Session storage persistence for chat history on the client.

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 after the server starts. Update structured content in the files under `lib/` to change copy globally.

Leave the KV values empty for local testing to bypass rate limiting.

## Deployment

The site is deployed on Vercel. Pushes to `main` trigger production builds. Verify the chat route before shipping by running `npm run build`.
