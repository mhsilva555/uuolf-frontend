<script setup lang="ts">
import requestService from "~/service/requestService";
import dateService from "~/service/dateService";
import ProjectProfessional from "~/components/ProjectProfessional.vue";

const projects = ref([])

onMounted(() => {
  requestService.get('/projects/all').then((response) => {
    projects.value = response.data;
  })
})
</script>

<template>
  <div class="min-h-96">
    <Button icon="pi pi-bars" label="Filtrar" class="!p-3 !py-1 !bg-transparent !text-color-1 !border-color-1"/>

    <h2 class="text-xl font-bold mt-10">Projetos Disponíveis</h2>

    <div v-if="projects.length" class="grid grid-cols-1 gap-4 mt-5">
      <div v-for="project in projects" :key="project.project_id">
        <ProjectProfessional :project="project" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>