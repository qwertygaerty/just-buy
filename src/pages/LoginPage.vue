<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <img src="../assets/images/just-buy-logo-cut.png" alt="Image" height="50" class="mb-3">
      <div class="text-3xl mb-3">С возвращением!</div>
      <span class="text-600 line-height-3">Нет аккаунта?</span>
      <a class="no-underline ml-2 text-blue-500 cursor-pointer">Зарегистрируйтесь</a>
    </div>

    <div>
      <label for="email1" class="block  mb-2">Почта</label>
      <InputText id="email1" type="text" class="w-full mb-3"/>

      <label for="password1" class="block mb-2">Пароль</label>
      <InputText id="password1" type="password" class="w-full mb-3"/>

      <Button icon="pi" class="w-full">Войти</Button>

    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage"
}
</script>

<style scoped>

</style>