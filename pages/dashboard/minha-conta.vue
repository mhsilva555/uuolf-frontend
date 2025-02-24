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
  jQuery(document).on('click', '.masters', function (e) {
    e.stopPropagation()

    jQuery(this).toggleClass('active')
    jQuery(this).children().find('li').toggle(200)
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

          <div class="py-5">
            <ul>
              <li class="masters" v-for="master in categories" :key="master.category_id">
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
  border: 1px solid;
  margin-bottom: 8px;
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