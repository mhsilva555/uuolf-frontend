<script setup lang="ts">
import { ref } from 'vue'

const profilePhoto = ref('https://d2tfco5ldvlr4r.cloudfront.net/profile/66x66/1728606997557-marcos-2b.jpg')
</script>

<template>
<header class="py-3 px-4 bg-white shadow">
  <div class="container mx-auto flex justify-between items-center">
    <div>
      <img class="w-full max-w-[90px]" src="@/static/logo-uuolf-horizontal-1.webp" alt="">
    </div>

    <div class="flex items-center gap-2">
      <div
          :style="`background: url(${profilePhoto})`"
          style="background-size: cover !important;"
          class="h-10 w-10 bg-neutral-500 rounded-full"
      ></div>
      <div>
        <span class="block text-sm">Marcos Henrique</span>
        <Button class="!p-2 !py-0 !text-xs !border-0 !bg-color-2">Cliente</Button>
      </div>
    </div>
  </div>
</header>
</template>

<style scoped>

</style>