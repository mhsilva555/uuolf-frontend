<script setup>
import {authStore} from "~/store/authStore.js";
import {eventStore} from "~/store/eventStore.js";
import HeaderDashboard from "~/components/Share/HeaderDashboard.vue";

useHead({
  title: 'Dashboard - Uuolf',
})
definePageMeta({
  middleware: 'auth'
})

const getProfile = async () => {
  events.progress = true
  events.profileType = profile.value
}

const profile = ref('')
const auth = authStore()
const events = eventStore()
const profiles = ref([
  {label: 'Cliente', value: 'customer'},
  {label: 'Profissional', value: 'professional'},
])

onMounted(() => {
  if (!events.profileType) {
    events.profileType = auth.user.profile_primary
    profile.value = auth.user.profile_primary
  } else {
    profile.value = events.profileType
  }
})
</script>

<template>
  <main>
    <HeaderDashboard/>

    <div class="container mx-auto py-4">
      <div class="flex gap-3 items-center select-profile relative">
        <p class="text-lg font-bold">Olá, {{ auth.user.name ?? "" }}</p>

        <div>
          <Select class="!p-0" v-model="profile" @change="getProfile" :options="profiles" optionLabel="label" optionValue="value"></Select>
        </div>

        <ProgressBar v-if="events.progress" class="!absolute bottom-[-20px] left-0 w-full" mode="indeterminate" style="height: 6px"/>
      </div>

      <hr class="my-8">
      <DashboardProfessional v-if="events.profileType === 'professional'" />
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