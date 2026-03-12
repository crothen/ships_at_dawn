import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
} from 'firebase/firestore'
import { db } from '@/firebase'
import type { Project } from '@/types'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const publishedProjects = computed(() =>
    projects.value.filter((p) => p.published).sort((a, b) => b.dayNumber - a.dayNumber),
  )

  async function fetchProjects(includeUnpublished = false) {
    loading.value = true
    error.value = null
    try {
      const q = includeUnpublished
        ? query(collection(db, 'projects'), orderBy('dayNumber', 'desc'))
        : query(
            collection(db, 'projects'),
            where('published', '==', true),
            orderBy('dayNumber', 'desc'),
          )

      const snapshot = await getDocs(q)
      projects.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Project[]
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch projects'
    } finally {
      loading.value = false
    }
  }

  async function addProject(project: Omit<Project, 'id'>) {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: new Date(),
    })
    return docRef.id
  }

  async function updateProject(id: string, updates: Partial<Project>) {
    await updateDoc(doc(db, 'projects', id), updates)
  }

  async function deleteProject(id: string) {
    await deleteDoc(doc(db, 'projects', id))
  }

  function getProjectById(id: string) {
    return projects.value.find((p) => p.id === id)
  }

  function getProjectByDay(dayNumber: number) {
    return projects.value.find((p) => p.dayNumber === dayNumber)
  }

  return {
    projects,
    publishedProjects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
    getProjectByDay,
  }
})
