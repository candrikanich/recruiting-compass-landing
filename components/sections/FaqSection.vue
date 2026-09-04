<template>
  <section id="faq" class="py-14 sm:py-32 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-xl text-gray-600">
          Everything you need to know about The Recruiting Compass
        </p>
      </div>
      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <button
            type="button"
            class="w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors"
            @click="faqOpen === index ? (faqOpen = -1) : (faqOpen = index)"
          >
            {{ faq.question }}
            <span class="text-green-600 text-2xl leading-none">{{
              faqOpen === index ? "−" : "+"
            }}</span>
          </button>
          <div
            v-show="faqOpen === index"
            class="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-2"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const faqOpen = ref<number>(-1);

const faqs = [
  {
    question: "How much does The Recruiting Compass cost?",
    answer:
      "It's free right now. Every family that signs up during our founding period keeps full access free for life — no card, no catch. After the founding window closes, new families get a 30-day free trial, then $99/year or $12.99/month for the whole family.",
  },
  {
    question: "What sports do you support?",
    answer:
      "19 sports across all NCAA divisions — baseball, softball, basketball, football, soccer, volleyball, lacrosse, field hockey, ice hockey, tennis, golf, swimming & diving, track & field, gymnastics, and beach volleyball. Each sport has its own recruiting calendar, metrics, and compliance rules.",
  },
  {
    question: "Do I need to hire a recruiting service?",
    answer:
      "No. The Recruiting Compass gives you the tools to manage recruiting yourself. You'll know what to do, when to do it, and how to reach out to coaches — without paying thousands for a service that does the same thing.",
  },
  {
    question: "Can my parents see my recruiting info?",
    answer:
      "Yes. Family accounts let parents and players share the same dashboard. Parents get full visibility into schools, coaches, interactions, and timelines. The player controls the profile.",
  },
  {
    question: "How do the recruiting calendars work?",
    answer:
      "We built 22 NCAA recruiting calendars from official NCAA PDFs. Select your sport, gender, and division, and you'll see exactly when contact periods, quiet periods, and dead periods are — so you know when coaches can reach out and when you should.",
  },
  {
    question: "What are the communication templates?",
    answer:
      "33+ pre-written email and text templates for every stage of recruiting — introductions, follow-ups, campus visit requests, thank-you notes, and more. They auto-fill your name, sport, stats, and school info. Built-in NCAA compliance checks prevent you from sending during restricted periods.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your recruiting data is private to you and your family. Your public profile is only visible when you share the link — it's not indexed or searchable. We don't sell your data.",
  },
  {
    question: "When will the app be available?",
    answer:
      "We're launching in Fall 2026 on Web, iPhone, and iPad. Join our survey to get early access and be among the first to experience the platform.",
  },
  {
    question: "What's the difference between the web app and the iOS app?",
    answer:
      "Both have the same features and share the same data. Use whichever is more convenient — or both. Changes sync automatically.",
  },
  {
    question: "I'm a freshman. Is it too early to start?",
    answer:
      "No. The recruiting timeline starts in 9th grade. The earlier you begin tracking schools and building your profile, the more prepared you'll be when coaches start paying attention. Most families wish they'd started sooner.",
  },
  {
    question: "How is this different from other recruiting platforms?",
    answer:
      "Most platforms are either expensive recruiting services that do the work for you, or simple spreadsheets. The Recruiting Compass is a management tool — it gives you the structure, templates, calendars, and tracking to run your own recruiting process effectively. You stay in control.",
  },
];
</script>
