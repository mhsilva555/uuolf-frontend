<script setup lang="ts">
import {useRoute} from "vue-router";
import requestService from "~/service/requestService";
import dateService from "~/service/dateService";
import stringService from "~/service/stringService";

definePageMeta({
  title: 'Servico',
  layout: "dashboard",
  middleware: "auth-jwt"
})

useHead({
  title: 'Serviço - Uuolf'
})

const route = useRoute()
const project = ref(null)
const dialogReport = ref(false)

const getLocal = (local) => {
  switch (local) {
    case 'anywhere':
      return "Qualquer lugar"
    case 'my_city':
      return "Minha Cidade"
  }
}

const getPriority = (priority) => {
  switch (priority) {
    case 'low':
      return "Baixa"
    case 'medium':
      return "Média"
    case 'high':
      return "Alta"
    case 'urgent':
      return "Urgente"
  }
}

const getModality = (modality) => {
  switch (modality) {
    case 'online':
      return "Online"
    case 'in_person':
      return "Presencial"
    case 'hybrid':
      return "Híbrido"
    case 'any':
      return "Qualquer modalidade"
  }
}

onBeforeMount(async () => {
  await requestService.get(`/project/show/${route.params.id}`).then((response) => {
    project.value = response.data
  })
})
</script>

<template>
<article class="bg-white">
  <div class="container mx-auto">
    <NuxtLink href="/dashboard" class="text-color-1 text-sm"><i class="fa-light fa-arrow-left"></i> Voltar aos projetos</NuxtLink>

    <client-only>
      <Skeleton v-if="!project" class="!h-[350px]" />

      <div v-else class="py-14 flex gap-14">
        <div class="w-8/12">
          <h2 class="text-lg lg:text-4xl font-bold mb-5">{{ project?.title }}</h2>
          <div v-html="project?.description"></div>

          <div class="pt-3" v-if="project?.attachments">
            <hr>
            <p class="font-bold text-color-1 my-3">Anexos:</p>
            <ul>
              <li class="my-1" v-for="file in project?.attachments">
                <a class="text-sm text-blue-500 hover:underline" target="_blank" :href="file.attachment_url"><i class="pi pi-paperclip"></i> {{ file.attachment_name }}</a>
              </li>
            </ul>
          </div>

          <hr class="mt-5">

          <!-- Review -->
          <div v-if="project.user.userdata_public.phone" class="mt-5 text-center flex flex-col items-center">
            <p class="text-color-1 text-2xl my-3">Avaliar Serviço</p>
            <Rating class="rating-project" />
          </div>
        </div>

        <div class="w-4/12 bg-slate-100 p-5">
          <div>
            <a
              v-if="project.user.userdata_public.phone"
              :href="`https://wa.me/55${project.user.userdata_public?.phone}`"
              target="_blank"
              class="inline-block w-full p-5 text-lg font-bold text-center rounded-lg bg-green-500 hover:bg-green-600 text-white duration-200"
            >
              <i class="fa-brands fa-whatsapp"></i>
              Falar no WhatsApp
            </a>
            
            <p class="my-5">Informações Adicionais</p>
            <ul class="additional-informations">
              <li><b>Categoria:</b> <span>{{ project?.categories.parent_category.category_name }}</span></li>
              <li><b>Subcategoria:</b> <span>{{ project?.categories.category_name }}</span></li>
              <li><b>Prioridade:</b> <span>{{ getPriority(project?.priority) }}</span></li>
              <li><b>Modalidade:</b> <span>{{ getModality(project?.modality) }}</span></li>
<!--              <li><b>Local:</b> <span>{{ getLocal(project?.local) }}</span></li>-->
              <li v-if="project.budget"><b>Orçamento estimado:</b> <span>{{ stringService.formatPrice(parseFloat(project?.budget)) }}</span></li>
              <li><b>Publicado em:</b> <span>{{ dateService.formatDate(project?.created_at) }}</span></li>
            </ul>

            <p class="my-5">Cliente</p>
            <div class="flex">
              <div class="w-4/12">
                <img width="90" height="90" class="object-cover rounded-md" src="https://placehold.co/300x300" alt="">
              </div>

              <div class="w-8/12">
                <p>{{ project.user?.name }}</p>
              </div>
            </div>
            <hr class="mt-5">

            <div v-if="project.user.userdata_public.phone">
              <p class="my-5">Moderação</p>
              <span
                  class="underline text-sm cursor-pointer"
                  @click="dialogReport = true"><i class="pi pi-flag text-sm"></i> Denunciar Serviço</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog modal v-model:visible="dialogReport" class="w-full max-w-xl" header="Denunciar Serviço">

      </Dialog>
    </client-only>
  </div>
</article>
</template>

<style>
.additional-informations {
  & li {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    font-size: 0.85rem;
  }
}
.rating-project {
  & .p-rating-icon {
    width: 25px !important;
    height: 25px !important;
  }
  & .p-rating-option svg, .p-rating-option svg path {
    transition: all 0s !important;
  }
  & .p-rating-option-active .p-rating-icon {
    color: gold !important;
  }
  & .p-rating-option svg:hover path {
    fill: gold !important;
  }
}
</style>