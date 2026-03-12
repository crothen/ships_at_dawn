<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="main-nav">
      <RouterLink to="/" class="nav-brand">Ships at Dawn</RouterLink>
      <div class="nav-links">
        <RouterLink to="/">Projects</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  background: #0f0f1a;
  color: #e0e0e0;
  line-height: 1.5;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #1a1a2e;
  border-bottom: 1px solid #2a2a4e;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ff6b35;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  color: #a0a0a0;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #ffffff;
}
</style>
