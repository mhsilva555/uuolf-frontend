<script setup lang="ts">
useHead({
  title: 'Uuolf - Login',
})
definePageMeta({
  layout: 'pages',
  middleware: 'auth-logged'
})

import authService from "~/service/authService"
import {authStore} from "~/store/authStore"
import {toast} from "vue3-toastify"
import 'vue3-toastify/dist/index.css'

const auth = authStore()
const loginData = ref({
  email: null,
  password: null,
})
const disabled = ref(false)

const login = () => {
  if (Object.values(loginData.value).some(value => value === null || value === "")) {
    toast("Insira E-mail e Senha!", {type: 'warning'})
    return false
  }

  disabled.value = true
  authService.login(loginData.value.email, loginData.value.password).then((response) => {
    disabled.value = false
    if (!response?.data || !response.data.auth) {
      toast("Erro ao realizar login!", {type: "error", position: "top-center"})
      return false
    }

    auth.setUser(response.data.user)
    auth.setToken(response.data.token)
    auth.setAuth(true)
    navigateTo('/dashboard')
  })
}
</script>

<template>
  <div class="container mx-auto py-14">
      <h3 class="text-center mb-10 text-2xl">Entre para ter acesso a sua conta</h3>

      <form method="POST" @submit.prevent="login" class="login-form max-w-[500px] mx-auto">
        <fieldset class="border p-2 mb-4 rounded-md">
          <legend class="px-4 font-semibold">E-mail</legend>
          <InputText type="email" v-model="loginData.email" class="!border-none p-2 w-full outline-0 !shadow-none" placeholder="usuario@email.com"/>
        </fieldset>

        <fieldset class="border p-2 py-0 rounded-md">
          <legend class="px-4 font-semibold">Senha</legend>
          <Password :toggle-mask="true" :feedback="false" v-model="loginData.password" class="p-2 w-full outline-0 !shadow-none" placeholder="*********" />
        </fieldset>

        <p class="text-center my-4"><NuxtLink class="underline" href="/recuperar-senha">Esqueci Minha Senha</NuxtLink></p>

        <Button
            :disabled="disabled"
            type="submit"
            class="block w-full my-3 !py-4 !px-4 border !border-color-1 !bg-color-1 font-bold rounded-md text-white duration-200 hover:!bg-white hover:!text-color-1 hover:!border-color-1"
        >
          Entrar
        </Button>

        <NuxtLink href="/cadastrar" class="block text-center py-4 px-4 border border-color-2 bg-color-2 font-bold rounded-md text-white mb-2 lg:mb-0 duration-200 hover:bg-white hover:text-color-1 hover:border-color-1">
          Não Tenho Cadastro
        </NuxtLink>
      </form>
      {{ auth.token }}
    </div>
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