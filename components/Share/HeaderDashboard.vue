<script setup lang="ts">
import {authStore} from "~/store/authStore"
const auth = authStore()

const profilePhoto = ref('https://d2tfco5ldvlr4r.cloudfront.net/profile/66x66/1728606997557-marcos-2b.jpg')
</script>

<template>
  <header class="bg-white py-4">
    <div class="container mx-auto block lg:flex items-center gap-10">
      <h1 class="text-4xl text-center font-extrabold">
        <NuxtLink href="/"><img class="w-full max-w-[150px] inline-block" src="@/static/logo-uuolf-horizontal-1.webp" alt="Uuolf"></NuxtLink>
      </h1>

      <div class="flex gap-3 lg:gap-5 justify-center lg:justify-end grow text-xs lg:text-lg font-semibold mt-5 lg:mt-0">
        <NuxtLink class="hover:bg-slate-100 hover:text-color-2 duration-150 flex items-center justify-center px-2 lg:px-6 rounded-lg" href="/como-funciona">Meus Projetos</NuxtLink>
        <NuxtLink class="hover:bg-slate-100 hover:text-color-2 duration-150 flex items-center justify-center px-2 lg:px-6 rounded-lg" href="/como-funciona">Minha Conta</NuxtLink>
        <Button
            @click="auth.deleteSession()"
            class="!rounded-lg !bg-color-2 !px-2 !py-0 lg:!py-2 lg:!px-6 !border-color-2 !text-white !text-sm lg:!text-lg hover:!bg-color-2 hover:!border-color-2">
          Sair
        </Button>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>