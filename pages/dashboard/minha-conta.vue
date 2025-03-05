<script setup lang="ts">
import requestService from "~/service/requestService"
import {authStore} from "~/store/authStore"
import jQuery from 'jquery'
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css'

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
const userCategories = ref([])
const userData = ref({
  name: null,
  email: null,
  phone: null,
  document: null,
  birthday: null,
  location_id: null,
  address: null,
  resume: null,
})
const photo = ref()

const openCategory = (event) => {
  if (['masters', 'title-masters'].some(className => event.target.classList.contains(className))) {
    jQuery(event.currentTarget).toggleClass('active')
    jQuery(event.currentTarget).children().find('li').toggle(200)
  }
}

const checkCategory = (event) => {
  if (userCategories.value.length > 6) {
    toast("Você pode selecionar até 5 áreas de interesse!", {
      type: "warning",
      position: "top-left"
    })
    jQuery(event.target).prop('checked', false)
    userCategories.value.splice(userCategories.value.indexOf(jQuery(event.target).val()), 1)
    return false
  }
}

const changePhoto = (event) => {
  photo.value = event.files[0]
}

const saveProfile = async () => {
  await requestService.post('/users/update', {
    userdata: userData.value,
    categories: userCategories.value,
    photo: photo.value
  }, {
    'Content-Type': 'multipart/form-data'
  }).then((response) => {
    console.log(response)
    if (response.status === 200) {
      document.location.reload()
    }
  })
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

watch(() => userData.value.password, (newValue) => {
  if (newValue === "") {
    delete userData.value.password
  }
})

onMounted(() => {
  requestService.get(`/users/profile`).then((response) => {
    response.data.categories.map((index) => {
      userCategories.value.push(index.category_id)
    })
    userData.value = {
      name: response.data.name,
      email: response.data.email,
      phone: response.data.userdata.phone,
      document: response.data.userdata.document,
      birthday: response.data.userdata.birthday,
      location_id: response.data.userdata.location_id,
      address: response.data.userdata.address,
      resume: response.data.userdata.resume,
      photo: response.data.userdata.photo,
      removePhoto: false,
    }
  })
})
</script>

<template>
  <div class="bg-white py-14 pt-0">
    <div class="container mx-auto">
      <div class="border p-5">
        <p class="font-bold text-xl">Dados Pessoais</p>
        <hr class="my-3">

        <form method="POST" enctype="multipart/form-data" @submit.prevent="saveProfile" class="flex flex-wrap">
          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">Nome</legend>
            <InputText v-model="userData.name" class="w-full" required />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">E-mail</legend>
            <InputText v-model="userData.email" class="w-full" required />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">Telefone</legend>
            <InputText v-model="userData.phone" class="w-full" required />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">CPF</legend>
            <InputText v-keyfilter.int maxlength="11" v-model="userData.document" class="w-full" required />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">Data de Nascimento</legend>
            <input type="date" v-model="userData.birthday" class="w-full p-2 border rounded-md" required />
          </fieldset>

          <fieldset class="mb-2 w-4/12 px-2">
            <legend class="font-bold text-sm">Cidade</legend>
            <Select v-model="userData.location_id" fluid :options="locations" optionLabel="city" optionValue="location_id" required />
          </fieldset>

          <fieldset class="mb-2 w-full px-2">
            <legend class="font-bold text-sm">Endereço Completo</legend>
            <InputText v-model="userData.address" class="w-full" placeholder="Rua, Número, Bairro, CEP" />
          </fieldset>

          <fieldset class="mb-2 w-full px-2">
            <legend class="font-bold text-sm">Senha</legend>
            <InputText v-model="userData.password" class="w-full" placeholder="Deixe em branco caso não queira alterar" />
          </fieldset>

          <fieldset class="mb-2 w-full px-2">
            <legend class="font-bold text-sm">Resumo Profissional</legend>
            <Textarea v-model="userData.resume" rows="8" class="w-full" placeholder="Descreva a sua história e suas habilidades" />
          </fieldset>

          <fieldset class="mb-2 w-full px-2">
            <legend class="font-bold text-sm">Foto de Perfil</legend>
            <div class="flex gap-5" v-if="userData.photo">
              <img width="120" height="120" class="object-cover" :src="userData.photo" alt="">
              <div>
                <FileUpload @select="changePhoto($event)" mode="basic"/>
                <Button @click="userData.removePhoto = true" class="mt-2" severity="danger" label="Remover Foto" icon="pi pi-times" />
              </div>
            </div>

            <FileUpload v-else @select="changePhoto($event)" mode="basic"/>
          </fieldset>

          <div class="py-5 w-full px-2">
            <p class="text-xl font-bold">Áreas de Interesse</p>
            <hr class="my-3" />
            <ul>
              <li @click="openCategory($event)" class="masters" v-for="master in categories" :key="master.category_id">
                <p class="font-bold text-lg title-masters">{{ master.category_name }}</p>
                <ul class="ps-2">
                  <li class="headers" v-for="headers in master.children" :key="headers.category_id">
                    <p class="italic">{{ headers.category_name }}</p>
                    <ul>
                      <li class="childrens" v-for="children in headers.children" :key="children.category_id">
                        <input @change="checkCategory" :id="`category-${children.category_id}`" v-model="userCategories" type="checkbox" :value="children.category_id" />
                        <label :for="`category-${children.category_id}`" class="ms-2">{{ children.category_name }}</label>
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
li:not(.masters) {
  padding: 10px;
}
.title-masters {
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