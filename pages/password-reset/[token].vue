<script setup lang="ts">
import stringService from "~/service/stringService"
import authService from "~/service/authService"
import Header from "~/components/Share/Header.vue"
import Footer from "~/components/Share/Footer.vue"
import validateService from "~/service/validateService"

const route = useRoute()
const loading = ref(true)
const token = ref(route.params.token)
const invalidToken = ref(false)
const invalidPassword = ref(false)
const disabled = ref(true)
const progress = ref(false)
const updateSuccess = ref(false)
const updateData = ref({
  password: null,
  confirmation_password: null
})


const updatePassword = () => {
  progress.value = true

  authService.passwordUpdate({
    password: updateData.value.password,
    password_confirmation: updateData.value.confirmation_password,
    token: token.value,
  }).then((response) => {
    progress.value = false

    if (response.data && response.data.status === 200) {
      updateSuccess.value = true
      return true
    }
  })
}

watch(updateData.value, (newValue) => {
  disabled.value = newValue.password !== newValue.confirmation_password;
})

watch(() => updateData.value.password, (newValue) => {
  if (!validateService.passwordSecurity(newValue) && newValue !== '') {
    invalidPassword.value = true
    disabled.value = true
  } else {
    invalidPassword.value = false
  }
})

onBeforeMount(async () => {
  await authService.checkToken(token.value).then((response) => {
    loading.value = false
    if (!response.data || response.data.status !== 200) {
      invalidToken.value = true
    }
  })
})
</script>

<template>
  <main>
    <Header/>

    <div class="container mx-auto py-20 text-color-1">
      <Skeleton v-if="loading" class="!h-[400px]" />

      <div v-else>
        <div v-if="!updateSuccess">
          <!-- Verifica se o Token é válido -->
          <div v-if="!invalidToken" class="text-center">
            <i class="fa-thin fa-circle-check text-5xl mb-3"></i>
            <h2 class="text-center text-3xl font-bold">Link Confirmado com Sucesso!</h2>
            <p class="text-center">Digite abaixo sua nova senha</p>

            <form method="POST" @submit.prevent="updatePassword" class="login-form max-w-[500px] mx-auto mt-5">
              <fieldset class="border p-2 py-0 mb-4 rounded-md">
                <legend class="px-4 font-semibold">Nova Senha</legend>
                <Password v-model="updateData.password" :toggle-mask="true" :feedback="false" type="email" class="!border-none p-2 w-full outline-0 !shadow-none" placeholder="***********"/>
              </fieldset>

              <fieldset class="border p-2 py-0 mb-4 rounded-md">
                <legend class="px-4 font-semibold">Confirmar Senha</legend>
                <Password v-model="updateData.confirmation_password" :toggle-mask="true" :feedback="false" type="email" class="!border-none p-2 w-full outline-0 !shadow-none" placeholder="***********"/>
              </fieldset>

              <p v-if="invalidPassword" class="text-xs text-left text-red-600">A senha não atende aos requisítos mínimos de segurança.</p>

              <p class="recomendation text-xs text-left my-2">
                <em>A senha deve conter: no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.</em>
              </p>

              <ProgressBar v-if="progress" mode="indeterminate" class="progress-send" style="height: 6px; margin-bottom: 10px"></ProgressBar>

              <p v-if="emailInvalid" class="mt-[-6px] mb-2 flex items-center gap-1 text-red-500"><Icon name="mdi:warning" />E-mail inválido</p>

              <Button
                  :disabled="disabled"
                  type="submit"
                  class="block w-full my-3 !py-4 !px-4 border !border-color-1 !bg-color-1 font-bold rounded-md text-white duration-200 hover:!bg-white hover:!text-color-1 hover:border-color-1"
                  :class="{'disabled-submit !border-neutral-400' : disabled}"
              >
                Alterar Senha
              </Button>
            </form>
          </div>

          <!-- Caso contrário, exiba esta mensagem -->
          <div v-else class="text-center max-w-xl mx-auto p-10">
            <i class="fa-light fa-link-slash text-5xl"></i>
            <p class="text-2xl font-bold my-2">Este link está expirado!</p>
            <p class="my-3">Solicite um novo link de redefinição no botão abaixo:</p>
            <NuxtLink class="bg-color-1 text-white px-8 py-3 inline-block rounded-md" href="/recuperar-senha">Solicitar Novo Link</NuxtLink>
          </div>
        </div>

        <div v-else class="text-center">
          <i class="fa-thin fa-circle-check text-5xl mb-3"></i>
          <h2 class="text-center text-3xl font-bold">Senha Atualizada com Sucesso!</h2>
          <p class="my-3">Realize o login utilizando sua nova senha.</p>
          <NuxtLink href="/login">
            <Button class="!bg-color-1 !border-color-1 !px-10">Entrar</Button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <Footer/>
  </main>
</template>

<style scoped>

</style>