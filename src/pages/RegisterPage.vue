<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
      <div class="flex align-items-center flex-column pt-6 px-3">
        <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
        <h5>Registration Successful!</h5>
        <p :style="{lineHeight: 1.5, textIndent: '1rem'}">
          Your account is registered under name <b>{{ state.name }}</b> ; it'll be valid next 30 days without
          activation. Please check <b>{{ state.email }}</b> for activation instructions.
        </p>
      </div>
      <template #footer>
        <div class="flex justify-content-center">
          <Button label="OK" @click="toggleDialog" class="p-button-text"/>
        </div>
      </template>
    </Dialog>

    <div class="flex justify-content-center ">
      <div class="surface-card w-full">
        <div class="text-center mb-5">
          <img src="../assets/images/just-buy-logo-cut.png" alt="Image" height="50" class="mb-3">
          <div class="text-3xl mb-3">Регистрация</div>
        </div>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label">
              <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}"/>
              <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">ФИО*</label>
            </div>
            <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
                   class="p-error">{{ v$.name.required.$message.replace('Value', 'Name') }}</small>
          </div>
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope"/>
              <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}"
                         aria-describedby="email-error"/>
              <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Почта*</label>
            </div>
            <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{ error.$message }}</small>
                            </span>
                        </span>
            <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
                   class="p-error">{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password id="password" v-model="v$.password.$model"
                        :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                <template #header>
                  <h5>Надежность пароля</h5>
                </template>
                <template #footer="sp">
                  {{ sp.level }}
                  <Divider/>
                  <p class="mt-2">Требования</p>
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>Содержит символ в нижнем регистре</li>
                    <li>Содержит символ в верхнем регистре</li>
                    <li>Содержит числа</li>
                    <li>Минимальная длина - 8 символов</li>
                  </ul>
                </template>
              </Password>
              <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Пароль*</label>
            </div>
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
                   class="p-error">{{ v$.password.required.$message.replace('Value', 'Password') }}</small>
          </div>
          <Button class="mt-2 justify-content-center">Зарегистрироваться</Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref} from 'vue';
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";


const state = reactive({
  name: '',
  email: '',
  password: '',
  accept: null
});

const rules = {
  name: {required},
  email: {required, email},
  password: {required},
  accept: {required}
};

const submitted = ref(false);
const countries = ref();
const showMessage = ref(false);
const date = ref();
const country = ref();

const v$ = useVuelidate(rules, state);

const handleSubmit = (isFormValid) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  toggleDialog();
}
const toggleDialog = () => {
  showMessage.value = !showMessage.value;

  if (!showMessage.value) {
    resetForm();
  }
}
const resetForm = () => {
  state.name = '';
  state.email = '';
  state.password = '';
  state.date = null;
  state.country = null;
  state.accept = null;
  submitted.value = false;
}

</script>

<style lang="scss" scoped>
.form-demo {
  .card {
    min-width: 450px;

    form {
      margin-top: 2rem;
    }

    .field {
      margin-bottom: 1.5rem;
    }
  }

  @media screen and (max-width: 960px) {
    .card {
      width: 80%;
    }
  }
}

</style>