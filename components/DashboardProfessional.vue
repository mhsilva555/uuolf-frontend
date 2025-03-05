<script setup lang="ts">
import {authStore} from "~/store/authStore";
import requestService from "~/service/requestService";
import {eventStore} from "~/store/eventStore";
import {toast} from "vue3-toastify";

const auth = authStore()
const events = eventStore()
const profileData = ref({})

const createCustomerProfile = async () => {
  await requestService.get('/profile/create/professional-profile').then((response) => {
    if (response.status === 200) {
      document.location.reload()
      return true
    }

    toast("Erro ao criar perfil", {
      type: 'error',
    })
  })
}

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
  <client-only>
    <div v-if="!profileData">
      <Skeleton class="!h-[300px]"/>
    </div>

    <div v-else>
      <div v-if="!profileData.professional_profile" class="text-center min-h-96 py-32">
        <i class="fa-thin fa-user-tie-hair text-5xl mb-2"></i>
        <p class="text-center lg:text-2xl text-neutral-500">Você não tem um perfil Profissional...</p>
        <Button @click="createCustomerProfile" class="mt-3 !bg-color-1 !border-0" icon="pi pi-plus" label="Criar Perfil Profissional" />
      </div>

      <div v-else>
        <AvailableProjects/>
      </div>
    </div>
  </client-only>
</template>

<style scoped>

</style>