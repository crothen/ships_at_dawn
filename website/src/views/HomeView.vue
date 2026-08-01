<script setup lang="ts">
import { useI18n } from '@/i18n'
import ContactForm from '@/components/ContactForm.vue'

const { t } = useI18n()

const steps = [1, 2, 3, 4] as const
const faqs = [1, 2, 3, 4] as const
const deliverables = [1, 2, 3, 4, 5] as const
</script>

<template>
  <div class="landing">
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <p class="kicker">{{ t('hero.kicker') }}</p>
        <h1>{{ t('hero.title') }}</h1>
        <p class="subtitle">{{ t('hero.subtitle') }}</p>
        <div class="hero-actions">
          <a href="#contact" class="btn btn-primary">{{ t('hero.cta') }}</a>
          <a href="#process" class="btn btn-ghost">{{ t('hero.secondary') }}</a>
        </div>
      </div>
      <div class="hero-glow" aria-hidden="true"></div>
    </section>

    <!-- Value props -->
    <section id="services" class="section">
      <div class="container">
        <h2>{{ t('value.title') }}</h2>
        <div class="card-grid three">
          <div class="card">
            <div class="card-marker">01</div>
            <h3>{{ t('value.speed.title') }}</h3>
            <p>{{ t('value.speed.text') }}</p>
          </div>
          <div class="card">
            <div class="card-marker">02</div>
            <h3>{{ t('value.live.title') }}</h3>
            <p>{{ t('value.live.text') }}</p>
          </div>
          <div class="card">
            <div class="card-marker">03</div>
            <h3>{{ t('value.decide.title') }}</h3>
            <p>{{ t('value.decide.text') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section id="process" class="section section-alt">
      <div class="container">
        <h2>{{ t('process.title') }}</h2>
        <p class="section-subtitle">{{ t('process.subtitle') }}</p>
        <ol class="timeline">
          <li v-for="n in steps" :key="n" class="timeline-step">
            <span class="timeline-dot" aria-hidden="true"></span>
            <span class="timeline-time">{{ t(`process.step${n}.time`) }}</span>
            <h3>{{ t(`process.step${n}.title`) }}</h3>
            <p>{{ t(`process.step${n}.text`) }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Deliverables -->
    <section class="section">
      <div class="container narrow">
        <h2>{{ t('deliver.title') }}</h2>
        <ul class="deliverables">
          <li v-for="n in deliverables" :key="n">
            <span class="check" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2.5 8.5l3.5 3.5 7.5-8" />
              </svg>
            </span>
            {{ t(`deliver.item${n}`) }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Audience -->
    <section class="section section-alt">
      <div class="container">
        <h2>{{ t('audience.title') }}</h2>
        <div class="card-grid three">
          <div class="card">
            <h3>{{ t('audience.founders.title') }}</h3>
            <p>{{ t('audience.founders.text') }}</p>
          </div>
          <div class="card">
            <h3>{{ t('audience.teams.title') }}</h3>
            <p>{{ t('audience.teams.text') }}</p>
          </div>
          <div class="card">
            <h3>{{ t('audience.agencies.title') }}</h3>
            <p>{{ t('audience.agencies.text') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="section">
      <div class="container narrow">
        <h2>{{ t('faq.title') }}</h2>
        <div class="faq-list">
          <details v-for="n in faqs" :key="n" class="faq-item">
            <summary>{{ t(`faq.q${n}`) }}</summary>
            <p>{{ t(`faq.a${n}`) }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section section-contact">
      <div class="container narrow">
        <h2>{{ t('contact.title') }}</h2>
        <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
        <ContactForm />
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing {
  overflow-x: clip;
}

/* Hero */
.hero {
  position: relative;
  text-align: center;
  padding: 110px 0 90px;
}

.hero-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(600px 300px at 50% 110%, rgba(255, 107, 53, 0.18), transparent 70%),
    radial-gradient(900px 400px at 50% -20%, rgba(99, 102, 241, 0.12), transparent 70%);
  z-index: -1;
}

.kicker {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid rgba(255, 107, 53, 0.35);
  background: rgba(255, 107, 53, 0.08);
  border-radius: 999px;
  padding: 8px 18px;
  margin: 0 0 28px;
}

.hero h1 {
  font-size: clamp(2.2rem, 6vw, 3.8rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 auto 24px;
  max-width: 800px;
  background: linear-gradient(120deg, #ffffff 30%, #ffb289 70%, var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.subtitle {
  font-size: clamp(1.05rem, 2.2vw, 1.25rem);
  color: var(--text-muted);
  max-width: 640px;
  margin: 0 auto 40px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Sections */
.section {
  padding: 90px 0;
}

.section-alt {
  background: var(--surface-dim);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.section h2 {
  font-size: clamp(1.6rem, 4vw, 2.3rem);
  letter-spacing: -0.02em;
  margin: 0 0 16px;
  text-align: center;
}

.section-subtitle {
  text-align: center;
  color: var(--text-muted);
  max-width: 560px;
  margin: 0 auto 48px;
}

.card-grid {
  display: grid;
  gap: 24px;
  margin-top: 48px;
}

.card-grid.three {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 800px) {
  .card-grid.three {
    grid-template-columns: 1fr;
  }
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 32px 28px;
  transition: border-color 0.2s, transform 0.2s;
}

.card:hover {
  border-color: rgba(255, 107, 53, 0.4);
  transform: translateY(-3px);
}

.card-marker {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}

.card h3 {
  font-size: 1.15rem;
  margin: 0 0 12px;
}

.card p {
  margin: 0;
  color: var(--text-muted);
}

/* Timeline */
.timeline {
  list-style: none;
  margin: 48px auto 0;
  padding: 0;
  max-width: 640px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), rgba(255, 107, 53, 0.1));
}

.timeline-step {
  position: relative;
  padding: 0 0 48px 44px;
}

.timeline-step:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg);
  border: 3px solid var(--accent);
}

.timeline-time {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-bottom: 6px;
}

.timeline-step h3 {
  margin: 0 0 8px;
  font-size: 1.2rem;
}

.timeline-step p {
  margin: 0;
  color: var(--text-muted);
}

/* Deliverables */
.container.narrow {
  max-width: 680px;
}

.deliverables {
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.deliverables li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px 20px;
  font-size: 1.02rem;
}

.check {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 107, 53, 0.12);
  color: var(--accent);
  margin-top: 1px;
}

/* FAQ */
.faq-list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.faq-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 0 22px;
}

.faq-item summary {
  cursor: pointer;
  font-weight: 600;
  padding: 20px 0;
  list-style: none;
  position: relative;
  padding-right: 32px;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--accent);
  transition: transform 0.2s;
}

.faq-item[open] summary::after {
  transform: translateY(-50%) rotate(45deg);
}

.faq-item p {
  margin: 0;
  padding: 0 0 20px;
  color: var(--text-muted);
}

/* Contact */
.section-contact {
  position: relative;
}

.section-contact::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(700px 350px at 50% 100%, rgba(255, 107, 53, 0.1), transparent 70%);
}

.section-contact .container {
  position: relative;
}

@media (max-width: 600px) {
  .hero {
    padding: 70px 0 60px;
  }

  .section {
    padding: 64px 0;
  }
}
</style>
