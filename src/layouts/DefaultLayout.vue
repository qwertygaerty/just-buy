<script setup lang="ts">
import {computed} from "vue";
import {auth} from "@/services/APIService";
import {useAuthStore} from "@/stores/auth";
import {useDark, useToggle} from "@vueuse/core";

let userAuth = useAuthStore();

const items = computed(() => {
  if (userAuth.getToken().value?.length > 0) {
    return [
      {
        label: 'Корзина',
        icon: 'pi pi-fw pi-shopping-cart layout-menuitem-icon',
        to: 'cart'
      },
      {
        label: 'Выйти',
        icon: 'pi pi-fw pi-sign-out layout-menuitem-icon',
        command: async () => {
          await auth.logout();
          userAuth.setToken('');
        },
        to: 'login'
      },
    ]
  } else {
    return [
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
    ]
  }
});
const isDark = useDark();
const toggleDark = useToggle(isDark)

if (isDark.value) {
  import('primevue/resources/themes/mdc-dark-indigo/theme.css');
} else {
  import('primevue/resources/themes/mdc-light-indigo/theme.css');
}


</script>

<template>
  <section class="flex align-items-center flex-column gap-5">
    <Menubar :model="items" class="flex justify-content-between wrapper">
      <template #start>
        <router-link to="/">
          <img alt="logo" src="../assets/images/just-buy-logo-cut.png" height="50" class="logo">
        </router-link>
      </template>

      <template #end>
        {{isDark}}
        <InputSwitch v-model="isDark" @click="toggleDark" icon="pi pi-shopping-cart"  />
      </template>

    </Menubar>
    <div class="wrapper flex justify-content-center">
      <slot></slot>
    </div>
  </section>
</template>

<style>

.logo {
  cursor: pointer;
}
.wrapper {
  width: 60%;
}
@media (max-width: 1000px) {
  .wrapper {
    width: 100%;
  }
}
</style>