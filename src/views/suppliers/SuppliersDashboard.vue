<template>
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
            <div class="col-md-3 mb-3">
              <div class="card bg-dark text-white">
                <div class="card-body text-center">
                  <i class="bi bi-file-text fs-1 text-info mb-3"></i>
                  <h5 class="card-title">Briefs</h5>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="card bg-dark text-white">
                <div class="card-body text-center">
                  <i class="bi bi-upload fs-1 text-info mb-3"></i>
                  <h5 class="card-title">Upload documents</h5>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="card bg-dark text-white">
                <div class="card-body text-center">
                  <i class="bi bi-megaphone fs-1 text-info mb-3"></i>
                  <h5 class="card-title">Learning Management System</h5>
                </div>
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <div class="card bg-dark text-white">
                <div class="card-body text-center">
                  <i class="bi bi-calculator fs-1 text-info mb-3"></i>
                  <h5 class="card-title">CRM</h5>
                </div>
              </div>
            </div>
          </div>
          
          <div class="row">
            <div class="col">
              <div class="table-responsive">
                <table class="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Job number</th>
                      <th>Name of quote</th>
                      <th>Amount</th>
                      <th>
                        <button class="btn btn-primary btn-sm me-2">Accept</button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Luc Belair</td>
                      <td>JN_129</td>
                      <td>JN_129</td>
                      <td>JN_129</td>
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
import { onMounted } from 'vue';
import Layout from '../shared/Layout.vue';

onMounted(() => {
  console.log('Component mounted');
  // Any initialization code can go here
});
</script>

<style scoped>
/* Custom styles can be added here if needed */
.page-wrapper {
  min-height: 100vh;
  background-color: #121212;
  color: white;
}

.page-content {
  padding-top: 2rem;
}
</style>