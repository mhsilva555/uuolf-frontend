<script setup lang="ts">
import {authStore} from "~/store/authStore";
import stringService from "~/service/stringService";

const auth = authStore()
</script>

<template>
  <header class="bg-white py-4">
    <div class="container mx-auto block lg:flex items-center gap-10">
      <h1 class="text-4xl text-center font-extrabold">
        <NuxtLink href="/"><img class="w-full max-w-[150px] inline-block" src="@/static/logo-uuolf-horizontal-1.webp" alt="Uuolf"></NuxtLink>
      </h1>

      <div class="flex gap-3 lg:gap-5 justify-center lg:justify-end grow text-xs lg:text-lg font-semibold mt-5 lg:mt-0">
        <NuxtLink class="hover:bg-slate-100 hover:text-color-2 duration-150 flex items-center justify-center px-2 lg:px-6 rounded-lg" href="/como-funciona">Como funciona</NuxtLink>

        <client-only>
          <NuxtLink v-if="!auth.isAuth" href="/login">
            <Button
              class="!rounded-lg !bg-color-1 !px-2 !py-0 lg:!py-2 lg:!px-6 !border-color-1 !text-white !text-sm lg:!text-lg hover:!bg-color-2 hover:!border-color-2"
            >
              Entrar
            </Button>
          </NuxtLink>

          <div v-else class="flex items-center gap-2 border p-1 px-3 rounded-md">
            <div class="text-end leading-none">
              <p class="text-base m-0">{{ stringService.shortString(auth.user.name, 8) }}</p>
              <NuxtLink href="/dashboard" class="text-sm m-0 font-normal">Minha Conta &raquo;</NuxtLink>
            </div>

            <div>
              <NuxtLink href="/dashboard">
                <img class="rounded-full w-[60px] h-[60px]" v-if="auth.user.photo" :src="auth.user.photo">
                <img class="rounded-full w-[60px] h-[60px]" v-else src="https://placehold.co/80x80">
              </NuxtLink>
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>