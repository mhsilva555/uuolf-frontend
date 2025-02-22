<script setup lang="ts">
import requestService from "~/service/requestService"
definePageMeta({
  layout: 'dashboard',
  //middleware: ['auth-jwt', 'professional-access'],
  title: 'Meu Plano',
})

useHead({
  title: 'Meu Plano - Uuolf'
})

const subscription = ref({})

onBeforeMount(async () => {
  try {
    await requestService.get('/user/subscriptions').then((response) => {
      subscription.value = response.data
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
<div class="bg-white py-14">
  <div class="container mx-auto">
    <lazy-client-only>
      <div class="p-3 shadow-xl border rounded-md">
        <h2 class="text-4xl font-bold">{{ subscription.plan?.plan_name }}</h2>
      </div>
    </lazy-client-only>
  </div>
</div>
</template>

<style scoped>

</style>