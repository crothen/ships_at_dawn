<script setup lang="ts">
import type { Project } from '@/types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <router-link
    :to="{ name: 'project', params: { id: project.id } }"
    class="project-card"
  >
    <div class="day-badge">Day {{ project.dayNumber }}</div>
    <div class="thumbnail">
      <img
        :src="`https://img.youtube.com/vi/${project.youtubeId}/mqdefault.jpg`"
        :alt="project.title"
      />
    </div>
    <div class="content">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <div class="tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.project-card {
  display: block;
  background: #1a1a2e;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.day-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ff6b35;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 1;
}

.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: 16px;
}

.content h3 {
  margin: 0 0 8px;
  font-size: 1.1rem;
}

.content p {
  margin: 0 0 12px;
  color: #a0a0a0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: #2a2a4e;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #8888cc;
}
</style>
