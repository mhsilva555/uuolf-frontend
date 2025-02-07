<script setup>
useHead({
  title: 'Dashboard - Uuolf',
})
definePageMeta({
  middleware: 'auth'
})

import { ref } from 'vue'
import HeaderDashboard from "~/components/Share/HeaderDashboard.vue";
import FooterDashboard from "~/components/Share/NavDashboard.vue";
import NavDashboard from "~/components/Share/NavDashboard.vue";

const profileType = ref('customer')
</script>

<template>
  <main>
    <HeaderDashboard/>

    <div class="container mx-auto py-4">
      <div class="inline-block border px-2 py-1 rounded">Perfil: <b>Cliente</b></div>

      <DashboardProfessional v-if="profileType === 'professional'" />
      <DashboardCustomer v-else />
    </div>
  </main>
</template>

<style scoped>

</style>