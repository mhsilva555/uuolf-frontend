<script setup>
import { ref } from 'vue'
import HeaderDashboard from "~/components/Share/HeaderDashboard.vue";
import FooterDashboard from "~/components/Share/NavDashboard.vue";
import NavDashboard from "~/components/Share/NavDashboard.vue";

const profileType = ref('customer')
</script>

<template>
  <main>
    <HeaderDashboard/>

    <div class="container mx-auto py-4 px-8">
      <DashboardProfessional v-if="profileType === 'professional'" />
      <DashboardCustomer v-else />
    </div>

    <NavDashboard/>
  </main>
</template>

<style scoped>

</style>