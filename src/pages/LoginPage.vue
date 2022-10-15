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

      <div class="field">
        <div class="p-float-label p-input-icon-right">
          <i class="pi pi-envelope"/>
          <InputText id="email" v-model="model.email"
                     aria-describedby="email-error"/>
          <label for="email">Почта</label>
        </div>
      </div>

      <div class="field">
        <div class="p-float-label">

          <Password id="password" v-model="model.password" toggleMask :feedback="false"/>
          <label for="password">Пароль</label>
        </div>
      </div>

      <Button icon="pi" class="w-full" @click="login">Войти</Button>

    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref} from "vue";
import fetcher from "@/assets/fetcher";

// console.log(import.meta.env.VITE_APP_API_URL)

let model = ref({
  email: '',
  password: '',
})

const login = async () => {
  let data = await fetcher.post("login").catch((res) => {
    console.log(res)
  })
  console.log(data)
}

</script>

<style scoped>

</style>