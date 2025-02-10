<script setup lang="ts">
import Header from "~/components/Share/Header.vue"
import Footer from "~/components/Share/Footer.vue"
import {toast} from "vue3-toastify"
import 'vue3-toastify/dist/index.css'
import validateService from "~/service/validateService"
import authService from "~/service/authService"
import stringService from "~/service/stringService"

const emailRecovery = ref(null)
const emailInvalid = ref(false)
const disabled = ref(true)
const progress = ref(false)
const sendSuccess = ref(false)

const sendLink = () => {
  if (!emailRecovery.value || emailRecovery.value === "") {
    toast("Informe um e-mail", {
      type: "warning",
    })
    return false
  }

  disabled.value = true
  progress.value = true

  authService.passwordReset(emailRecovery.value).then((response) => {
    if (!response.data || response.data.status !== 200) {
      toast("Erro ao enviar email. Verifique o e-mail informado ou tente novamente mais tarde!", {
        type: "warning",
        autoClose: 4000,
      })
      disabled.value = false
      progress.value = false
      return false
    }

    toast("E-mail Enviado com Sucesso!", {
      type: "success",
      autoClose: 2000,
    })
    progress.value = false
    sendSuccess.value = true
  })
}

watch(() => emailRecovery.value, (newValue) => {
  if (newValue === "") {
    emailInvalid.value = false
    disabled.value = true
    return false
  }

  if (!validateService.email(newValue)) {
    emailInvalid.value = true
    //disabled.value = true
    return false
  }

  emailInvalid.value = false
  disabled.value = false
})
</script>

<template>
  <main>
    <Header/>

    <div class="container mx-auto py-20 text-color-1">
      <div v-if="!sendSuccess">
        <h2 class="text-center text-3xl font-bold">Recuperar Senha</h2>
        <p class="text-center">Digite abaixo o e-mail cadastrado para recuperar sua senha</p>

        <form method="POST" @submit.prevent="sendLink" class="login-form max-w-[500px] mx-auto mt-5">
          <fieldset class="border p-2 mb-4 rounded-md">
            <legend class="px-4 font-semibold">E-mail</legend>
            <InputText type="email" v-model="emailRecovery" class="!border-none p-2 w-full outline-0 !shadow-none" placeholder="usuario@email.com"/>
          </fieldset>

          <ProgressBar v-if="progress" mode="indeterminate" class="progress-send" style="height: 6px; margin-bottom: 10px"></ProgressBar>

          <p v-if="emailInvalid" class="mt-[-6px] mb-2 flex items-center gap-1 text-red-500"><Icon name="mdi:warning" />E-mail inválido</p>

          <span class="text-center block font-light text-sm">Você receberá um link para redefinir sua senha.</span>

          <Button
              :disabled="disabled"
              type="submit"
              class="block w-full my-3 !py-4 !px-4 border !border-color-1 !bg-color-1 font-bold rounded-md text-white duration-200 hover:!bg-white hover:!text-color-1 hover:border-color-1"
              :class="{'disabled-submit !border-neutral-400' : disabled}"
          >
            Enviar Link de Redefinição
          </Button>
        </form>
      </div>

      <div v-else class="text-center max-w-xl mx-auto p-10">
        <i class="fa-thin fa-envelope-circle-check text-5xl"></i>
        <p class="text-2xl font-bold my-2">Link de redefinição enviado com sucesso!</p>
        <p>Verifique o no seu endereço de e-mail {{ stringService.maskEmail(emailRecovery) }}.</p>
        <p class="text-xs mt-2 text-neutral-500">Caso o e-mail não esteja na caixa de entrada, verifique no spam.</p>
      </div>
    </div>

    <Footer/>
  </main>
</template>

<style>
.progress-send {
  & .p-progressbar-value {
    background: #13213c !important;
  }
}
.disabled-submit {
  background: #c7c7c7 !important;
  &:hover {
    background: #c7c7c7 !important;
    color: white !important;
  }
}
</style>