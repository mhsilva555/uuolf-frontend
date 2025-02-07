<script setup lang="ts">
import Header from '~/components/Share/Header.vue'
import Footer from '~/components/Share/Footer.vue'
</script>

<template>
  <main>
    <Header/>
    <slot></slot>
    <Footer/>
  </main>
</template>

<style scoped>

</style>