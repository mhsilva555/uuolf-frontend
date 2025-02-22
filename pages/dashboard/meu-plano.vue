<script setup lang="ts">
import requestService from "~/service/requestService"
import stringService from "~/service/stringService"

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
      subscription.value = response.data ?? {}
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
<div class="bg-white py-14">
  <div class="container mx-auto">
    <client-only v-if="subscription.plan">
      <div class="p-3 shadow-xl border rounded-lg">
        <h2 class="text-3xl font-bold">{{ subscription.plan.plan_name }}</h2>
        <p>{{ subscription.plan?.plan_description }}</p>
        <p>{{ stringService.formatPrice(subscription.plan.plan_price) }}</p>
        <p v-if="!subscription.end_subscription"></p>
        <p>Sem expiração</p>
      </div>
    </client-only>
  </div>
</div>
</template>

<style scoped>

</style>