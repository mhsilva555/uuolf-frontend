<script setup lang="ts">
import {authStore} from "~/store/authStore";
import dateService from "~/service/dateService";
import {ref, onMounted} from 'vue'
import requestService from "~/service/requestService";
import { useConfirm } from "primevue/useconfirm";
import {toast} from "vue3-toastify";

const confirm = useConfirm()
const auth = authStore()
const projects = ref([])
const selectedDeleteProject = ref({})

const getProjects = async () => {
  await requestService.get('/projects/user').then((response) => {
    projects.value = response.data
  })
}

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

const confirmDelete = (project) => {
  selectedDeleteProject.value = project
  confirm.require({
    message: 'Deseja remover este projeto?',
    header: 'Confirmação',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Sim, excluir'
    },
    accept: () => {
      requestService.get(`/project/delete/${selectedDeleteProject.value.project_id}`).then((response) => {
        if (response.data.status === 200) {
          toast("Projeto removido com sucesso", {
            type: "success"
          })
          selectedDeleteProject.value = {}
          return true
        }

        toast("Erro ao remover projeto", {
          type: "error"
        })
      })
    },
    reject: () => {}
  });
};

onMounted(async () => {
  await getProjects()
})
</script>

<template>
  <client-only>
    <section class="py-10 min-h-96">
        <h2 class="text-xl font-bold">Meus Projetos</h2>

        <div v-if="projects.length" class="grid grid-cols-1 gap-4 mt-5">
          <div
              v-for="project in projects" :key="project.project_id"
              class="shadow-lg p-6 border border-s-4 border-s-color-1 rounded-lg flex flex-wrap items-center justify-between"
          >
            <p class="text-lg font-bold w-full mb-4">&raquo; {{ project.title }}</p>
            <p><i class="fa-light fa-calendar"></i> Criado em: {{ dateService.formatDate(project.created_at )}}</p>
            <p>Status: <Tag severity="success" icon="fa-sharp fa-light fa-circle-info">{{ getStatus(project.status) }}</Tag></p>
            <Tag :value="project.categories.category_name" icon="fa-light fa-tags" severity="info" />
            <p v-if="project.attachments.length">Contém {{ `${project.attachments.length} anexo${project.attachments.length > 1 ? 's' : ''}` }} <i class="fa-sharp fa-light fa-paperclip"></i></p>
            <p v-else>Sem anexos</p>
            <div class="flex gap-5 flex-wrap">
              <NuxtLink :href="`/dashboard/edit-project/${project.project_id}`" class="hover:text-color-2 cursor-pointer text-blue-500">
                Editar
                <span class="fa-light fa-pencil"></span>
              </NuxtLink>

              <span class="text-red-500 cursor-pointer" @click="confirmDelete(project)">
                Excluir
                <i class="pi pi-trash"></i>
              </span>
            </div>
          </div>
          <ConfirmDialog></ConfirmDialog>
        </div>

        <div class="pt-10 text-center" v-else>
          <p class="text-2xl text-neutral-400 mb-2">Você ainda não tem projetos publicados.</p>
          <span>Crie um <NuxtLink class="underline font-semibold" href="/dashboard/novo-projeto">novo projeto <i class="pi pi-plus text-xs"></i></NuxtLink></span>
        </div>
    </section>
  </client-only>
</template>

<style scoped>

</style>