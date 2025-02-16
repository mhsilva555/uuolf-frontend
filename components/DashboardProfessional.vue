<script setup lang="ts">
import {authStore} from "~/store/authStore";
import requestService from "~/service/requestService";
import {eventStore} from "~/store/eventStore";

const auth = authStore()
const events = eventStore()
const profileData = ref({})

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
        <i class="fa-thin fa-user-tie-hair text-5xl mb-2"></i>
        <p class="text-center lg:text-2xl text-neutral-500">Você não tem um perfil Profissional...</p>
        <Button class="mt-3 !bg-color-1 !border-0" icon="pi pi-plus" label="Criar Perfil Profissional" />
      </div>

      <div v-else>
        <h1>Profissional</h1>
      </div>
    </div>
  </lazy-client-only>
</template>

<style scoped>

</style>