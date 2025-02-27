<script setup lang="ts">
import HeaderDashboard from "~/components/Share/HeaderDashboard.vue";
import Footer from "~/components/Share/Footer.vue";
</script>

<template>
  <main>
    <HeaderDashboard/>
<!--    <Breadcrumbs/>-->
    <slot></slot>
    <Footer/>
  </main>
</template>

<style scoped>

</style>