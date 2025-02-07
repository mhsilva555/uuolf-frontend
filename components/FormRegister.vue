<script setup lang="ts">
import jQuery from 'jquery'
import requestService from "~/service/requestService";

const dataRegister = ref({
  name: null,
  email: null,
  phone: null,
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
  try {

    jQuery('.loading').fadeIn(300)

    await requestService.post('/api/user/register', dataRegister.value)
        .then(() => {
          jQuery('.loading').fadeOut(100)

          toast("Cadastro Realizado!", {
            autoClose: 2000,
            type: 'success',
          });

          Swal.fire({
            title: 'Cadastro finalizado com sucesso!',
            icon: 'success'
          }).then((result) => {
            router.push('/obrigado')
          })

        })
        .catch((error) => {
          jQuery('.loading').fadeOut(100)

          switch (error.status) {
            case 422:
              toast("E-mail já registrado no site!", {
                autoClose: 2000,
                type: 'error',
              });
              break

            case 500:
              Swal.fire({
                title: 'Ops!',
                html: 'Não conseguimos realizar o seu cadastro. Por favor, tente novamente dentro de alguns instantes.',
                icon: 'warning'
              })
              break
          }
        })

  } catch(e) {
    //console.log(e)
  }
}

const sendData = () => {
  let values = Object.values(dataRegister.value)

  if (values.includes(null) || values.includes('')) {
    toast("Preecha todos os campos!", {
      autoClose: 2000,
      type: 'warning'
    });
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

watch(() => dataRegister.value.profile_primary, (newValue, oldValue) => {
  if (newValue === 'professional') {
    dataRegister.value.professional_category = null
  } else {
    delete dataRegister.value.professional_category
  }
})

watch(() => dataRegister.value.phone, (newValue) => {
  if (newValue.length < 11 && newValue !== '') {
    invalidPhone.value = true
    disabled.value = true
  } else {
    invalidPhone.value = false
    disabled.value = false
  }
})

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
  dataRegister.value.profile_primary = 'customer'
})
</script>

<template>
  <form method="POST" class="form-cadastro max-w-[700px] mx-auto">
    <fieldset class="border p-2 my-2 rounded-md">
      <legend class="px-4 font-semibold">Tipo de Cadastro</legend>

      <div class="profiles flex justify-center gap-6 text-center">
        <div class="profile-type flex items-center gap-2" data-type="customer">
          <RadioButton v-model="dataRegister.profile_primary" inputId="customer" value="customer" />
          <label for="customer">Cliente <i class="fa-light fa-user"></i></label>
        </div>

        <div class="profile-type flex items-center gap-2" data-type="professional">
          <RadioButton v-model="dataRegister.profile_primary" inputId="professional" value="professional"/>
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

    <fieldset class="border p-2 py-1 rounded-md my-2">
      <legend class="px-4 font-semibold">Telefone (DDD e Número)</legend>
      <InputText type="tel" class="w-full !border-none" name="phone" placeholder="(99) 99999-9999" v-model="dataRegister.phone" required />
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

    <div v-if="dataRegister.profile_primary === 'professional'">
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
    >
      Cadastrar
    </button>

    <p class="text-sm">Ao se registrar, você confirma que aceita os <a href="#" class="underline text-blue-500">Termos de Uso</a> e as <a href="#" class="underline text-blue-500">Políticas de Privacidade</a> da Uuolf.</p>
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
}
</style>