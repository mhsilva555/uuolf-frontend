<script setup lang="ts">
import dateService from "~/service/dateService";

defineProps({
  project: Object
})
</script>

<template>
  <div class="shadow-lg p-6 border border-s-4 border-s-color-1 rounded-lg flex flex-wrap items-center justify-between">
    <p class="text-lg font-bold w-full mb-4">&raquo; {{ project.title }}</p>
    <p><i class="fa-light fa-calendar"></i> Criado em: {{ dateService.formatDate(project.created_at )}}</p>
    <p>Cliente: {{ project.user.name }}</p>
    <Tag :value="project.categories.category_name" icon="fa-light fa-tags" severity="info" />
    <p v-if="project.attachments.length">Contém {{ `${project.attachments.length} anexo${project.attachments.length > 1 ? 's' : ''}` }} <i class="fa-sharp fa-light fa-paperclip"></i></p>
    <p v-else>Sem anexos</p>
    <NuxtLink :href="`/servico/${project.project_id}`" class="text-color-1 hover:text-color-2 cursor-pointer border rounded-lg border-color-1 px-3 py-1">
      Ver Serviço
      <span class="fa-light fa-arrow-right"></span>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>