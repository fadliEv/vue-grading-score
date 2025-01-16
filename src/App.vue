<script setup lang="ts">
import { ref } from 'vue'
import FormGrading from './components/FormGrading.vue'
import ResponseGrading from './components/ResponseGrading.vue'
import type { GradingResponse } from './types/grading'

const gradingResponse = ref<GradingResponse | null>(null)
const error = ref<string | null>(null)

const handleGradingResponse = (response: GradingResponse) => {
  gradingResponse.value = response
  error.value = null
}

const handleGradingError = (errorMessage: string) => {
  error.value = errorMessage
  gradingResponse.value = null
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <FormGrading
        @grading-response="handleGradingResponse"
        @grading-error="handleGradingError"
      />
      
      <div v-if="error" class="mb-8 p-4 bg-red-100 text-red-700 rounded">
        {{ error }}
      </div>
      
      <ResponseGrading :response="gradingResponse" />
    </div>
  </div>
</template>