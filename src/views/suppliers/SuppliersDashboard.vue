11<template>
    <Layout>
    <div class="page-wrapper">
      <div class="page-content">
        <div class="container-fluid">
          <div class="row mb-4">
            <div class="col">
              <h1 class="display-6">Welcome</h1>
              <p class="lead">View live data</p>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-md-3 mb-3" v-for="(item, index) in menuItems" :key="index">
              <div class="card bg-dark text-white">
                <div class="card-body text-center">
                  <i :class="item.icon" class="bx fs-1 text-info mb-3"></i>
                  <h5 class="card-title">{{ item.title }}</h5>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
                <div class="table-responsive">
    <table class="table table-dark table-borderless custom-table-bg no-border-table">
        <thead>
        <tr>
            <th class="text-white">Client</th>
            <th class="text-white">Job number</th>
            <th class="text-white">Name of quote</th>
            <th class="text-white">Amount</th>
            <th>
            <button class="btn btn-info btn-sm me-2">Accept</button>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td class="text-white">Luc Belair</td>
            <td class="text-white">JN_129</td>
            <td class="text-white">JN_129</td>
            <td class="text-white">JN_129</td>
            <td>
            <button class="btn btn-secondary btn-sm">Reject</button>
            </td>
        </tr>
        </tbody>
    </table>
    </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import Layout from '../shared/Layout.vue';

const menuItems = ref([
  { title: 'Briefs', icon: 'bx-file' },
  { title: 'Upload documents', icon: 'bx-upload' },
  { title: 'Learning Management System', icon: 'bx-home' },
  { title: 'CRM', icon: 'bx-calculator' }
]);

onMounted(() => {
  console.log('Component mounted');
  // Any initialization code can go here
});
</script>

  
<style scoped>
.page-wrapper {
  min-height: 100vh;
  background-color: #121212;
  color: white;
}

.page-content {
  padding-top: 2rem;
}

.card {
  background-color: #1e1e1e !important;
}

.btn-info {
  background-color: #3498db;
  border-color: #3498db;
}

.btn-secondary {
  background-color: #2c2c2c;
  border-color: #2c2c2c;
}

.table-responsive {
  margin-top: 2rem;
}

.custom-table-bg {
  background-color: #1e1e1e;
}

.no-border-table th,
.no-border-table td {
  border: none !important;
}

.table thead th {
  background-color: #1e1e1e;
  color: #6c757d;
}

.table tbody tr {
  background-color: #1e1e1e;
}

.table tbody tr td {
  border-top: none;
}

.table button {
  color: white;
}
</style>

