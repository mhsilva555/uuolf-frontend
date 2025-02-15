<script setup lang="ts">
import HeaderDashboard from "~/components/Share/HeaderDashboard.vue";
import FooterDashboard from "~/components/Share/FooterDashboard.vue";
</script>

<template>
  <main>
    <HeaderDashboard/>
    <Breadcrumbs/>
    <slot></slot>
    <FooterDashboard/>
  </main>
</template>

<style scoped>

</style>