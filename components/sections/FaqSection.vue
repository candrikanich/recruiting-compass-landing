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
          :key="faq.id"
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
import { faqs } from "~/data/faqs";

const faqOpen = ref<number>(-1);
</script>
