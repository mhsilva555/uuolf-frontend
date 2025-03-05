<script setup lang="ts">
import jQuery from 'jquery'
import requestService from "~/service/requestService";
import {toast} from "vue3-toastify"
import 'vue3-toastify/dist/index.css'

const swal = useNuxtApp().$swal
const dataRegister = ref({
  name: null,
  email: null,
  document: null,
  birthday: null,
  phone: '',
  password: null,
  password_confirmation: null,
  location: null
})
const cities = ref()
const categories = ref([])
const invalidPassword = ref(false)
const invalidPhone = ref(false)
const invalidEmail = ref(false)
const disabled = ref(false)

const sendRequest = async () => {
    jQuery('.loading').fadeIn(300)

    await requestService.post('/user/register', dataRegister.value).then((response) => {
      console.log(response.status)
      jQuery('.loading').fadeOut(100)

      if (response.status !== 200) {
        switch (response.status) {
          case 422:
            toast("E-mail já registrado no site!", {
              autoClose: 2000,
              type: 'error',
            })
            break

          case 500:
            toast("Erro ao realizar cadastro! Verifique os dados informados.", {
              autoClose: 2000,
              type: 'error',
            })
            break
        }

        return false
      }

      swal.fire({
        title: 'Cadastro finalizado com sucesso!',
        icon: 'success'
      }).then((result) => {
        navigateTo('/login')
      })
    })
}

const sendData = () => {
  let values = Object.values(dataRegister.value)

  if (values.includes(null) || values.includes('')) {
    toast("Preecha todos os campos!", {
      autoClose: 2000,
      type: 'warning'
    });
    console.log(dataRegister.value)
    return false
  }

  if (dataRegister.value.password !== dataRegister.value.password_confirmation) {
    toast("As senhas informadas não são iguais!", {
      autoClose: 2000,
      type: 'warning'
    });
    return false
  }

  sendRequest()
}

const getCities = () => {
  requestService.get('/locations').then((response) => {
    cities.value = response.data
  })
}

const getCategories = () => {
  requestService.get('/primary-categories').then((response) => {
    categories.value = response.data
  })
}

const checkPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
  return regex.test(password);
};

const checkEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email)
}

watch(() => dataRegister.value.profile_type, (newValue, oldValue) => {
  if (newValue === 'professional') {
    dataRegister.value.professional_category = null
  } else {
    delete dataRegister.value.professional_category
  }
})

// watch(() => dataRegister.value.phone, (newValue) => {
//   const phone = newValue.replace(/[ ()-]/g, "")
//   dataRegister.value.phone = phone
//
//   if (phone.length < 11 && phone !== '') {
//     invalidPhone.value = true
//     disabled.value = true
//   } else {
//     invalidPhone.value = false
//     disabled.value = false
//   }
// })

watch(() => dataRegister.value.email, (newValue) => {
  if (!checkEmail(newValue) && newValue !== '') {
    invalidEmail.value = true
    disabled.value = true
  } else {
    invalidEmail.value = false
    disabled.value = false
  }
})

watch(() => dataRegister.value.password, (newValue) => {
  if (!checkPassword(newValue) && newValue !== '') {
    invalidPassword.value = true
    disabled.value = true
  } else {
    invalidPassword.value = false
    disabled.value = false
  }
})

onBeforeMount(() => {
  getCities()
  getCategories()
})

onMounted(() => {
  dataRegister.value.profile_type = 'customer'
})
</script>

<template>
  <form @submit.prevent="sendData" method="POST" class="form-cadastro max-w-[700px] mx-auto">
    <fieldset class="border p-2 my-2 rounded-md">
      <legend class="px-4 font-semibold">Tipo de Cadastro</legend>

      <div class="profiles flex justify-center gap-6 text-center">
        <div class="profile-type flex items-center gap-2" data-type="customer">
          <RadioButton v-model="dataRegister.profile_type" inputId="customer" value="customer" />
          <label for="customer">Cliente <i class="fa-light fa-user"></i></label>
        </div>

        <div class="profile-type flex items-center gap-2" data-type="professional">
          <RadioButton v-model="dataRegister.profile_type" inputId="professional" value="professional"/>
          <label for="professional">Profissional <i class="fa-light fa-suitcase"></i></label>
        </div>
      </div>
    </fieldset>

    <fieldset class="border p-2 py-1 my-2 rounded-md">
      <legend class="px-4 font-semibold">Nome</legend>
      <InputText type="text" class="p-2 w-full outline-0 !border-none" v-model="dataRegister.name" placeholder="Nome Completo"/>
    </fieldset>

    <fieldset class="border p-2 py-1 my-2 rounded-md">
      <legend class="px-4 font-semibold">E-mail</legend>
      <InputText type="email" class="p-2 w-full outline-0 !border-none" v-model="dataRegister.email" placeholder="Seu e-mail"/>
    </fieldset>

    <fieldset class="border p-2 py-1 my-2 rounded-md">
      <legend class="px-4 font-semibold">CPF</legend>
      <InputText
          v-keyfilter.int
          maxlength="11"
          class="p-2 w-full outline-0 !border-none"
          v-model="dataRegister.document"
          placeholder="Somente números"
      />
    </fieldset>

    <fieldset class="border p-2 py-1 my-2 rounded-md">
      <legend class="px-4 font-semibold">Data de Nascimento</legend>
      <span class="text-xs ps-4 text-color-2 italic">Selecione a Data ou Apenas Digite</span>
      <input
          type="date"
          class="p-2 px-4 w-full outline-0 !border-none"
          v-model="dataRegister.birthday"
          placeholder="00/00/0000"
      />
    </fieldset>

    <fieldset class="border p-2 py-1 rounded-md my-2">
      <legend class="px-4 font-semibold">Telefone (DDD e Número)</legend>
      <InputMask v-model="dataRegister.phone" class="!border-none" mask="(99) 99999-9999" placeholder="(99) 99999-9999" required fluid />
    </fieldset>

    <div class="grid grid-cols-2 gap-4 mt-2">
      <fieldset class="border p-2 py-0 rounded-md">
        <legend class="px-4 font-semibold">Senha</legend>
        <Password class="p-2 w-full outline-0 p-2 w-full outline-0 !border-none" v-model="dataRegister.password" :feedback="true" :toggle-mask="true" placeholder="*********" />
      </fieldset>

      <fieldset class="border p-2 py-0 rounded-md">
        <legend class="px-4 font-semibold">Confirmar Senha</legend>
        <Password class="p-2 w-full outline-0" v-model="dataRegister.password_confirmation" :feedback="false" :toggle-mask="true" placeholder="*********" />
      </fieldset>
    </div>

    <p class="recomendation text-xs my-2">
      <em>A senha deve conter: no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.</em>
    </p>

    <fieldset class="border p-2 py-1 rounded-md my-2">
      <legend class="px-4 font-semibold">Cidade</legend>
      <Select
          class="w-full"
          :options="cities"
          optionLabel="city"
          optionValue="location_id"
          v-model="dataRegister.location"
          required
      />
    </fieldset>

    <div v-if="dataRegister.profile_type === 'professional'">
      <fieldset class="border p-2 rounded-md">
        <legend class="px-4 font-semibold">Área de Atuação</legend>
        <Select
            class="w-full"
            :options="categories"
            optionLabel="category_name"
            optionValue="category_id"
            v-model="dataRegister.professional_category"
            required
        />
      </fieldset>
    </div>

    <button
        :disabled="disabled"
        type="submit"
        class="block w-full my-3 py-4 px-4 border border-color-1 bg-color-1 font-bold rounded-md text-white duration-200 hover:bg-white hover:text-color-1 hover:border-color-1"
        :class="{
          'bg-neutral-300 border-neutral-300' : disabled
        }"
    >
      Cadastrar
    </button>

    <p class="text-xs text-center">Ao se registrar, você confirma que aceita os <NuxtLink href="/termos-de-uso" class="underline text-blue-500">Termos de Uso</NuxtLink> e as <NuxtLink href="/politicas-de-privacidade" class="underline text-blue-500">Políticas de Privacidade</NuxtLink> da Uuolf.</p>
  </form>
</template>

<style>
.form-cadastro {
  & .p-password-input, .p-select {
    border: 0 none !important;
  }
  & .p-password-input {
    width: 93% !important;
  }
  & .p-datepicker-input {
    border: 0 none !important;
  }
}
</style>