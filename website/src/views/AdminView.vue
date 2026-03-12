<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProjectsStore } from '@/stores/projects'
import type { Project } from '@/types'

const authStore = useAuthStore()
const projectsStore = useProjectsStore()

const showForm = ref(false)
const editingId = ref<string | null>(null)
const saving = ref(false)

const form = reactive({
  dayNumber: 1,
  title: '',
  description: '',
  youtubeId: '',
  prototypeUrl: '',
  githubPath: '',
  tags: '',
  published: false,
})

onMounted(async () => {
  authStore.init()
  await projectsStore.fetchProjects(true) // include unpublished
})

function openNewProjectForm() {
  resetForm()
  showForm.value = true
}

function resetForm() {
  form.dayNumber = projectsStore.projects.length + 1
  form.title = ''
  form.description = ''
  form.youtubeId = ''
  form.prototypeUrl = ''
  form.githubPath = ''
  form.tags = ''
  form.published = false
  editingId.value = null
}

function editProject(project: Project) {
  form.dayNumber = project.dayNumber
  form.title = project.title
  form.description = project.description
  form.youtubeId = project.youtubeId
  form.prototypeUrl = project.prototypeUrl || ''
  form.githubPath = project.githubPath || ''
  form.tags = project.tags.join(', ')
  form.published = project.published
  editingId.value = project.id
  showForm.value = true
}

async function saveProject() {
  saving.value = true
  try {
    const projectData = {
      dayNumber: form.dayNumber,
      title: form.title,
      description: form.description,
      youtubeId: form.youtubeId,
      prototypeUrl: form.prototypeUrl || undefined,
      githubPath: form.githubPath || undefined,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      published: form.published,
      createdAt: new Date(),
    }

    if (editingId.value) {
      await projectsStore.updateProject(editingId.value, projectData)
    } else {
      await projectsStore.addProject(projectData)
    }

    await projectsStore.fetchProjects(true)
    showForm.value = false
    resetForm()
  } finally {
    saving.value = false
  }
}

async function deleteProject(id: string) {
  if (confirm('Delete this project?')) {
    await projectsStore.deleteProject(id)
    await projectsStore.fetchProjects(true)
  }
}
</script>

<template>
  <div class="admin-view">
    <h1>Admin</h1>

    <!-- Not logged in -->
    <div v-if="authStore.loading" class="loading">Loading...</div>

    <div v-else-if="!authStore.isAuthenticated" class="login-section">
      <p>Sign in to manage projects</p>
      <button @click="authStore.loginWithGoogle" class="login-button">Sign in with Google</button>
    </div>

    <!-- Logged in but not admin -->
    <div v-else-if="!authStore.isAdmin" class="not-admin">
      <p>Logged in as {{ authStore.user?.email }}</p>
      <p class="uid-display">Your UID: <code>{{ authStore.user?.uid }}</code></p>
      <p class="hint">Add this UID to ADMIN_UIDS in auth.ts to get admin access.</p>
      <button @click="authStore.logout" class="logout-button">Log out</button>
    </div>

    <!-- Admin access -->
    <template v-else>
      <div class="admin-header">
        <p>Logged in as {{ authStore.user?.email }}</p>
        <button @click="authStore.logout" class="logout-button">Log out</button>
      </div>

      <div class="actions">
        <button @click="openNewProjectForm" class="add-button">+ Add Project</button>
      </div>

      <!-- Project Form -->
      <div v-if="showForm" class="form-overlay" @click.self="showForm = false">
        <form class="project-form" @submit.prevent="saveProject">
          <h2>{{ editingId ? 'Edit' : 'Add' }} Project</h2>

          <label>
            Day Number
            <input v-model.number="form.dayNumber" type="number" min="1" required />
          </label>

          <label>
            Title
            <input v-model="form.title" type="text" required />
          </label>

          <label>
            Description
            <textarea v-model="form.description" rows="3" required></textarea>
          </label>

          <label>
            YouTube Video ID
            <input v-model="form.youtubeId" type="text" placeholder="e.g., dQw4w9WgXcQ" required />
          </label>

          <label>
            Prototype URL (optional)
            <input v-model="form.prototypeUrl" type="url" placeholder="https://..." />
          </label>

          <label>
            GitHub Path (optional)
            <input v-model="form.githubPath" type="text" placeholder="prototypes/001-name" />
          </label>

          <label>
            Tags (comma-separated)
            <input v-model="form.tags" type="text" placeholder="vue, firebase, ai" />
          </label>

          <label class="checkbox">
            <input v-model="form.published" type="checkbox" />
            Published
          </label>

          <div class="form-actions">
            <button type="button" @click="showForm = false" class="cancel-button">Cancel</button>
            <button type="submit" :disabled="saving" class="save-button">
              {{ saving ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Projects List -->
      <div class="projects-list">
        <div
          v-for="project in projectsStore.projects"
          :key="project.id"
          class="project-item"
          :class="{ unpublished: !project.published }"
        >
          <div class="project-info">
            <span class="day">Day {{ project.dayNumber }}</span>
            <span class="title">{{ project.title }}</span>
            <span v-if="!project.published" class="draft-badge">Draft</span>
          </div>
          <div class="project-actions">
            <button @click="editProject(project)" class="edit-btn">Edit</button>
            <button @click="deleteProject(project.id)" class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.admin-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  margin-bottom: 24px;
}

.loading {
  color: #a0a0a0;
}

.login-section,
.not-admin {
  text-align: center;
  padding: 60px 20px;
}

.login-button {
  background: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.uid-display {
  margin: 16px 0;
}

.uid-display code {
  background: #2a2a4e;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
}

.hint {
  color: #888;
  font-size: 0.9rem;
}

.logout-button {
  background: #444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #333;
}

.actions {
  margin-bottom: 24px;
}

.add-button {
  background: #ff6b35;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.form-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.project-form {
  background: #1a1a2e;
  padding: 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.project-form h2 {
  margin: 0 0 24px;
}

.project-form label {
  display: block;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #a0a0a0;
}

.project-form input,
.project-form textarea {
  display: block;
  width: 100%;
  margin-top: 6px;
  padding: 10px 12px;
  background: #2a2a4e;
  border: 1px solid #3a3a5e;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
}

.project-form label.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: row;
}

.project-form label.checkbox input {
  width: auto;
  margin: 0;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.cancel-button {
  flex: 1;
  padding: 12px;
  background: #444;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.save-button {
  flex: 1;
  padding: 12px;
  background: #ff6b35;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.save-button:disabled {
  opacity: 0.6;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #1a1a2e;
  border-radius: 8px;
}

.project-item.unpublished {
  opacity: 0.7;
}

.project-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.day {
  background: #ff6b35;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.draft-badge {
  background: #666;
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
}

.project-actions {
  display: flex;
  gap: 8px;
}

.edit-btn,
.delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.edit-btn {
  background: #3a3a6e;
  color: white;
}

.delete-btn {
  background: #6e3a3a;
  color: white;
}
</style>
