<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  page: Object,
});

const emit = defineEmits(['changePage']);

const totalPages = computed(() => props?.page?.totalPages);
const currentPage = ref(props?.page?.number + 1);

const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
    emit('changePage', pageNumber - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const displayedPages = computed(() => {
  const range = 2;
  const start = Math.max(1, currentPage.value - range);
  const end = Math.min(totalPages.value, currentPage.value + range);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
</script>

<template>
  <nav aria-label="Page navigation" class="d-flex justify-content-center">
    <ul class="pagination">
      <li :class="['page-item', { disabled: currentPage === 1 }]">
        <button class="page-link" @click="prevPage" :disabled="currentPage === 1">
          <span aria-hidden="true">&laquo;</span>
          <span class="visually-hidden">Previous</span>
        </button>
      </li>

      <li v-if="displayedPages[0] > 1" class="page-item">
        <button class="page-link" @click="goToPage(1)">1</button>
      </li>

      <li v-if="displayedPages[0] > 2" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <li v-for="pageNumber in displayedPages" :key="pageNumber" :class="['page-item', { active: currentPage === pageNumber }]">
        <button class="page-link" @click="goToPage(pageNumber)">
          {{ pageNumber }}
        </button>
      </li>

      <li v-if="displayedPages[displayedPages.length - 1] < totalPages - 1" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <li v-if="displayedPages[displayedPages.length - 1] < totalPages" class="page-item">
        <button class="page-link" @click="goToPage(totalPages)">{{ totalPages }}</button>
      </li>

      <li :class="['page-item', { disabled: currentPage === totalPages }]">
        <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">
          <span aria-hidden="true">&raquo;</span>
          <span class="visually-hidden">Next</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pagination .page-item.active .page-link {
  background: linear-gradient(to right, #9A3AB1, #117AD1);
  border-color: #9A3AB1;
  color: white;
}

.pagination .page-link {
  color: #6c757d;
  transition: all 0.3s ease-in-out;
}

.pagination .page-link:hover:not(.active) {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>