<script setup lang="ts">
import requestService from "~/service/requestService";
import {useRoute} from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import stringService from "../../../service/stringService";
import {toast} from "vue3-toastify"
import 'vue3-toastify/dist/index.css'

definePageMeta({
  layout: 'dashboard',
})

const confirm = useConfirm()
const route = useRoute()
const project = ref({})
const serviceLocal = ref([
  {label: 'Qualquer lugar', value: 'anywhere'},
  {label: 'Minha Cidade', value: 'my_city'}
])
const projectModalities = ref([
  {label: 'Presencial', value: 'in_person'},
  {label: 'Online', value: 'online'},
  {label: 'Híbrido', value: 'hybrid'},
  {label: 'Qualquer Formato', value: 'any'},
])
const projectPriorities = ref([
  {label: 'Baixa', value: 'low'},
  {label: 'Média', value: 'medium'},
  {label: 'Alta', value: 'high'},
  {label: 'Urgente', value: 'urgent'},
])
const loading = ref(false)
const fileUpload = ref(null)
const categories = ref([])
const categoriesHeader = ref([])
const selectedCategoryHeader = ref(null)
const servicesTypes = ref([])
const saveProjectData = ref({
  category: null,
  title: null,
  description: null,
  priority: null,
  modality: null,
  local: null,
})
const attachments = ref([])
const newAttachments = ref([])
const selectedDeleteAttachment = ref({})

const selectCategoryHeader = () => {
  delete saveProjectData.value.category
  servicesTypes.value = categories.value.filter(
      category => category.parent_id === selectedCategoryHeader.value.category_id
  )
}

const formatSize = (size) => {
  return size < 1024 ? `${size} B` :
      size < 1048576 ? `${(size / 1024).toFixed(1)} KB` :
          `${(size / 1048576).toFixed(1)} MB`;
};

const selectAttachments = (event) => {
  const files = event.files
  newAttachments.value = files
}

const removeAttachment = (object) => {
  const key = saveProjectData.value.attachments.findIndex(file => file.name === object.file.name && file.size === object.file.size)
  if (key !== -1) {
    saveProjectData.value.attachments.splice(key, 1);
  }

  if (saveProjectData.value.attachments.length < 1) {
    delete saveProjectData.value.attachments
  }
}

const clearAttachments = () => {
  delete saveProjectData.value.attachments
}

const saveProject = () => {
  requestService.post('/project/update', {
    project_id: route.params.id,
    projectData: saveProjectData.value,
    attachments: attachments.value,
    newAttachments: newAttachments.value
  }, {
    'Content-Type': 'multipart/form-data'
  }).then((response) => {
    if (response.data.status === 200) {
      toast("Projeto atualizado com sucesso!", {
        type: "success"
      })

      if (response.data.hasNewFiles) {
        fileUpload.value.clear()
        fileUpload.value.uploadedFileCount = 0
        updateAttachments()
      }

      return true
    }

    toast("Erro ao atualizar projeto!", {
      type: "error"
    })
  })
}

const updateAttachments = () => {
  requestService.get(`/attachment/project/${project.value.project_id}`).then((response) => {
    attachments.value = response.data
  })
}

const confirmDelete = (attachment) => {
  selectedDeleteAttachment.value = attachment
  confirm.require({
    message: 'Deseja remover este anexo?',
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
      requestService.get(`/attachment/delete/${selectedDeleteAttachment.value.attachment_id}`).then((response) => {
        if (response.data.status === 200) {
          toast("Anexo removido com sucesso", {
            type: "success"
          })
          selectedDeleteAttachment.value = {}
          updateAttachments()
          return true
        }
      })
    },
    reject: () => {}
  });
};

watch(() => saveProjectData.value.budget, (newValue) => {
  if (!newValue) {
    delete saveProjectData.value.budget
  }
})

onBeforeMount(async () => {
  await requestService.get(`/project/edit/${route.params.id}`).then((response) => {
    if (response.status === 400 || response.status === 401) {
      return navigateTo('/dashboard')
    }

    project.value = response.data
    selectedCategoryHeader.value = response.data.categories.parent_category
    saveProjectData.value = {
      project_id: response.data.project_id,
      title: response.data.title,
      local: response.data.local,
      modality: response.data.modality,
      priority: response.data.priority,
      category: response.data.categories.category_id,
      description: response.data.description
    }
    attachments.value = response.data.attachments

    if (response.data.budget) {
      saveProjectData.value.budget = response.data.budget
    }
  })

  await requestService.get('/all-categories').then((response) => {
    categories.value = response?.data
  })

  categoriesHeader.value = categories.value.filter(category => category.category_header === 1)
  servicesTypes.value = categories.value.filter(
      category => category.parent_id === selectedCategoryHeader.value.category_id
  )
})
</script>

<template>
  <div class="bg-white pt-4 pb-14">
    <div class="container mx-auto">
      <div class="project">
        <client-only>
          <form class="form-new-project" id="form-new-project" enctype="multipart/form-data" @submit.prevent="saveProject">
            <fieldset>
              <legend>Título do projeto *</legend>
              <InputText v-model="saveProjectData.title" class="w-full !bg-white" placeholder="Título do Projeto" required />
            </fieldset>

            <fieldset class="mt-3">
              <legend>Onde será realizado o serviço? *</legend>
              <Select
                  :options="serviceLocal"
                  v-model="saveProjectData.local"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Onde será realizado o projeto?"
                  class="w-full !bg-white"
              />
            </fieldset>

            <fieldset class="mt-3">
              <legend>Qual será o formato da execução de serviço? *</legend>
              <Select
                  :options="projectModalities"
                  v-model="saveProjectData.modality"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Selecione o formato"
                  class="w-full !bg-white"
              />
            </fieldset>

            <fieldset class="mt-3">
              <legend>Qual a urgência do serviço? *</legend>
              <Select
                  :options="projectPriorities"
                  v-model="saveProjectData.priority"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Selecione o nível de urgencia"
                  class="w-full !bg-white"
                  required
              />
            </fieldset>

            <fieldset class="mt-3">
              <legend>Categoria do serviço *</legend>
              <Select
                  :options="categoriesHeader"
                  v-model="selectedCategoryHeader"
                  @change="selectCategoryHeader"
                  optionLabel="category_name"
                  placeholder="Selecione a categoria"
                  class="w-full !bg-white"
              />
            </fieldset>

            <fieldset v-if="selectedCategoryHeader" class="mt-3">
              <legend>Serviço *</legend>
              <Select
                  :options="servicesTypes"
                  v-model="saveProjectData.category"
                  optionLabel="category_name"
                  optionValue="category_id"
                  placeholder="Selecione o tipo de serviço"
                  class="w-full !bg-white"
              />
            </fieldset>

            <fieldset class="mt-3">
              <legend>Descrição do serviço *</legend>
              <Editor
                  v-model="saveProjectData.description"
                  editorStyle="height: 320px; background: #ffffff !important;"
                  placeholder="Descreva todos os detalhes, conhecimentos e habilidades necessárias para realizar este projeto."
              />
            </fieldset>

            <fieldset class="mt-3">
              <legend>Orçamento (Opcional)</legend>
              <span class="w-full block text-red-300 text-sm italic mb-1">Deixe em branco caso não queira informar.</span>
              <InputNumber
                  v-model="saveProjectData.budget"
                  class="w-full !bg-white"
                  mode="currency"
                  currency="BRL"
                  locale="pt-BR"
                  placeholder="Orçamento estimado para o projeto"
              />
            </fieldset>

            <fieldset class="mt-5">
              <legend>Anexos do serviço (Opcional)</legend>
              <FileUpload
                  name="attachments[]"
                  ref="fileUpload"
                  class="!p-0 !bg-white dark:!bg-white"
                  @select="selectAttachments($event)"
                  @remove="removeAttachment($event)"
                  @clear="clearAttachments"
                  :multiple="true"
                  accept="image/*,
                  application/pdf,
                  application/msword,
                  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                  application/vnd.ms-excel,
                  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                  text/plain,
                  application/zip,
                  application/x-rar-compressed,
                  application/vnd.rar"
                  :maxFileSize="10000000"
                  invalidFileSizeMessage="{0}: Tamanho de arquivo inválido, o tamanho deve ser menor que {1}."
              >
                <template #header="{ chooseCallback, clearCallback }">
                  <Button class="!bg-color-1 !text-white !p-1 !px-2 !border-color-1" label="Selecionar" icon="pi pi-folder-open" @click="chooseCallback" />
                  <Button class="!bg-red-400 !text-white !p-1 !px-2 !border-red-400" label="Limpar" icon="pi pi-times" severity="danger" @click="clearCallback" />
                </template>

                <template #content="{ files, removeFileCallback }">
                  <div v-for="(file, index) in files" :key="index" class="file-item !bg-white">
                    <Button icon="pi pi-trash" text severity="danger" @click="removeFileCallback(index)" />
                    <span class="text-color-1">{{ file.name }}</span>
                    <Badge :value="formatSize(file.size)" class="p-badge-info !bg-color-2 ml-2" />
                  </div>
                </template>

                <template #empty>
                  <span class="text-color-1">Imagens, Documentações, Arquivos...</span>
                </template>
              </FileUpload>
            </fieldset>

            <fieldset class="mt-3 max-w-[400px]">
              <legend>Anexos Existentes</legend>
              <ul v-if="attachments.length > 0">
                <li v-for="attach in attachments" :key="attach.attachment_id" class="flex items-center gap-5 my-2 text-sm">
                  <p class="grow">
                    <a target="_blank" class="underline text-blue-500" :href="attach.attachment_url"><i class="pi pi-file"></i> {{ stringService.shortString(attach.attachment_name, 35) }}</a>
                  </p>
                  <span @click="confirmDelete(attach)" class="pi pi-trash text-red-500"></span>
                </li>
              </ul>
            </fieldset>
            <ConfirmDialog></ConfirmDialog>

            <Button type="submit" label="Salvar Projeto" icon="pi pi-save" class="mt-6 !px-10"/>
          </form>
        </client-only>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>