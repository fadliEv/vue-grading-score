<script setup lang="ts">
import { marked } from 'marked';
import type { GradingResponse } from '../model/grading';

defineProps<{ response: GradingResponse | null }>();
</script>

<template>
  <div v-if="response" class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-6">Grading Results</h2>
    
    <div class="mb-4">
      <h3 class="text-xl font-semibold mb-2">Overall Grade</h3>
      <div class="text-3xl font-bold text-blue-600">
        {{ response.grade }}%
      </div>
    </div>

    <div class="space-y-6">
      <div v-for="(detail, index) in response.details" :key="index" class="border-t pt-4">
        <h4 class="font-semibold mb-2">Question {{ index + 1 }}</h4>
        <div class="mb-2 text-sm text-gray-600">{{ detail.question }}</div>
        
        <div class="bg-gray-50 p-4 rounded">
          <div class="mb-2">
            <span 
              :class="{
                'px-2 py-1 rounded text-sm font-semibold': true,
                'bg-green-100 text-green-800': detail.result === 'Lulus',
                'bg-red-100 text-red-800': detail.result === 'Gagal'
              }"
            >
              {{ detail.result }}
            </span>
          </div>
          <div class="text-sm whitespace-pre-wrap" v-html="marked(detail.review)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
