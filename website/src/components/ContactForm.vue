<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/i18n'

const { t, locale } = useI18n()

const name = ref('')
const email = ref('')
const company = ref('')
const message = ref('')
const website = ref('') // honeypot, stays empty for humans

const status = ref<'idle' | 'sending' | 'success' | 'error' | 'invalid'>('idle')

async function submit() {
  if (website.value) return // bot caught by honeypot
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    status.value = 'invalid'
    return
  }
  status.value = 'sending'
  try {
    // Firebase is loaded on demand so the landing page never depends on it
    const [{ addDoc, collection, serverTimestamp }, { db }] = await Promise.all([
      import('firebase/firestore'),
      import('@/firebase'),
    ])
    await addDoc(collection(db, 'inquiries'), {
      name: name.value.trim(),
      email: email.value.trim(),
      company: company.value.trim(),
      message: message.value.trim(),
      locale: locale.value,
      createdAt: serverTimestamp(),
    })
    status.value = 'success'
    name.value = ''
    email.value = ''
    company.value = ''
    message.value = ''
  } catch (e) {
    console.error('Contact form submission failed', e)
    status.value = 'error'
  }
}
</script>

<template>
  <form class="contact-form" novalidate @submit.prevent="submit">
    <div class="form-row">
      <div class="form-field">
        <label for="cf-name">{{ t('contact.name') }} *</label>
        <input id="cf-name" v-model="name" type="text" name="name" autocomplete="name" required />
      </div>
      <div class="form-field">
        <label for="cf-email">{{ t('contact.email') }} *</label>
        <input id="cf-email" v-model="email" type="email" name="email" autocomplete="email" required />
      </div>
    </div>
    <div class="form-field">
      <label for="cf-company">{{ t('contact.company') }}</label>
      <input id="cf-company" v-model="company" type="text" name="company" autocomplete="organization" />
    </div>
    <div class="form-field">
      <label for="cf-message">{{ t('contact.message') }} *</label>
      <textarea
        id="cf-message"
        v-model="message"
        name="message"
        rows="5"
        :placeholder="t('contact.messagePlaceholder')"
        required
      ></textarea>
    </div>
    <div class="honeypot" aria-hidden="true">
      <label for="cf-website">Website</label>
      <input id="cf-website" v-model="website" type="text" name="website" tabindex="-1" autocomplete="off" />
    </div>

    <p v-if="status === 'invalid'" class="form-note error">{{ t('contact.required') }}</p>
    <p v-if="status === 'error'" class="form-note error">{{ t('contact.error') }}</p>
    <p v-if="status === 'success'" class="form-note success">{{ t('contact.success') }}</p>

    <button v-if="status !== 'success'" class="btn btn-primary" type="submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? t('contact.sending') : t('contact.submit') }}
    </button>
  </form>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-muted);
}

input,
textarea {
  font: inherit;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.form-note {
  margin: 0;
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
}

.form-note.error {
  background: rgba(255, 92, 92, 0.1);
  border: 1px solid rgba(255, 92, 92, 0.35);
  color: #ff9d9d;
}

.form-note.success {
  background: rgba(90, 220, 150, 0.1);
  border: 1px solid rgba(90, 220, 150, 0.35);
  color: #8fe6b5;
}
</style>
