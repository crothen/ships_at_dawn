import { ref, computed } from 'vue'

export type Locale = 'en' | 'de'

const STORAGE_KEY = 'sad_locale'

function detectLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'de') return stored
  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'
}

const locale = ref<Locale>(detectLocale())

const messages: Record<Locale, Record<string, string>> = {
  en: {
    'meta.title': 'Ships at Dawn | From Concept to Shipped MVP in One Day',
    'meta.description':
      'Rapid prototyping as a service. You bring the idea in the morning, by evening it is live on a real URL. One day from concept to deployed MVP.',

    'nav.services': 'What you get',
    'nav.process': 'How it works',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',

    'hero.kicker': 'Rapid prototyping as a service',
    'hero.title': 'From concept to shipped MVP in one day.',
    'hero.subtitle':
      'You bring the idea in the morning. By evening it is live: a working prototype, deployed on a real URL, ready to put in front of users, investors or your team.',
    'hero.cta': 'Start your prototype',
    'hero.secondary': 'See how it works',

    'value.title': 'Why one day changes everything',
    'value.speed.title': 'One day, not one quarter',
    'value.speed.text':
      'Most ideas die in backlogs and slide decks. A focused day of building gets you something real while the momentum is still there.',
    'value.live.title': 'Live on a real URL',
    'value.live.text':
      'No mockups, no clickdummies. Your prototype is deployed and shipped. Share the link with anyone, on any device, the same evening.',
    'value.decide.title': 'Decide with evidence',
    'value.decide.text':
      'Test the idea with real users before you invest months of budget. Learn fast, then double down or move on with confidence.',

    'process.title': 'How it works',
    'process.subtitle': 'A single focused day, from first call to live product.',
    'process.step1.time': 'Morning',
    'process.step1.title': 'Kickoff',
    'process.step1.text':
      'We talk for 30 minutes and cut your idea down to its core: the one thing the prototype has to prove.',
    'process.step2.time': 'Daytime',
    'process.step2.title': 'Build',
    'process.step2.text':
      'I design and build the essentials: clean interface, working logic, real data where it matters. You get progress updates along the way.',
    'process.step3.time': 'Evening',
    'process.step3.title': 'Ship',
    'process.step3.text':
      'The prototype goes live on a real URL with hosting set up. Mobile friendly, fast and shareable.',
    'process.step4.time': 'Wrap up',
    'process.step4.title': 'Handover',
    'process.step4.text':
      'You get the link, the source code and a short walkthrough. Plus a clear recommendation on what to do next.',

    'deliver.title': 'What you get',
    'deliver.item1': 'A working web app, deployed and live on a real URL',
    'deliver.item2': 'Modern, mobile friendly design',
    'deliver.item3': 'Full source code, yours to keep',
    'deliver.item4': 'A walkthrough and honest advice on next steps',
    'deliver.item5': 'Optional iteration days to grow the prototype into a product',

    'audience.title': 'Built for people who move fast',
    'audience.founders.title': 'Founders',
    'audience.founders.text':
      'Validate your startup idea with something real before raising or building a team.',
    'audience.teams.title': 'Product teams',
    'audience.teams.text':
      'Turn an internal pitch into a working demo that wins the room and unlocks budget.',
    'audience.agencies.title': 'Agencies and consultants',
    'audience.agencies.text':
      'Impress clients with a live proof of concept instead of another slide deck.',

    'faq.title': 'Frequently asked questions',
    'faq.q1': 'What can realistically be built in one day?',
    'faq.a1':
      'A focused web app that proves your core idea: a landing page with real functionality, a marketplace flow, a booking tool, a dashboard, an AI powered feature. The scope is cut to what matters, and that is exactly the point.',
    'faq.q2': 'What do you need from me?',
    'faq.a2':
      'Your idea, 30 minutes for the kickoff call, and availability for quick questions during the day. Everything else is my job.',
    'faq.q3': 'What does it cost?',
    'faq.a3':
      'A fixed price per prototype day, agreed upfront before we start. No surprises. Send a message and I will get back to you with details.',
    'faq.q4': 'What happens after day one?',
    'faq.a4':
      'The prototype is yours, including the code. If it works, we can book iteration days to extend it, or you take it to your own team. No lock in.',

    'contact.title': 'Tell me about your idea',
    'contact.subtitle':
      'A few sentences are enough. I reply within 24 hours with a proposal and the next free prototype day.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.company': 'Company (optional)',
    'contact.message': 'What should the prototype prove?',
    'contact.messagePlaceholder': 'Describe your idea in a few sentences...',
    'contact.submit': 'Send inquiry',
    'contact.sending': 'Sending...',
    'contact.success': 'Thank you. Your inquiry has been received and I will get back to you within 24 hours.',
    'contact.error': 'Something went wrong. Please try again or reach out directly.',
    'contact.required': 'Please fill in all required fields.',
    'contact.direct': 'Prefer email? Write me directly at',

    'footer.tagline': 'Rapid prototypes. Concept to MVP, deployed and shipped in one day.',
    'footer.rights': 'All rights reserved.',
  },
  de: {
    'meta.title': 'Ships at Dawn | Vom Konzept zum fertigen MVP in einem Tag',
    'meta.description':
      'Rapid Prototyping als Service. Morgens bringst du die Idee, abends ist sie live auf einer echten URL. Ein Tag vom Konzept zum deployten MVP.',

    'nav.services': 'Leistungen',
    'nav.process': 'Ablauf',
    'nav.faq': 'FAQ',
    'nav.contact': 'Kontakt',

    'hero.kicker': 'Rapid Prototyping als Service',
    'hero.title': 'Vom Konzept zum fertigen MVP in einem Tag.',
    'hero.subtitle':
      'Morgens bringst du die Idee. Abends ist sie live: ein funktionierender Prototyp, deployed auf einer echten URL, bereit für Nutzer, Investoren oder dein Team.',
    'hero.cta': 'Prototyp starten',
    'hero.secondary': 'So funktioniert es',

    'value.title': 'Warum ein Tag alles verändert',
    'value.speed.title': 'Ein Tag statt ein Quartal',
    'value.speed.text':
      'Die meisten Ideen sterben in Backlogs und Folien. Ein fokussierter Tag bringt dir etwas Echtes, solange der Schwung noch da ist.',
    'value.live.title': 'Live auf einer echten URL',
    'value.live.text':
      'Keine Mockups, keine Klickdummies. Dein Prototyp ist deployed und online. Teile den Link noch am selben Abend, auf jedem Gerät.',
    'value.decide.title': 'Entscheiden mit Fakten',
    'value.decide.text':
      'Teste die Idee mit echten Nutzern, bevor du Monate an Budget investierst. Schnell lernen, dann mit Sicherheit weitermachen oder loslassen.',

    'process.title': 'So funktioniert es',
    'process.subtitle': 'Ein fokussierter Tag, vom ersten Gespräch bis zum Livegang.',
    'process.step1.time': 'Morgens',
    'process.step1.title': 'Kickoff',
    'process.step1.text':
      'Wir sprechen 30 Minuten und reduzieren deine Idee auf den Kern: das Eine, das der Prototyp beweisen muss.',
    'process.step2.time': 'Tagsüber',
    'process.step2.title': 'Bauen',
    'process.step2.text':
      'Ich gestalte und baue das Wesentliche: sauberes Interface, funktionierende Logik, echte Daten wo es zählt. Zwischendurch bekommst du Updates.',
    'process.step3.time': 'Abends',
    'process.step3.title': 'Livegang',
    'process.step3.text':
      'Der Prototyp geht live auf einer echten URL, Hosting inklusive. Optimiert für Mobilgeräte, schnell und teilbar.',
    'process.step4.time': 'Abschluss',
    'process.step4.title': 'Übergabe',
    'process.step4.text':
      'Du bekommst den Link, den Quellcode und eine kurze Einführung. Dazu eine klare Empfehlung für die nächsten Schritte.',

    'deliver.title': 'Was du bekommst',
    'deliver.item1': 'Eine funktionierende Web App, deployed und live auf einer echten URL',
    'deliver.item2': 'Modernes Design, optimiert für Mobilgeräte',
    'deliver.item3': 'Den vollständigen Quellcode, er gehört dir',
    'deliver.item4': 'Eine Einführung und ehrliche Beratung zu den nächsten Schritten',
    'deliver.item5': 'Optionale Iterationstage, um den Prototyp zum Produkt auszubauen',

    'audience.title': 'Für alle, die schnell vorankommen wollen',
    'audience.founders.title': 'Gründer',
    'audience.founders.text':
      'Validiere deine Startup Idee mit etwas Echtem, bevor du Kapital aufnimmst oder ein Team aufbaust.',
    'audience.teams.title': 'Produktteams',
    'audience.teams.text':
      'Mach aus einem internen Pitch eine funktionierende Demo, die überzeugt und Budget freischaltet.',
    'audience.agencies.title': 'Agenturen und Berater',
    'audience.agencies.text':
      'Begeistere Kunden mit einem Proof of Concept statt mit einer weiteren Präsentation.',

    'faq.title': 'Häufige Fragen',
    'faq.q1': 'Was lässt sich realistisch an einem Tag bauen?',
    'faq.a1':
      'Eine fokussierte Web App, die den Kern deiner Idee beweist: eine Landingpage mit echter Funktionalität, ein Marktplatz, ein Buchungstool, ein Dashboard, ein Feature mit KI. Der Umfang wird auf das Wesentliche reduziert, und genau darum geht es.',
    'faq.q2': 'Was brauchst du von mir?',
    'faq.a2':
      'Deine Idee, 30 Minuten für das Kickoff Gespräch und Erreichbarkeit für kurze Rückfragen während des Tages. Alles andere ist mein Job.',
    'faq.q3': 'Was kostet das?',
    'faq.a3':
      'Ein Festpreis pro Prototypentag, vereinbart bevor wir starten. Keine Überraschungen. Schreib mir und ich melde mich mit den Details.',
    'faq.q4': 'Was passiert nach dem ersten Tag?',
    'faq.a4':
      'Der Prototyp gehört dir, inklusive Code. Wenn es funktioniert, buchen wir Iterationstage zum Ausbau, oder dein eigenes Team übernimmt. Keine Bindung.',

    'contact.title': 'Erzähl mir von deiner Idee',
    'contact.subtitle':
      'Ein paar Sätze reichen. Ich antworte innerhalb von 24 Stunden mit einem Vorschlag und dem nächsten freien Prototypentag.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.company': 'Firma (optional)',
    'contact.message': 'Was soll der Prototyp beweisen?',
    'contact.messagePlaceholder': 'Beschreibe deine Idee in ein paar Sätzen...',
    'contact.submit': 'Anfrage senden',
    'contact.sending': 'Wird gesendet...',
    'contact.success': 'Danke. Deine Anfrage ist angekommen und ich melde mich innerhalb von 24 Stunden.',
    'contact.error': 'Etwas ist schiefgelaufen. Bitte versuche es erneut oder melde dich direkt.',
    'contact.required': 'Bitte fülle alle Pflichtfelder aus.',
    'contact.direct': 'Lieber direkt per Mail? Schreib mir an',

    'footer.tagline': 'Rapid Prototypes. Vom Konzept zum MVP, deployed und live in einem Tag.',
    'footer.rights': 'Alle Rechte vorbehalten.',
  },
}

function applyMeta() {
  document.documentElement.lang = locale.value
  document.title = messages[locale.value]['meta.title'] ?? 'Ships at Dawn'
  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', messages[locale.value]['meta.description'] ?? '')
}

export function useI18n() {
  const t = (key: string): string => messages[locale.value][key] ?? key

  const setLocale = (l: Locale) => {
    locale.value = l
    localStorage.setItem(STORAGE_KEY, l)
    applyMeta()
  }

  return {
    locale: computed(() => locale.value),
    t,
    setLocale,
  }
}

applyMeta()
