<script setup lang="ts">
import requestService from "~/service/requestService"
import {toast} from "vue3-toastify"
import 'vue3-toastify/dist/index.css'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth-jwt',
  title: 'Novo Projeto',
})
useHead({
  title: 'Novo Projeto',
})

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
const newProjectData = ref({
  category: null,
  title: null,
  description: null,
  priority: null,
  modality: null,
  zone: null,
  location_id: null
  //local: null,
})
const zone = ref([
  {label: 'Urbana', value: 'urbana'},
  {label: 'Rural', value: 'rural'},
])
const cities = ref([])

const selectCategoryHeader = () => {
  delete newProjectData.value.category
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
  newProjectData.value.attachments = files
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

const sendNewProject = async () => {
  if (Object.values(newProjectData.value).some(value => !value)) {
    toast("Preecha todos os campos marcados com (*)", {
      type: "warning"
    })
    return false
  }

  loading.value = true
  try {
    await requestService.post('/project/store', newProjectData.value, {
      'Content-Type': 'multipart/form-data'
    }).then((response) => {
      loading.value = false
      if (response.data && response.data.status === 200) {
        toast("Projeto cadastrado com sucesso!", {type: "success"})
        newProjectData.value = {
          category: null,
          title: null,
          description: null,
          priority: null,
          modality: null,
          //local: null,
        }
        fileUpload.value.clear()
        fileUpload.value.uploadedFileCount = 0
        navigateTo(`/dashboard/edit-project/${response.data.project.project_id}`)
        return true
      }
      toast("Erro ao criar projeto! Por favor, verifique os dados informados ou contate o suporte.", {type: "error"})
    })
  } catch (e) {
    console.error(e)
  }
}

const getCities = () => {
  requestService.get('/locations').then((response) => {
    cities.value = response.data
  })
}

watch(() => newProjectData.value.budget, (newValue) => {
  if (!newValue) {
    delete newProjectData.value.budget
  }
})

onBeforeMount(async () => {
  await getCities()

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
        <form class="form-new-project" id="form-new-project" enctype="multipart/form-data" @submit.prevent="sendNewProject">
          <fieldset>
            <legend>Título do projeto *</legend>
            <InputText v-model="newProjectData.title" class="w-full !bg-white" placeholder="Título do Projeto" required />
          </fieldset>

<!--          <fieldset class="mt-3">-->
<!--            <legend>Onde será realizado o serviço? *</legend>-->
<!--            <Select-->
<!--              :options="serviceLocal"-->
<!--              v-model="newProjectData.local"-->
<!--              optionLabel="label"-->
<!--              optionValue="value"-->
<!--              placeholder="Onde será realizado o projeto?"-->
<!--              class="w-full !bg-white"-->
<!--            />-->
<!--          </fieldset>-->

          <fieldset class="mt-3">
            <legend>Cidade *</legend>
            <Select
                :options="cities"
                v-model="newProjectData.location_id"
                optionLabel="city"
                optionValue="location_id"
                placeholder="Selecione a cidade"
                class="w-full !bg-white"
                required
            />
          </fieldset>

          <fieldset class="mt-3">
            <legend>Zona *</legend>
            <Select
                :options="zone"
                v-model="newProjectData.zone"
                optionLabel="label"
                optionValue="value"
                placeholder="Zona"
                class="w-full !bg-white"
                required
            />
          </fieldset>

          <fieldset class="mt-3">
            <legend>Qual será o formato da execução de serviço? *</legend>
            <Select
                :options="projectModalities"
                v-model="newProjectData.modality"
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
                v-model="newProjectData.priority"
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
                v-model="newProjectData.category"
                optionLabel="category_name"
                placeholder="Selecione o tipo de serviço"
                class="w-full !bg-white"
            />
          </fieldset>

          <fieldset class="mt-3">
            <legend>Descrição do serviço *</legend>
            <Editor
                v-model="newProjectData.description"
                editorStyle="height: 320px; background: #ffffff !important;"
                placeholder="Descreva todos os detalhes, conhecimentos e habilidades necessárias para realizar este projeto."
            />
          </fieldset>

          <fieldset class="mt-3">
            <legend>Orçamento (Opcional)</legend>
            <span class="w-full block text-red-300 text-sm italic mb-1">Deixe em branco caso não queira informar.</span>
            <InputNumber
                v-model="newProjectData.budget"
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

          <Button type="submit" label="Salvar Projeto" icon="pi pi-save" class="mt-6 !px-10"/>
        </form>
      </div>

      <div v-if="loading" class="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.6)]">
        <ProgressSpinner/>
      </div>

    </div>
  </div>
</template>

<style>
.p-inputnumber {
  .p-inputtext {
    background: #ffffff !important;
  }
}
.p-editor-toolbar {
  background: #EEEEEE !important;
}
.p-editor-content {
  background: #ffffff !important;
}
.ql-image {
  display: none !important;
}
.p-editor .p-editor-content .ql-editor {
  background: #ffffff !important;
  color: #13213c !important;
  font-size: 1rem !important;
  a {
    color: cornflowerblue !important;
  }
}
.ql-snow .ql-tooltip input[type="text"] {
  background: #ffffff !important;
}
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