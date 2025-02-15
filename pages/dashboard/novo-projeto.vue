<script setup lang="ts">
import requestService from "~/service/requestService";
import {ca} from "cronstrue/dist/i18n/locales/ca";

definePageMeta({
  layout: 'dashboard',
  title: 'Novo Projeto',
})
useHead({
  title: 'Novo Projeto',
})

const serviceLocal = ref([
  {label: 'Qualquer lugar', value: 'anywhere'},
  {label: 'Minha Cidade', value: 'local'}
])
const projectModalities = ref([
  {label: 'Presencial', value: 'in_person'},
  {label: 'Online', value: 'online'},
  {label: 'Híbrido', value: 'hybrid'},
  {label: 'Qualquer Modalidade', value: 'any'},
])
const projectPriorities = ref([
  {label: 'Baixa', value: 'low'},
  {label: 'Média', value: 'medium'},
  {label: 'Alta', value: 'high'},
  {label: 'Urgente', value: 'urgent'},
])
const fileupload = ref(null)
const categories = ref([])
const categoriesHeader = ref([])
const selectedCategoryHeader = ref(null)
const servicesTypes = ref([])
const newProjectData = ref({
  category: null,
  title: null,
  description: null,
  priority: null,
  modality: null,
  local: null,
})

const selectCategoryHeader = () => {
  delete newProjectData.value.category
  servicesTypes.value = categories.value.filter(
      category => category.parent_id === selectedCategoryHeader.value.category_id
  )
}

// const selectCategoryProject = (event) => {
//   newProjectData.value.category = event.value
// }

const sendNewProject = () => {
  alert('Enviando projeto...')
}

const formatSize = (size) => {
  return size < 1024 ? `${size} B` :
      size < 1048576 ? `${(size / 1024).toFixed(1)} KB` :
          `${(size / 1048576).toFixed(1)} MB`;
};

const selectAttachments = (event) => {
  const files = event.files
  newProjectData.value.attachments = []
  files.map((index) => {
    newProjectData.value.attachments.push(index)
  })
}

const removeAttachment = (object) => {
  const key = newProjectData.value.attachments.findIndex(file => file.name === object.file.name && file.size === object.file.size)
  if (key !== -1) {
    newProjectData.value.attachments.splice(key, 1);
  }

  if (newProjectData.value.attachments.length < 1) {
    delete newProjectData.value.attachments
  }
}

const clearAttachments = () => {
  delete newProjectData.value.attachments
}

onBeforeMount(async () => {
  await requestService.get('/all-categories').then((response) => {
    categories.value = response?.data
  })

  categoriesHeader.value = categories.value.filter(category => category.category_header === 1)
})
</script>

<template>
  <div class="bg-white pt-10 pb-20">
    <div class="container mx-auto">
      <h1 class="text-center text-3xl font-bold text-color-1 mb-6">Novo Projeto</h1>

      <div>
        <form class="form-new-project" @submit.prevent="sendNewProject">
          <fieldset>
            <legend>Título do projeto</legend>
            <InputText v-model="newProjectData.title" class="w-full" placeholder="Título do Projeto" required />
          </fieldset>

          <fieldset class="mt-3">
            <legend>Onde será realizado o serviço?</legend>
            <Select
              :options="serviceLocal"
              v-model="newProjectData.local"
              optionLabel="label"
              optionValue="value"
              placeholder="Onde será realizado o projeto?"
              class="w-full"
              required
            />
          </fieldset>

          <fieldset class="mt-3">
            <legend>Qual será o formato da execução de serviço?</legend>
            <Select
                :options="projectModalities"
                v-model="newProjectData.modality"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione o formato"
                class="w-full"
                required
            />
          </fieldset>

          <fieldset class="mt-3">
            <legend>Qual a urgência do serviço?</legend>
            <Select
                :options="projectPriorities"
                v-model="newProjectData.priority"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione o nível de urgencia"
                class="w-full"
                required
            />
          </fieldset>

          <fieldset class="mt-3">
            <legend>Categoria do serviço</legend>
            <Select
                :options="categoriesHeader"
                v-model="selectedCategoryHeader"
                @change="selectCategoryHeader"
                optionLabel="category_name"
                placeholder="Selecione a categoria"
                class="w-full"
                required
            />
          </fieldset>

          <fieldset v-if="selectedCategoryHeader" class="mt-3">
            <legend>Serviço</legend>
            <Select
                :options="servicesTypes"
                v-model="newProjectData.category"
                optionLabel="category_name"
                placeholder="Selecione o tipo de serviço"
                class="w-full"
                required
            />
          </fieldset>

          <fieldset class="mt-3">
            <legend>Descrição do serviço</legend>
            <textarea
                class="w-full border border-slate-300 rounded-md p-3"
                rows="6"
                v-model="newProjectData.description"
                placeholder="Descreva todos os detalhes, conhecimentos e habilidades necessárias para realizar este projeto."
            ></textarea>
          </fieldset>

          <fieldset class="mt-3">
            <legend>Orçamento (Opcional)</legend>
            <span class="w-full block text-red-300 text-sm italic mb-1">Deixe em branco caso não queira informar.</span>
            <InputNumber
                v-model="newProjectData.budget"
                class="w-full"
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                placeholder="Orçamento estimado para o projeto"
            />
          </fieldset>

          <fieldset class="mt-5">
            <legend>Anexos do serviço</legend>
            <FileUpload
                name="attachments[]"
                class="!p-0"
                @select="selectAttachments($event)"
                @remove="removeAttachment($event)"
                @clear="clearAttachments"
                :multiple="true"
                accept="image/*"
                :maxFileSize="1000000"
            >
              <template #header="{ chooseCallback, clearCallback }">
                <Button class="!bg-color-1 !border-color-1" label="Selecionar" icon="pi pi-folder-open" @click="chooseCallback" />
                <Button label="Limpar" icon="pi pi-times" severity="danger" class="!bg-red-400 !border-red-400" @click="clearCallback" />
              </template>

              <template #content="{ files, removeFileCallback }">
                <div v-for="(file, index) in files" :key="index" class="file-item">
                  <Button icon="pi pi-trash" text severity="danger" @click="removeFileCallback(index)" />
                  <span>{{ file.name }}</span>
                  <Badge :value="formatSize(file.size)" class="p-badge-info !bg-color-2 ml-2" />
                </div>
              </template>

              <template #empty>
                <span>Imagens, Documentações, Arquivos...</span>
              </template>
            </FileUpload>
          </fieldset>

          <Button type="submit" label="Salvar Projeto" icon="pi pi-save" class="mt-6 !px-10"/>
        </form>
      </div>

    </div>
  </div>
</template>

<style>
.form-new-project {
  legend {
    font-size: 0.85rem;
    font-weight: bold;
  }
}
.p-fileupload {
  display: block !important;
  & span {
    margin-left: 10px;
  }
}
</style>