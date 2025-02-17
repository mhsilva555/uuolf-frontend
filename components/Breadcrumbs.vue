<script setup lang="ts">
import {useRoute} from "vue-router"
const router = useRoute()
</script>

<template>
<div class="bg-white text-color-1">
  <ul class="breadcrumbs container mx-auto py-8 flex">
    <li><NuxtLink href="/dashboard"><i class="pi pi-home"></i> Dashboard</NuxtLink></li>
    <li v-if="router.name !== 'dashboard'"><NuxtLink class="text-color-2 font-bold" :href="router?.path">{{router.meta.title}}</NuxtLink></li>
  </ul>
</div>
</template>

<style scoped>
.breadcrumbs {
  li:not(:last-child)::after {
    content: '/';
    margin: 0 5px;
  }
}
</style>