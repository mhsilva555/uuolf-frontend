<script setup lang="ts">

</script>

<template>
  <section class="pb-0 flex flex-wrap items-center bg-white">
    <Categories class="container mx-auto my-4 mb-10" />
    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-8 lg:px-0">
      <div class="lg:pt-20">
        <h2 class="font-extrabold text-3xl lg:text-5xl text-color-1">Encontre os melhores profissionais para o seu projeto ou demanda</h2>
        <p class="my-6 mb-7 text-lg">A Uuolf conta mais de 500 profissionais cadastrados e verificados. Temos a solução para todas as suas demandas.</p>
<!--        <NuxtLink href="/buscar-profissionais" class="block lg:inline-block py-4 px-4 border border-color-2 bg-color-2 font-bold rounded-md text-white mb-2 lg:mb-0 duration-200 hover:bg-white hover:text-color-1 hover:border-color-1">Buscar Profissionais</NuxtLink>-->
        <NuxtLink href="/cadastrar" class="block lg:inline-block py-4 px-4 border border-color-1 bg-color-1 font-bold rounded-md text-white duration-200 hover:bg-white hover:text-color-1 hover:border-color-1">
          Quero me cadastrar
        </NuxtLink>
      </div>

      <div class="text-end">
        <img class="w-full max-w-md inline" src="@/static/hero-image.webp" alt="">
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>