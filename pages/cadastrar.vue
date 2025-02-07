<script setup lang="ts">
useHead({
  title: 'Uuolf - Cadastro',
})

import Header from "~/components/Share/Header.vue";
import Footer from "~/components/Share/Footer.vue";
</script>

<template>
  <main>
    <Header/>
    <div class="container mx-auto py-14">
      <h3 class="text-center mb-10 text-2xl">Cadastre-se</h3>

      <div class="flex justify-center gap-2 mb-8">
        <Button class="!px-10 !py-3 !text-2xl !bg-blue-700 !border-blue-700"><Icon name="mdi:facebook"></Icon></Button>
        <Button class="!px-10 !py-3 !text-2xl !bg-red-600 !border-red-600"><Icon name="mdi:google"></Icon></Button>
      </div>

      <Register/>
    </div>
    <Footer/>
  </main>
</template>

<style scoped>

</style>