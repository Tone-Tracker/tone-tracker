<template>
    <div class="table-responsive">
      <table class="table mb-0">
        <thead class="table-light">
          <tr>
            <!-- Render column headers dynamically -->
            <th v-for="(header, index) in headers" :key="index">
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Render table rows dynamically -->
          <tr v-if="data?.length > 0" v-for="(row, rowIndex) in data" :key="row.id">
            <td v-for="(header, colIndex) in headers" :key="colIndex">
              <!-- If a slot for the column exists, use it -->
              <slot :name="header.key" :row="row" :index="rowIndex">
                <!-- Otherwise, display the default data -->
                {{ row[header.key] }}
              </slot>
            </td>
          </tr>
          <tr v-else>
            <td :colspan="headers.length" class="text-center text-danger">No data found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Accept headers and data as props
  const props = defineProps({
    headers: {
      type: Array,
      required: true,
      default: () => [],
    },
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  });
  </script>
  