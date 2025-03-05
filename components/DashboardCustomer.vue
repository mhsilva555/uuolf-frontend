<script setup lang="ts">
import requestService from "~/service/requestService";
import {eventStore} from "~/store/eventStore";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css'

const events = eventStore()
const profileData = ref(false)

const createCustomerProfile = async () => {
  await requestService.get('/profile/create/customer-profile').then((response) => {
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
      <div v-if="!profileData.customer_profile" class="text-center min-h-96 py-32">
        <i class="fa-light fa-user-plus text-5xl mb-2"></i>
        <p class="text-center lg:text-2xl text-neutral-500">Você não tem um perfil como Cliente...</p>
        <Button @click="createCustomerProfile" class="mt-3 !bg-color-1 !border-0" icon="pi pi-plus" label="Criar Perfil de Cliente" />
      </div>

      <div v-else>
        <NuxtLink href="/dashboard/novo-projeto" class="text-white p-2 px-3 duration-200 inline-block rounded-md !bg-color-1 !border-none hover:!bg-color-2"><i class="pi pi-plus"></i> Novo Projeto</NuxtLink>
        <MyProjects class="mt-5" />
      </div>
    </div>
  </client-only>
</template>

<style scoped>

</style>