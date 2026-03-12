// Run with: npm run seed
// Make sure you have a .env file with Firebase config

import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'ships-at-dawn',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const mockProjects = [
  {
    dayNumber: 1,
    title: 'Infinite Zoom Map',
    description: 'A prototype for infinitely zoomable fantasy maps using AI-generated images at each level.',
    youtubeId: 'dQw4w9WgXcQ', // placeholder
    prototypeUrl: 'https://example.com/deepmap',
    githubPath: 'prototypes/001-infinite-zoom',
    tags: ['vue', 'firebase', 'ai', 'maps'],
    published: true,
    createdAt: new Date(),
  },
  {
    dayNumber: 2,
    title: 'Voice Chat Interface',
    description: 'Real-time voice chat with AI transcription and response generation.',
    youtubeId: 'dQw4w9WgXcQ', // placeholder
    prototypeUrl: '',
    githubPath: 'prototypes/002-voice-chat',
    tags: ['webrtc', 'ai', 'audio'],
    published: true,
    createdAt: new Date(),
  },
  {
    dayNumber: 3,
    title: 'Card Sorter Vision',
    description: 'Computer vision prototype for sorting Magic: The Gathering cards automatically.',
    youtubeId: 'dQw4w9WgXcQ', // placeholder
    prototypeUrl: '',
    githubPath: 'prototypes/003-card-sorter',
    tags: ['python', 'opencv', 'raspberry-pi'],
    published: false, // draft
    createdAt: new Date(),
  },
]

async function seed() {
  console.log('Seeding projects...')
  
  for (const project of mockProjects) {
    const docRef = await addDoc(collection(db, 'projects'), project)
    console.log(`Added: Day ${project.dayNumber} - ${project.title} (${docRef.id})`)
  }
  
  console.log('Done!')
  process.exit(0)
}

seed().catch(console.error)
