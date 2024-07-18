<script>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import useToaster from '@/composables/useToaster';
import { useAuth } from '@/stores/auth';

export default {
  setup() {
    const loading = ref(false);
    const auth = useAuth();
    const toaster = useToaster();

    const form = reactive({
      email: '',
    });

    const rules = {
      email: { required, email }
    };

    const v$ = useVuelidate(rules, form);

    const onSubmit = async () => {
      loading.value = true;
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) return;

      auth.forgotPassword(form.email)
        .then(() => {
          toaster.success("Password reset instructions sent to your email");
        })
        .catch((error) => {
          toaster.error("Error sending reset instructions");
          console.log(error);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      form,
      v$,
      onSubmit,
      loading
    };
  }
};
</script>

<template>
  <div class="container-forgot-password">
    <div class="card">
      <div class="card-body">
        <h5 class="mb-3 text-default">Forgot Password</h5>
        <form @submit.prevent="onSubmit" class="row g-3">
          <div class="mb-3 col-12">
            <label for="inputEmailAddress" class="form-label">Email Address</label>
            <input v-model="form.email" type="email" class="form-control custom-input" id="inputEmailAddress">
            <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
              <div class="text-danger">Email address is required.</div>
            </div>
          </div>
          <div class="col-12">
            <div class="d-grid">
              <button type="submit" class="btn p-3 maz-gradient-btn text-white">
                <div v-if="loading" class="spinner-border text-white" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                {{ loading ? 'Sending...' : 'Send Reset Instructions' }}
              </button>
            </div>
          </div>
        </form>
        <div class="mt-3 text-center">
          <router-link to="/">Back to Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>