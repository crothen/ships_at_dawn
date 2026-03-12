<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const setupContent = `# Ships at Dawn — Prototype Setup & Instructions

> **Internal docs for Niv.** Read this first when starting any new build.

## Project Structure

\`\`\`
ships_at_dawn/
├── website/              # Landing page + admin (Vue 3, Firebase Hosting)
├── prototypes/           # All prototype code lives here
│   ├── 001-name/
│   ├── 002-name/
│   └── ...
├── PROTOTYPES.md         # Index of all prototypes (keep updated)
└── README.md             # Public repo landing page
\`\`\`

## Starting a New Prototype

### 1. Create the folder

\`\`\`bash
cd prototypes
mkdir XXX-project-name    # e.g., 001-infinite-zoom
cd XXX-project-name
\`\`\`

### 2. Set up React (default)

**Default stack is React + TypeScript** (unless Chris says otherwise):

\`\`\`bash
npm create vite@latest . -- --template react-ts
npm install
\`\`\`

**Alternative — Vanilla (if specified):**
\`\`\`bash
npm create vite@latest . -- --template vanilla-ts
npm install
\`\`\`

### 3. Environment variables

Create \`.env\` for local dev (gitignored) and \`.env.example\` for reference:

\`\`\`env
# .env.example - commit this, not .env!
VITE_API_KEY=your_key_here
\`\`\`

⚠️ **NEVER commit actual secrets** — this is a public repo.

### 4. Firebase (if needed)

All prototypes share the \`ships-at-dawn\` Firebase project:
- **Project ID:** ships-at-dawn
- **Firestore DB:** ships-at-dawn (named database)
- **Auth:** Google provider enabled
- **Hosting:** Main site only; prototypes host elsewhere or embed

To use Firestore in a prototype:
\`\`\`ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({ projectId: 'ships-at-dawn', /* ... */ })
const db = getFirestore(app, 'ships-at-dawn')  // Named database!
\`\`\`

### 5. Add to admin

Once ready, add the prototype via https://ships-at-dawn.web.app/admin:
- Day number, title, description
- YouTube video ID (after recording)
- Prototype URL (if hosted)
- GitHub path: \`prototypes/XXX-name\`
- Tags
- README (for public docs on website)

### 6. Update PROTOTYPES.md

Add entry to the index table so Niv can track it.

---

## Conventions

- **Folder naming:** \`XXX-short-name\` (e.g., \`001-infinite-zoom\`)
- **Keep it standalone:** Each prototype should run independently
- **Minimal deps:** Prefer lightweight solutions
- **Fast iteration:** Done > perfect

## Common Commands

\`\`\`bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
\`\`\`

## For Niv

When Chris says "let's build X":
1. Read this file first
2. Check PROTOTYPES.md for existing work
3. Create new folder in prototypes/
4. Instructions come from Discord — build from there
5. Update PROTOTYPES.md when done
`

const renderedContent = computed(() => marked(setupContent))
</script>

<template>
  <div class="setup-view">
    <router-link to="/" class="back-link">← Back to projects</router-link>
    <div class="setup-content" v-html="renderedContent"></div>
  </div>
</template>

<style scoped>
.setup-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.back-link {
  display: inline-block;
  color: #8888cc;
  text-decoration: none;
  margin-bottom: 24px;
}

.back-link:hover {
  color: #aaaaee;
}

.setup-content {
  line-height: 1.7;
  color: #c0c0c0;
}

.setup-content :deep(h1) {
  font-size: 2rem;
  color: #e0e0e0;
  margin-bottom: 8px;
}

.setup-content :deep(h2) {
  font-size: 1.5rem;
  color: #e0e0e0;
  margin-top: 32px;
  margin-bottom: 16px;
  padding-top: 16px;
  border-top: 1px solid #2a2a4e;
}

.setup-content :deep(h3) {
  font-size: 1.2rem;
  color: #e0e0e0;
  margin-top: 24px;
  margin-bottom: 12px;
}

.setup-content :deep(p) {
  margin: 0 0 16px;
}

.setup-content :deep(blockquote) {
  border-left: 3px solid #ff6b35;
  margin: 0 0 16px;
  padding-left: 16px;
  color: #a0a0a0;
  font-style: italic;
}

.setup-content :deep(code) {
  background: #1a1a2e;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

.setup-content :deep(pre) {
  background: #1a1a2e;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0 0 16px;
}

.setup-content :deep(pre code) {
  background: none;
  padding: 0;
}

.setup-content :deep(ul),
.setup-content :deep(ol) {
  margin: 0 0 16px;
  padding-left: 24px;
}

.setup-content :deep(li) {
  margin-bottom: 8px;
}

.setup-content :deep(strong) {
  color: #e0e0e0;
}

.setup-content :deep(hr) {
  border: none;
  border-top: 1px solid #2a2a4e;
  margin: 32px 0;
}
</style>
