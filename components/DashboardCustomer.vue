<script setup lang="ts">
import requestService from "~/service/requestService";
import {eventStore} from "~/store/eventStore";

const events = eventStore()
const profileData = ref(false)

onBeforeMount(async () => {
  await requestService.get(`/profile/${events.profileType}`).then((response) => {
    events.progress = false
    if (response.data) {
      profileData.value = response.data
    }
  })
})
</script>

<template>
  <lazy-client-only>
    <div v-if="!profileData">
      <Skeleton class="!h-[300px]"/>
    </div>

    <div v-else>
      <div v-if="!profileData.profile_id" class="text-center min-h-96 py-32">
        <i class="fa-light fa-user-plus text-5xl mb-2"></i>
        <p class="text-center lg:text-2xl text-neutral-500">Você não tem um perfil como Cliente...</p>
        <Button class="mt-3 !bg-color-1 !border-0" icon="pi pi-plus" label="Criar Perfil de Cliente" />
      </div>

      <div v-else>
        <NuxtLink href="/dashboard/novo-projeto" class="text-white p-2 px-3 duration-200 inline-block rounded-md !bg-color-1 !border-none hover:!bg-color-2"><i class="pi pi-plus"></i> Novo Projeto</NuxtLink>
        <MyProjects class="mt-5" />
      </div>
    </div>
  </lazy-client-only>
</template>

<style scoped>

</style>