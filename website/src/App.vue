<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n, type Locale } from '@/i18n'

const { t, locale, setLocale } = useI18n()
const route = useRoute()

const isHome = computed(() => route.name === 'home')

const languages: Locale[] = ['en', 'de']

const year = new Date().getFullYear()
</script>

<template>
  <div class="app">
    <header class="main-nav">
      <div class="container nav-inner">
        <RouterLink to="/" class="nav-brand">
          <span class="brand-mark" aria-hidden="true"></span>
          Ships at Dawn
        </RouterLink>
        <nav class="nav-links" v-if="isHome">
          <a href="#services">{{ t('nav.services') }}</a>
          <a href="#process">{{ t('nav.process') }}</a>
          <a href="#faq">{{ t('nav.faq') }}</a>
        </nav>
        <div class="nav-actions">
          <div class="lang-switch" role="group" aria-label="Language">
            <button
              v-for="l in languages"
              :key="l"
              type="button"
              :class="{ active: locale === l }"
              @click="setLocale(l)"
            >
              {{ l.toUpperCase() }}
            </button>
          </div>
          <a v-if="isHome" href="#contact" class="btn btn-primary btn-small nav-cta">{{ t('nav.contact') }}</a>
        </div>
      </div>
    </header>

    <RouterView />

    <footer class="footer">
      <div class="container footer-inner">
        <p class="footer-tagline">{{ t('footer.tagline') }}</p>
        <p class="footer-email">
          <a href="mailto:chris@ships-at-dawn.com">chris@ships-at-dawn.com</a>
        </p>
        <p class="footer-meta">© {{ year }} Ships at Dawn. {{ t('footer.rights') }}</p>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --bg: #0b0d14;
  --surface: #12151f;
  --surface-dim: #0e1119;
  --border: #232838;
  --text: #eef0f6;
  --text-muted: #9aa1b5;
  --accent: #ff6b35;
  --accent-soft: #ffb289;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Buttons */
.btn {
  display: inline-block;
  font: inherit;
  font-weight: 600;
  text-decoration: none;
  border-radius: 12px;
  padding: 14px 28px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s, border-color 0.15s;
}

.btn-primary {
  background: linear-gradient(120deg, var(--accent), #ff8f5c);
  color: #16100c;
  box-shadow: 0 4px 24px rgba(255, 107, 53, 0.25);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.35);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: wait;
  transform: none;
}

.btn-ghost {
  color: var(--text);
  border-color: var(--border);
  background: transparent;
}

.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent-soft);
}

.btn-small {
  padding: 9px 18px;
  font-size: 0.9rem;
  border-radius: 10px;
}

/* Nav */
.main-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11, 13, 20, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 64px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
}

.brand-mark {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, var(--accent-soft), var(--accent));
  box-shadow: 0 0 12px rgba(255, 107, 53, 0.6);
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--text);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.lang-switch {
  display: flex;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.lang-switch button {
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  background: transparent;
  color: var(--text-muted);
  border: none;
  padding: 7px 12px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.lang-switch button.active {
  background: var(--accent);
  color: #16100c;
}

.lang-switch button:not(.active):hover {
  color: var(--text);
}

@media (max-width: 720px) {
  .nav-links {
    display: none;
  }
}

@media (max-width: 420px) {
  .nav-cta {
    display: none;
  }
}

/* Footer */
.footer {
  border-top: 1px solid var(--border);
  padding: 48px 0;
  background: var(--surface-dim);
}

.footer-inner {
  text-align: center;
}

.footer-tagline {
  margin: 0 0 8px;
  color: var(--text-muted);
}

.footer-email {
  margin: 0 0 8px;
}

.footer-email a {
  color: var(--accent-soft);
  text-decoration: none;
  font-weight: 600;
}

.footer-email a:hover {
  text-decoration: underline;
}

.footer-meta {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-muted);
  opacity: 0.7;
}
</style>
