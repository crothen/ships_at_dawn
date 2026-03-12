<script setup lang="ts">
import { onMounted } from 'vue'
import { useProjectsStore } from '@/stores/projects'
import ProjectCard from '@/components/ProjectCard.vue'

const projectsStore = useProjectsStore()

onMounted(() => {
  projectsStore.fetchProjects()
})
</script>

<template>
  <div class="home">
    <header class="hero">
      <h1>Ships at Dawn</h1>
      <p class="tagline">Daily prototypes. Ship fast, learn faster.</p>
    </header>

    <main class="projects-section">
      <div v-if="projectsStore.loading" class="loading">Loading projects...</div>
      <div v-else-if="projectsStore.error" class="error">{{ projectsStore.error }}</div>
      <div v-else-if="projectsStore.publishedProjects.length === 0" class="empty">
        No projects yet. Check back soon!
      </div>
      <div v-else class="projects-grid">
        <ProjectCard
          v-for="project in projectsStore.publishedProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  text-align: center;
  padding: 80px 20px 60px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.hero h1 {
  font-size: 3rem;
  margin: 0 0 16px;
  background: linear-gradient(135deg, #ff6b35, #f7c59f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  font-size: 1.25rem;
  color: #a0a0a0;
  margin: 0;
}

.projects-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 60px 20px;
  color: #a0a0a0;
}

.error {
  color: #ff6b6b;
}
</style>
