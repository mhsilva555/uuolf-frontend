<script setup lang="ts">
import requestService from "~/service/requestService"
import {authStore} from "~/store/authStore"

definePageMeta({
  title: 'Minha Conta',
  layout: 'dashboard',
  middleware: ['auth-jwt']
})

useHead({
  title: 'Minha Conta - Uuolf'
})

const auth = authStore()
const locations = ref([])
const profile = ref({})

onBeforeMount(() => {
  requestService.get(`/users/profile`).then((response) => {
    profile.value = response.data
  })

  requestService.get('/locations').then((response) => {
    locations.value = response.data
  })
})
</script>

<template>
  <div class="bg-white py-14 pt-0">
    <div class="container mx-auto">
      <div class="border p-5">
        <p class="font-bold text-xl">Dados Pessoais</p>
        <hr class="my-3">

        <form method="POST">
          <fieldset class="mb-2">
            <legend class="font-bold text-sm">Nome</legend>
            <InputText class="w-full" />
          </fieldset>

          <fieldset class="mb-2">
            <legend class="font-bold text-sm">E-mail</legend>
            <InputText class="w-full" />
          </fieldset>

          <fieldset class="mb-2">
            <legend class="font-bold text-sm">Telefone</legend>
            <InputText class="w-full" />
          </fieldset>

          <fieldset class="mb-2">
            <legend class="font-bold text-sm">Senha</legend>
            <InputText class="w-full" placeholder="Deixe em branco caso não queira alterar" />
          </fieldset>

          <fieldset class="mb-2">
            <legend class="font-bold text-sm">Cidade</legend>
            <Select fluid :options="locations" optionLabel="city" optionValue="location_id" />
          </fieldset>

          <Button type="submit" label="Salvar" icon="pi pi-save" class="mt-5"/>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>