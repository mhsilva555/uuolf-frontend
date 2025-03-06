<script setup lang="ts">
import requestService from "~/service/requestService";
import dateService from "~/service/dateService";
import ProjectProfessional from "~/components/ProjectProfessional.vue";

const projects = ref([])
const openDrawerFilters = ref(false)
const progress = ref(false)
const activeFilters = ref(false)

const localsFilter = ref([
  {label: 'Nenhum', value: null},
  {label: 'Qualquer Lugar', value: 'anywhere'},
  {label: 'Na Minha Cidade', value: 'my_city'},
])
const formatsFilter = ref([
  {label: 'Nenhum', value: null},
  {label: 'Online', value: 'online'},
  {label: 'Presencial', value: 'in_person'},
  {label: 'Híbrido', value: 'hybrid'},
  {label: 'Qualquer Formato', value: 'any'},
])
const priorityFilter = ref([
  {label: 'Nenhuma', value: null},
  {label: 'Baixa', value: 'low'},
  {label: 'Média', value: 'medium'},
  {label: 'Alta', value: 'high'},
  {label: 'Urgente', value: 'urgent'},
])

const filterFields = ref({
  local: null,
  priority: null,
  modality: null,
})
const queryString = ref('')

const clearFilters = () => {
  document.location.reload()
}

const makeQueryFilter = () => {
  return Object.entries(filterFields.value)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
}

const filter = () => {
  progress.value = true
  requestService.get(`/projects/all?${queryString.value}`).then((response) => {
    progress.value = false
    projects.value = response.data.data
    openDrawerFilters.value = false
    activeFilters.value = true
  })
}

watch(filterFields.value, (newValue) => {
  queryString.value = makeQueryFilter(newValue)
})

onMounted(() => {
  requestService.get('/projects/all').then((response) => {
    projects.value = response.data.data;
  })
})
</script>

<template>
  <div class="min-h-96">
    <Button @click="openDrawerFilters = true" icon="pi pi-bars" label="Filtrar" class="!p-3 !py-1 !bg-transparent !text-color-1 !border-color-1"/>
    <span class="ms-2 cursor-pointer" v-if="activeFilters" @click="clearFilters">Limpar Filtros <i class="pi pi-times"></i></span>

    <div v-if="projects.length > 0">
      <h2 class="text-xl font-bold mt-10">Serviços Disponíveis</h2>

      <div class="grid grid-cols-1 gap-4 mt-5">
        <div v-for="project in projects" :key="project.project_id">
          <ProjectProfessional :project="project" />
        </div>
      </div>
    </div>

    <div v-else class="pt-10">
      <p class="text-lg">Nenhum projeto disponível.</p>
    </div>

    <Drawer v-model:visible="openDrawerFilters">
<!--      <p class="font-bold text-sm">Local do Serviço</p>-->
<!--      <Select fluid v-model="filterFields.local" :options="localsFilter" optionLabel="label" optionValue="value" placeholder="Selecione o Local"/>-->

      <p class="font-bold text-sm mt-4">Formato do Serviço</p>
      <Select fluid v-model="filterFields.modality" :options="formatsFilter" optionLabel="label" optionValue="value" placeholder="Selecione o Formato"/>

      <p class="font-bold text-sm mt-4">Urgência do Serviço</p>
      <Select fluid v-model="filterFields.priority" :options="priorityFilter" optionLabel="label" optionValue="value" placeholder="Seleciona a Urgência"/>

      <hr class="my-5">

      <Button @click="filter" label="Filtar" icon="pi pi-filter"/>
<!--      <Button @click="clearFilters" class="ms-2" label="Limpar Filtros" icon="pi pi-times" severity="danger"/>-->

      <ProgressBar v-if="progress" mode="indeterminate" class="!h-2 mt-5" />
    </Drawer>
  </div>
</template>

<style scoped>

</style>