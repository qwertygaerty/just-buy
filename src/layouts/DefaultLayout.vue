<script setup lang="ts">

import {ref} from "vue";

const items = ref([
  {
    label: 'Войти',
    icon: 'pi pi-fw pi-sign-in layout-menuitem-icon',
    to: 'login'
  },
  {
    label: 'Зарегистрироваться',
    icon: 'pi pi-fw pi-user-edit',
    to: 'register'
  },
]);

</script>

<template>
  <section class="flex align-items-center flex-column gap-5">
    <Menubar :model="items" class="flex justify-content-between wrapper">
      <template #start>
        <router-link to="/">
          <img alt="logo" src="../assets/images/just-buy-logo-cut.png" height="50" class="logo">
        </router-link>
      </template>
    </Menubar>


    <div class="wrapper flex justify-content-center">
      <slot></slot>
    </div>


  </section>

</template>


<style scoped>
.logo {
  cursor: pointer;
}

.wrapper {
  width: 60%;
}

@media (max-width: 1000px){
  .wrapper {
    width: 100%;
  }
}

</style>