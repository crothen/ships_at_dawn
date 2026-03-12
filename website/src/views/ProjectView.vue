<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'
import YouTubeEmbed from '@/components/YouTubeEmbed.vue'

const route = useRoute()
const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.getProjectById(route.params.id as string))

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
</style>
