<script>
import { RouterLink, RouterView } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, sameAs } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import router from '@/router';
import { useMonitorSize } from '@/composables/useMonitorSize';
import { useAuth } from '@/stores/auth';
import useToaster from '@/composables/useToaster';

export default {
  setup() {
    const loading = ref(false);

    const screenSizes = useMonitorSize();
    const auth = useAuth();
    const toaster = useToaster();

    const form = reactive({
      password: '',
      confirmPassword: '',
      token: ''  // This should be populated from the URL or route params
    });

    const rules = {
      password: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAsPassword: sameAs(form.password) },
      token: { required }
    }
    const v$ = useVuelidate(rules, form)

    const onSubmit = async () => {
      loading.value = true;
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) return;
      auth.resetPassword(form)
        .then(function (response) {
          toaster.success("Password reset successfully");
          setTimeout(() => {
            router.push('/login');
          }, 1000)
        }).catch(function (error) {
          toaster.error("Error resetting password");
          console.log(error);
        }).finally(function () {
          loading.value = false;
        });
    }

    return {
      form, v$, onSubmit, screenSizes,
    }
  }
}
</script>

<template>
  <div class="logo-light"></div>
  <div class="shoes"></div>
  <div class="container-login">
    <div class="section-authentication-cover">
      <div class="login-cover">
        <div class="row g-0">
          <div class="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center d-none d-xl-flex">
            <div class="card shadow-none bg-transparent shadow-none rounded-0 mb-0">
              <div class="card-body">
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
            <div class="card rounded-0 m-3 shadow-none bg-transparent mb-0">
              <div class="card-body p-sm-5">
                <div class="">
                  <div class="form-body">
                    <h5 class="mb-3 text-default">Reset Password</h5>
                    <form @submit.prevent="onSubmit" class="row g-3">
                      <div class="mb-3 col-12">
                        <label for="inputPassword" class="form-label">New Password</label>
                        <input v-model="form.password" type="password" class="form-control custom-input"
                          id="inputPassword">
                        <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                          <div class="text-danger">{{ error.$message }}</div>
                        </div>
                      </div>
                      <div class="mb-3 col-12">
                        <label for="inputConfirmPassword" class="form-label">Confirm Password</label>
                        <input v-model="form.confirmPassword" type="password" class="form-control custom-input"
                          id="inputConfirmPassword">
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
                      <div class="mt-3 text-center">
                        <router-link to="/login">Back to Login</router-link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
.text-default {
  font-size: 40px;
  font-weight: 200;
  color: #fff
}

.form-label {
  font-size: 20px;
  font-weight: 200;
  margin-bottom: 0;
  color: #fff;
}

input[type=password] {
  border: none;
  border-bottom: 2px solid #fff;
  background-color: none;
  outline: 0;
}

input[type=password]:focus {
  border: none;
  background-color: none;
}

.section-authentication-cover {
  background: url("../../assets/images/login-images/login-cover.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.auth-cover-left {
  position: relative;
  background-color: transparent;
}

.logo-light {
  position: absolute;
  height: 69px;
  width: 315px;
  background-image: url("../../assets/images/logo/white-logo.png");
  top: 20px;
  left: 40px;
}

.shoes {
  position: absolute;
  height: 108px;
  width: 105px;
  background-image: url("../../assets/images/login-images/Shoes.png");
  background-repeat: no-repeat;
  bottom: 20px;
  left: 40px
}

.form-control {
  border-radius: 0;
  background-color: transparent !important;
  padding: 0;
}

.form-control:hover {
  border: none;
  box-shadow: none;
  border-bottom: 2px solid #fff;
}

.auth-cover-right {
  background: rgb(34, 36, 35, 0.7);
  border-left: 1px solid #707070;
}

@media (max-width: 768px) {
  .shoes {
    display: none;
  }
}

@media (max-width: 575.98px) {
  .shoes {
    display: none;
  }
}
</style>