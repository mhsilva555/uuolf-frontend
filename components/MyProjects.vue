<script setup lang="ts">
import {ref, onMounted} from 'vue'

const projects = ref([])

onMounted(() => {
  for (let i = 1; i <= 4; i++) {
    projects.value.push({
      project_id: i,
      project_name: 'Desenvolvimento de Site Institucional '+i,
      project_price: '200',
      project_category: 'Categoria',
    })
  }
})
</script>

<template>
  <section>
      <h2 class="text-xl font-bold">Meus Projetos</h2>

      <div class="grid grid-cols-1 gap-4 mt-5">
        <div
            v-for="(project, index) in projects" :key="project.project_id"
            class="shadow-lg p-6 border border-s-4 border-s-color-1 rounded-lg flex flex-wrap items-center justify-between"
        >
          <p class="text-lg font-bold w-full mb-1">&raquo; {{ project.project_name }}</p>
          <p><i class="fa-light fa-calendar"></i> Criado em: 10/02/2025</p>
          <Tag value="Aberto" severity="success" icon="fa-sharp fa-light fa-circle-info" />
          <Tag :value="project.project_category" icon="fa-light fa-tags" severity="info" />
          <p class="text-color-1 hover:text-color-2 cursor-pointer">
            Mais Detalhes
            <span class="fa-light fa-plus"></span>
          </p>
        </div>
      </div>
  </section>
</template>

<style scoped>

</style>