<script setup lang="ts">
import {authStore} from "~/store/authStore";
import dateService from "~/service/dateService";
import {ref, onMounted} from 'vue'
import requestService from "~/service/requestService";

const auth = authStore()
const projects = ref([])

const getStatus = (status) => {
  switch (status) {
    case 'approved':
      return 'Aprovado'
    case 'pending':
      return 'Pendente'
    case 'rejected':
      return 'Rejeitado'
    case 'completed':
      return 'Finalizado'
  }
}

onMounted(() => {
  requestService.get('/projects/user').then((response) => {
    projects.value = response.data
  })
})
</script>

<template>
  <lazy-client-only>
    <section class="py-10">
        <h2 class="text-xl font-bold">Meus Projetos</h2>

        <div class="grid grid-cols-1 gap-4 mt-5">
          <div
              v-for="project in projects" :key="project.project_id"
              class="shadow-lg p-6 border border-s-4 border-s-color-1 rounded-lg flex flex-wrap items-center justify-between"
          >
            <p class="text-lg font-bold w-full mb-4">&raquo; {{ project.title }}</p>
            <p><i class="fa-light fa-calendar"></i> Criado em: {{ dateService.formatDate(project.created_at )}}</p>
            <p>Status: <Tag severity="success" icon="fa-sharp fa-light fa-circle-info">{{ getStatus(project.status) }}</Tag></p>
            <Tag :value="project.categories.category_name" icon="fa-light fa-tags" severity="info" />
            <p v-if="project.attachments.length">Contém {{project.attachments.length}} anexos <i class="fa-sharp fa-light fa-paperclip"></i></p>
            <p v-else>Sem anexos</p>
            <NuxtLink href="/dashboard/project-teste" class="text-color-1 hover:text-color-2 cursor-pointer">
              Mais Detalhes
              <span class="fa-light fa-plus"></span>
            </NuxtLink>
          </div>
        </div>
    </section>
  </lazy-client-only>
</template>

<style scoped>

</style>