<script setup lang="ts">
useHead({
  title: 'Home - Uuolf',
})

import Header from "~/components/Share/Header.vue";
import Footer from "~/components/Share/Footer.vue";
</script>

<template>
  <main>
    <Header/>
    <Hero/>
<!--    <MainServicesHome/>-->
    <FeaturedProfessionals/>
    <ComoFunciona/>
    <Footer/>
  </main>
</template>

<style scoped>

</style>