<script setup lang="ts">

</script>

<template>
  <header class="bg-white py-4">
    <div class="container mx-auto block lg:flex items-center gap-10">
      <h1 class="text-4xl text-center font-extrabold">
        <a href="#"><img class="w-full max-w-[150px] inline-block" src="@/static/logo-uuolf-horizontal-1.webp" alt="Uuolf"></a>
      </h1>

      <div class="flex gap-3 lg:gap-5 justify-center lg:justify-end grow text-lg font-semibold mt-5 lg:mt-0">
        <a class="hover:bg-slate-100 text-xs lg:text-md hover:text-color-2 duration-150 flex items-center justify-center px-2 lg:px-6 rounded-lg" href="#">Seja um profissional</a>
        <a class="hover:bg-slate-100 text-xs lg:text-md hover:text-color-2 duration-150 flex items-center justify-center px-2 lg:px-6 rounded-lg" href="#">Como funciona</a>
        <Button
          class="!rounded-lg !bg-color-1 !px-2 !py-0 lg:!py-2 lg:!px-6 !border-color-1 !text-white !text-sm lg:!text-lg hover:!bg-color-2 hover:!border-color-2">
          Entrar
        </Button>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>