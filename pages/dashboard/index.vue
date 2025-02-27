<script setup>
import {eventStore} from "~/store/eventStore.js";

useHead({
  title: 'Dashboard - Uuolf',
})
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth-jwt'
})

const events = eventStore()
</script>

<template>
  <client-only>
    <div class="container mx-auto py-4 pb-20">
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