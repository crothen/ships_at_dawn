# Ships at Dawn — Prototype Setup & Instructions

> Universal guide for all prototypes. Niv: read this first when starting any new build.

## Project Structure

```
ships_at_dawn/
├── website/              # Landing page + admin (Vue 3, Firebase Hosting)
├── prototypes/           # All prototype code lives here
│   ├── 001-name/
│   ├── 002-name/
│   └── ...
├── PROTOTYPES.md         # Index of all prototypes (keep updated)
└── README.md             # Public repo landing page
```

## Starting a New Prototype

### 1. Create the folder

```bash
cd prototypes
mkdir XXX-project-name    # e.g., 001-infinite-zoom
cd XXX-project-name
```

### 2. Choose your stack

**Quick Vue 3 setup:**
```bash
npm create vue@latest . -- --typescript
npm install
```

**Quick Vite + Vanilla:**
```bash
npm create vite@latest . -- --template vanilla-ts
npm install
```

### 3. Environment variables

Create `.env` for local dev (gitignored) and `.env.example` for reference:

```env
# .env.example - commit this, not .env!
VITE_API_KEY=your_key_here
```

⚠️ **NEVER commit actual secrets** — this is a public repo.

### 4. Firebase (if needed)

All prototypes share the `ships-at-dawn` Firebase project:
- **Project ID:** ships-at-dawn
- **Firestore DB:** ships-at-dawn (named database)
- **Auth:** Google provider enabled
- **Hosting:** Main site only; prototypes host elsewhere or embed

To use Firestore in a prototype:
```ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({ projectId: 'ships-at-dawn', /* ... */ })
const db = getFirestore(app, 'ships-at-dawn')  // Named database!
```

### 5. Add to admin

Once ready, add the prototype via https://ships-at-dawn.web.app/admin:
- Day number, title, description
- YouTube video ID (after recording)
- Prototype URL (if hosted)
- GitHub path: `prototypes/XXX-name`
- Tags
- README (for public docs on website)

### 6. Update PROTOTYPES.md

Add entry to the index table so Niv can track it.

---

## Conventions

- **Folder naming:** `XXX-short-name` (e.g., `001-infinite-zoom`)
- **Keep it standalone:** Each prototype should run independently
- **Minimal deps:** Prefer lightweight solutions
- **Fast iteration:** Done > perfect

## Common Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## For Niv

When Chris says "let's build X":
1. Read this file first
2. Check PROTOTYPES.md for existing work
3. Create new folder in prototypes/
4. Instructions come from Discord — build from there
5. Update PROTOTYPES.md when done
