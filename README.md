# ROLLIXBOOK — Next.js Sportsbook

Next.js (App Router) conversion of the RollixBook exchange UI.

## Stack

- **Next.js 15** (App Router)
- **React 19**
- White Theme Classic only
- Client-side sportsbook shell (`SportsbookApp`)

## Project structure

```
src/
  app/
    layout.js      # Root layout, fonts, metadata
    page.js        # Home route → SportsbookApp
    globals.css    # Global styles
  components/      # UI (all client components)
  data/            # Mock / media data
  utils/           # Helpers (audio, etc.)
public/            # Static assets
next.config.mjs
```

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Dummy login

- Click **Demo login**, or use `demo` / `demo123`
- Register OTP (demo): `1234`
