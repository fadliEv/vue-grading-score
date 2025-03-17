<script setup lang="ts">
import { ref } from 'vue';
import { scanRepositoryBranches, submitGradingRequest } from '../services/gradingService';
import type { GradingRequest, GradingResponse } from '../model/grading';

const emit = defineEmits<{ 
  (event: 'grading-response', response: GradingResponse): void;
  (event: 'grading-error', error: string): void; 
}>();

const formData = ref<GradingRequest>({
  repository_url: '',
  branch: '',
  questions: ['']
});

const loading = ref(false);
const scanning = ref(false); // Loading untuk scan repository
const branches = ref<string[]>([]); // Menyimpan hasil branch dari API

const scanRepository = async () => {
  if (!formData.value.repository_url.trim()) {
    emit('grading-error', 'Repository URL is required.');
    return;
  }

  scanning.value = true;
  try {
    const response = await scanRepositoryBranches(formData.value.repository_url);

    if (response.status === 'success') {
      branches.value = response.branches;
    } else {
      emit('grading-error', 'Failed to fetch branches.');
    }
  } catch (error) {
    emit('grading-error', error instanceof Error ? error.message : 'An error occurred while scanning the repository.');
  } finally {
    scanning.value = false;
  }
};


// Fungsi untuk submit grading
const submitGrading = async () => {
  if (!formData.value.branch) {
    emit('grading-error', 'Please select a branch before submitting.');
    return;
  }

  loading.value = true;
  try {
    const response = await submitGradingRequest(formData.value);
    emit('grading-response', response);
  } catch (error) {
    emit('grading-error', error instanceof Error ? error.message : 'An error occurred');
  } finally {
    loading.value = false;
  }
};

const addQuestion = () => {
  formData.value.questions.push('');
};

const removeQuestion = (index: number) => {
  formData.value.questions.splice(index, 1);
};
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-6 mb-8">
    <h2 class="text-2xl font-bold mb-6">Grading Form</h2>

    <!-- Repository URL Input -->
    <div class="mb-6">
  <label class="block text-gray-700 text-sm font-bold mb-2">Repository URL</label>
  
  <div class="flex space-x-2">
    <input 
      v-model="formData.repository_url"
      type="text"
      placeholder="Enter repository URL"
      class="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
    
    <button
      @click="scanRepository"
      :disabled="scanning || !formData.repository_url.trim()"
      class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
    >
      {{ scanning ? 'Scanning...' : 'Scan' }}
    </button>
  </div>
</div>

    <!-- Branch Selection -->
    <div v-if="branches.length > 0" class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2">Branch</label>
      <select 
        v-model="formData.branch"
        class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option disabled value="">Select a branch</option>
        <option v-for="branch in branches" :key="branch" :value="branch">
          {{ branch }}
        </option>
      </select>
    </div>

    <!-- Questions Input -->
    <div v-if="formData.branch" class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <label class="block text-gray-700 text-sm font-bold">Questions</label>
        <button
          @click="addQuestion"
          type="button"
          class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          Add Question
        </button>
      </div>
      
      <div v-for="(question, index) in formData.questions" :key="index" class="mb-4 relative">
        <textarea
          v-model="formData.questions[index]"
          rows="4"
          placeholder="Enter question"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
        ></textarea>
        <button
          v-if="formData.questions.length > 1"
          @click="removeQuestion(index)"
          type="button"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      @click="submitGrading"
      :disabled="loading || !formData.repository_url || !formData.branch || formData.questions.some(q => !q.trim())"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
    >
      {{ loading ? 'Submitting...' : 'Submit Grading' }}
    </button>
  </div>
</template>
