<script setup lang="ts">
import {ref, onMounted} from 'vue'

const projects = ref([])

onMounted(() => {
  for (let i = 1; i <= 4; i++) {
    projects.value.push({
      project_id: i,
      project_name: 'Projeto '+i,
      project_price: '200'
    })
  }
})
</script>

<template>
  <section>
      <h2 class="text-xl font-bold">Meus Projetos</h2>

      <div class="grid grid-cols-2 gap-4 mt-5">
        <div
            v-for="(project, index) in projects" :key="project.project_id"
            class="shadow-lg p-5 border rounded-lg"
        >
          {{ project.project_name }}
        </div>
      </div>
  </section>
</template>

<style scoped>

</style>