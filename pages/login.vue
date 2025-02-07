<script setup lang="ts">
useHead({
  title: 'Uuolf - Login',
})

import authService from "~/service/authService";
import {authStore} from "~/store/authStore";
import Header from "~/components/Share/Header.vue";
import Footer from "~/components/Share/Footer.vue";

const auth = authStore()
const loginData = ref({
  email: 'user1@email.com',
  password: 'password',
})

const login = async () => {
  await authService.login(loginData.value.email, loginData.value.password).then((response) => {
    if (!response?.data || !response.data.auth) {
      alert('Erro ao realiazar login!')
      return false
    }

    auth.isAuth = true
    auth.token = response.data.token
  })
}
</script>

<template>
  <main>
    <Header/>
    <div class="container mx-auto py-14">
      <h3 class="text-center mb-10 text-2xl">Entre para ter acesso a sua conta</h3>

      <form method="POST" @submit.prevent="login" class="login-form max-w-[500px] mx-auto">
        <fieldset class="border p-2 mb-4 rounded-md">
          <legend class="px-4 font-semibold">E-mail</legend>
          <InputText type="email" v-model="loginData.email" class="!border-none p-2 w-full outline-0 !shadow-none" placeholder="usuario@email.com"/>
        </fieldset>

        <fieldset class="border p-2 rounded-md">
          <legend class="px-4 font-semibold">Senha</legend>
          <Password :toggle-mask="true" :feedback="false" v-model="loginData.password" class="p-2 w-full outline-0 !shadow-none" placeholder="*********" />
        </fieldset>

        <p class="text-center my-4"><NuxtLink class="underline" href="/recuperar-senha">Esqueci Minha Senha</NuxtLink></p>

        <button
            type="submit"
            class="block w-full my-3 py-4 px-4 border border-color-1 bg-color-1 font-bold rounded-md text-white duration-200 hover:bg-white hover:text-color-1 hover:border-color-1"
        >
          Entrar
        </button>

        <a href="/cadastrar" class="block text-center py-4 px-4 border border-color-2 bg-color-2 font-bold rounded-md text-white mb-2 lg:mb-0 duration-200 hover:bg-white hover:text-color-1 hover:border-color-1">
          Não Tenho Cadastro
        </a>
      </form>
      {{ auth.token }}
    </div>
    <Footer/>
  </main>
</template>

<style>
.login-form {
  & .p-password-input {
    width: 93% !important;
    border: 0 none;
    box-shadow: none !important;
  }
}
</style>