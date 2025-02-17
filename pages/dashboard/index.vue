<script setup>
import {authStore} from "~/store/authStore.js";
import {eventStore} from "~/store/eventStore.js";

useHead({
  title: 'Dashboard - Uuolf',
})
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth-jwt'
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

onBeforeMount(() => {
  if (!events.profileType) {
    events.profileType = auth.user.profiles[0].profile_primary
    profile.value = auth.user.profiles[0].profile_primary
  } else {
    profile.value = events.profileType
  }
})
</script>

<template>
  <client-only>
    <div class="container mx-auto py-4 pb-20">
      <div class="flex gap-3 items-center select-profile relative">
        <p class="text-lg font-bold">Olá, {{ auth?.user?.name ?? "" }}</p>

        <div>
          <Select class="!p-0" v-model="profile" @change="getProfile" :options="profiles" optionLabel="label" optionValue="value"></Select>
        </div>

        <ProgressBar v-if="events.progress" class="!absolute bottom-[-20px] left-0 w-full" mode="indeterminate" style="height: 6px"/>
      </div>

      <hr class="my-8">
      <DashboardProfessional v-if="events.profileType === 'professional'" />
      <DashboardCustomer v-else />
    </div>
  </client-only>
</template>

<style>
.select-profile {
  .p-select-label {
    padding: 2px 6px !important;
  }
}
</style>