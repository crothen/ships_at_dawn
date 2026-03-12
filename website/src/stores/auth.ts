import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { auth, googleProvider } from '@/firebase'

// Admin UIDs - add authorized users here
const ADMIN_UIDS: string[] = [
  // Add Chris's Firebase UID here after first login
]

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value && ADMIN_UIDS.includes(user.value.uid))

  function init() {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  }

  async function loginWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (e) {
      console.error('Login failed:', e)
      throw e
    }
  }

  async function logout() {
    await signOut(auth)
  }

  return {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    init,
    loginWithGoogle,
    logout,
  }
})
