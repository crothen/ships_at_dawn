<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import YouTubeEmbed from '@/components/YouTubeEmbed.vue'
import { marked } from 'marked'

const route = useRoute()
const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.getProjectById(route.params.id as string))

const renderedReadme = computed(() => {
  if (!project.value?.readme) return ''
  return marked(project.value.readme)
})

onMounted(async () => {
  if (projectsStore.projects.length === 0) {
    await projectsStore.fetchProjects()
  }
})
</script>

<template>
  <div class="project-view">
    <router-link to="/" class="back-link">← Back to all projects</router-link>

    <div v-if="projectsStore.loading" class="loading">Loading...</div>
    <div v-else-if="!project" class="not-found">Project not found</div>
    <template v-else>
      <header class="project-header">
        <span class="day-badge">Day {{ project.dayNumber }}</span>
        <h1>{{ project.title }}</h1>
        <p class="description">{{ project.description }}</p>
        <div class="tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>

      <div class="video-section">
        <YouTubeEmbed :video-id="project.youtubeId" is-short />
      </div>

      <div class="links-section">
        <a
          v-if="project.prototypeUrl"
          :href="project.prototypeUrl"
          target="_blank"
          rel="noopener"
          class="link-button primary"
        >
          🚀 Try the Prototype
        </a>
        <a
          v-if="project.githubPath"
          :href="`https://github.com/crothen/ships_at_dawn/tree/main/${project.githubPath}`"
          target="_blank"
          rel="noopener"
          class="link-button"
        >
          📂 View Source
        </a>
      </div>

      <div v-if="renderedReadme" class="readme-section">
        <h2>Documentation</h2>
        <div class="readme-content" v-html="renderedReadme"></div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.project-view {
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

.project-header {
  margin-bottom: 32px;
}

.day-badge {
  display: inline-block;
  background: #ff6b35;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.project-header h1 {
  font-size: 2.5rem;
  margin: 0 0 16px;
}

.description {
  font-size: 1.1rem;
  color: #a0a0a0;
  line-height: 1.6;
  margin: 0 0 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #2a2a4e;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.85rem;
  color: #8888cc;
}

.video-section {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.links-section {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.link-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  background: #2a2a4e;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
}

.link-button:hover {
  background: #3a3a6e;
}

.link-button.primary {
  background: #ff6b35;
}

.link-button.primary:hover {
  background: #ff8555;
}

.loading,
.not-found {
  text-align: center;
  padding: 60px 20px;
  color: #a0a0a0;
}

.readme-section {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #2a2a4e;
}

.readme-section h2 {
  font-size: 1.5rem;
  margin: 0 0 24px;
  color: #e0e0e0;
}

.readme-content {
  line-height: 1.7;
  color: #c0c0c0;
}

.readme-content :deep(h1),
.readme-content :deep(h2),
.readme-content :deep(h3) {
  color: #e0e0e0;
  margin-top: 24px;
  margin-bottom: 12px;
}

.readme-content :deep(h1) { font-size: 1.8rem; }
.readme-content :deep(h2) { font-size: 1.4rem; }
.readme-content :deep(h3) { font-size: 1.2rem; }

.readme-content :deep(p) {
  margin: 0 0 16px;
}

.readme-content :deep(code) {
  background: #1a1a2e;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

.readme-content :deep(pre) {
  background: #1a1a2e;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0 0 16px;
}

.readme-content :deep(pre code) {
  background: none;
  padding: 0;
}

.readme-content :deep(ul),
.readme-content :deep(ol) {
  margin: 0 0 16px;
  padding-left: 24px;
}

.readme-content :deep(li) {
  margin-bottom: 8px;
}

.readme-content :deep(a) {
  color: #8888cc;
}

.readme-content :deep(a:hover) {
  color: #aaaaee;
}

.readme-content :deep(blockquote) {
  border-left: 3px solid #ff6b35;
  margin: 0 0 16px;
  padding-left: 16px;
  color: #a0a0a0;
  font-style: italic;
}
</style>
