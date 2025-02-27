<script setup lang="ts">
import requestService from "~/service/requestService"
import {authStore} from "~/store/authStore"
import jQuery from 'jquery'

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
const categories = ref([])

const openCategory = (event) => {
  jQuery(event.currentTarget).toggleClass('active')
  jQuery(event.currentTarget).children().find('li').toggle(200)
}

onBeforeMount(() => {
  requestService.get(`/users/profile`).then((response) => {
    profile.value = response.data
  })

  requestService.get('/locations').then((response) => {
    locations.value = response.data
  })

  requestService.get('/alls-categories').then((response) => {
    categories.value = response.data
  })
})

onMounted(() => {
  requestService.get(`/users/profile`).then((response) => {
    console.log(response.data)
  })
})
</script>

<template>
  <div class="bg-white py-14 pt-0">
    <div class="container mx-auto">
      <div class="border p-5">
        <p class="font-bold text-xl">Dados Pessoais</p>
        <hr class="my-3">

        <form method="POST" class="flex flex-wrap">
          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">Nome</legend>
            <InputText class="w-full" />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">E-mail</legend>
            <InputText class="w-full" />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">Telefone</legend>
            <InputText class="w-full" />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">CPF/CNPJ</legend>
            <InputText class="w-full" />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">Data de Nascimento</legend>
            <DatePicker class="w-full" />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">Cidade</legend>
            <Select fluid :options="locations" optionLabel="city" optionValue="location_id" />
          </fieldset>

          <fieldset class="mb-2 w-full px-2">
            <legend class="font-bold text-sm">Endereço Completo</legend>
            <InputText class="w-full" placeholder="Rua, Número, Bairro, CEP" />
          </fieldset>

          <fieldset class="mb-2 w-full px-2">
            <legend class="font-bold text-sm">Senha</legend>
            <InputText class="w-full" placeholder="Deixe em branco caso não queira alterar" />
          </fieldset>

          <fieldset class="mb-2 w-full px-2">
            <legend class="font-bold text-sm">Resumo Profissional</legend>
            <Textarea rows="8" class="w-full" placeholder="Descreva a sua história e suas habilidades" />
          </fieldset>

          <fieldset class="mb-2 w-full px-2">
            <legend class="font-bold text-sm">Foto de Perfil</legend>
            <FileUpload mode="basic"/>
          </fieldset>

          <div class="py-5 w-full px-2">
            <p class="text-xl font-bold">Áreas de Interesse</p>
            <hr class="my-3" />
            <ul>
              <li @click="openCategory($event)" class="masters" v-for="master in categories" :key="master.category_id">
                <p class="font-bold text-lg">{{ master.category_name }}</p>
                <ul class="ps-2">
                  <li class="headers" v-for="headers in master.children" :key="headers.category_id">
                    <p class="italic">{{ headers.category_name }}</p>
                    <ul>
                      <li class="childrens" v-for="children in headers.children" :key="children.category_id">
                        <input type="checkbox"> {{ children.category_name }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <Button type="submit" label="Salvar" icon="pi pi-save" class="mt-5"/>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
li {
  padding: 10px;
}
li.masters {
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.1);
  &.active {
    background: #eeeeee;
  }
}
li:not(.masters) {
  display: none;
}
li.childrens {
  padding: 5px;
}
</style>