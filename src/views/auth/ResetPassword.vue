<script>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import useToaster from '@/composables/useToaster';
import { useAuth } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const loading = ref(false);
    const auth = useAuth();
    const toaster = useToaster();
    const route = useRoute();
    const router = useRouter();

    const form = reactive({
      password: '',
      confirmPassword: '',
    });

    const rules = {
      password: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAsPassword: sameAs(form.password) }
    };

    const v$ = useVuelidate(rules, form);

    const onSubmit = async () => {
      loading.value = true;
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) return;

      const token = route.query.token;

      auth.resetPassword(token, form.password)
        .then(() => {
          toaster.success("Password reset successfully");
          router.push('/login');
        })
        .catch((error) => {
          toaster.error("Error resetting password");
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
  <div class="container-reset-password">
    <div class="card">
      <div class="card-body">
        <h5 class="mb-3 text-default">Reset Password</h5>
        <form @submit.prevent="onSubmit" class="row g-3">
          <div class="mb-3 col-12">
            <label for="inputNewPassword" class="form-label">New Password</label>
            <input v-model="form.password" type="password" class="form-control custom-input" id="inputNewPassword">
            <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
              <div class="text-danger">{{ error.$message }}</div>
            </div>
          </div>
          <div class="mb-3 col-12">
            <label for="inputConfirmPassword" class="form-label">Confirm Password</label>
            <input v-model="form.confirmPassword" type="password" class="form-control custom-input" id="inputConfirmPassword">
            <div class="input-errors" v-for="error of v$.confirmPassword.$errors" :key="error.$uid">
              <div class="text-danger">{{ error.$message }}</div>
            </div>
          </div>
          <div class="col-12">
            <div class="d-grid">
              <button type="submit" class="btn p-3 maz-gradient-btn text-white">
                <div v-if="loading" class="spinner-border text-white" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                {{ loading ? 'Resetting...' : 'Reset Password' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your custom styles here, similar to your login page */
</style>