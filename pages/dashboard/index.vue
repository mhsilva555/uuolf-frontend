<script setup>
import {authStore} from "~/store/authStore.js";
import HeaderDashboard from "~/components/Share/HeaderDashboard.vue";

useHead({
  title: 'Dashboard - Uuolf',
})
definePageMeta({
  middleware: 'auth'
})

const auth = authStore()
const profileType = ref(null)
const profiles = ref([
  {label: 'Cliente', value: 'customer'},
  {label: 'Profissional', value: 'professional'},
])

onMounted(() => {
  profileType.value = auth.user.profile_primary
})
</script>

<template>
  <main>
    <HeaderDashboard/>

    <div class="container mx-auto py-4">
      <div class="flex gap-3 items-center select-profile">
        <p class="text-lg font-bold">Olá, {{ auth.user.name ?? "" }}</p>

        <div>
          <Select class="!p-0" v-model="profileType" :options="profiles" optionLabel="label" optionValue="value"></Select>
        </div>
      </div>

      <hr class="my-8">

      <DashboardProfessional v-if="profileType === 'professional'" />
      <DashboardCustomer v-else />
    </div>

<!--    <FooterDashboard />-->
  </main>
</template>

<style>
.select-profile {
  .p-select-label {
    padding: 2px 6px !important;
  }
}
</style>