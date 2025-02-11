<script setup lang="ts">
import HeaderDashboard from "~/components/Share/HeaderDashboard.vue";
</script>

<template>
  <main>
    <HeaderDashboard/>

    <div class="container mx-auto py-4">
      <NuxtLink href="/dashboard" class="text-color-1">
        <i class="fa-duotone fa-light fa-arrow-left"></i> Voltar
      </NuxtLink>

      <div class="project py-10">
        <h2 class="text-3xl font-bold">Nome do Projeto</h2>

        <Textarea rows="10" class="w-full my-5"/>

        <Button type="submit" icon="fa-light fa-save" label="Salvar Projeto" />
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>