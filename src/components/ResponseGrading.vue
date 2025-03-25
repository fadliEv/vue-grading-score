<script setup lang="ts">
import { marked } from 'marked';
import type { GradingResponse } from '../model/grading';

defineProps<{ response: GradingResponse | null }>();
</script>

<template>
  <div v-if="response" class="bg-white shadow-md rounded-lg p-6">
    <div class="space-y-6">
      <div v-for="(detail, index) in response.data" :key="index" class="border-t pt-4">
        <h4 class="font-semibold mb-2">Question {{ index + 1 }}</h4>
        <div class="mb-2 text-sm text-gray-600">{{ detail.question }}</div>
        
        <div class="bg-gray-50 p-4 rounded">
          <div class="mb-2">
          </div>
          <div class="text-sm whitespace-pre-wrap" v-html="marked(detail.review)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
