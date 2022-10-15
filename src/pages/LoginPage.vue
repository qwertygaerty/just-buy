<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <img src="../assets/images/just-buy-logo-cut.png" alt="Image" height="50" class="mb-3">
      <div class="text-3xl mb-3">С возвращением!</div>
      <span class="text-600 line-height-3">Нет аккаунта?</span>
      <router-link to="/register">
        <a class="no-underline ml-2 text-blue-500 cursor-pointer">Зарегистрируйтесь</a>
      </router-link>
    </div>

    <div class="p-fluid">

      <Message severity="error" v-if="isRequestFailed">Неверная почта или пароль</Message>

      <div class="field">
        <div class="p-float-label p-input-icon-right">
          <i class="pi pi-envelope"/>
          <InputText id="email" v-model="state.email"
                     aria-describedby="email-error" v-tooltip="'Введите почту'"
                     :class="{'p-invalid':valid.email.$invalid && submitted}"/>
          <label for="email">Почта</label>
        </div>

        <span v-if="valid.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of valid.email.$errors" :key="index">
                            <small class="p-error">{{ error.$message }}</small>
                            </span>
                        </span>
        <small v-else-if="(valid.email.$invalid && submitted) || valid.email.$pending.$response"
               class="p-error">{{ valid.email.required.$message.replace('Value', 'Email') }}</small>
      </div>

      <div class="field">
        <div class="p-float-label">
          <Password id="password" v-model="state.password" toggleMask :feedback="false" v-tooltip="'Введите пароль'"
                    :class="{'p-invalid':valid.password.$invalid && submitted}"/>
          <label for="password">Пароль</label>
        </div>
        <small v-if="(valid.password.$invalid && submitted) || valid.password.$pending.$response"
               class="p-error">{{ valid.password.required.$message.replace('Value', 'Password') }}</small>
      </div>

      <BlockUI :blocked='isSentData'>
        <Button icon="pi" class="w-full" @click="login(!valid.$invalid)">Войти</Button>
      </BlockUI>

    </div>

  </div>
</template>

<script lang="ts" setup>
import {auth} from "@/services/AuthService";
import type LoginInterface from "@/assets/helpers/interfaces/LoginInterface";
import useVuelidate from "@vuelidate/core";
import {reactive, ref} from "vue";
import {email, required} from "@vuelidate/validators";
import router from "@/router";

const state: LoginInterface = reactive({
  email: '',
  password: '',
});

const rules = {
  email: {required, email},
  password: {required},
};

const valid = useVuelidate(rules, state);
const submitted = ref(false);
let isSentData = ref(false)
let isRequestFailed = ref(false)

const login = async (isFormValid: boolean) => {
  submitted.value = true;

  if (!isFormValid) return;

  isSentData.value = true;
  let res = await auth.login(state);
  isSentData.value = false;
  res.status !== 200 ? isRequestFailed.value = true : await router.push('/catalog');

}

</script>

<style scoped>

</style>