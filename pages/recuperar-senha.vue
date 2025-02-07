<script setup lang="ts">
import Header from "~/components/Share/Header.vue";
import Footer from "~/components/Share/Footer.vue";

const emailRecovery = ref(null)
</script>

<template>
  <main>
    <Header/>

    <div class="container mx-auto py-20">
      <h2 class="text-center text-3xl font-bold">Recuperar Senha</h2>
      <p class="text-center">Digite abaixo o e-mail cadastrado para recuperar sua senha</p>

      <form method="POST" @submit.prevent="login" class="login-form max-w-[500px] mx-auto mt-5">
        <fieldset class="border p-2 mb-4 rounded-md">
          <legend class="px-4 font-semibold">E-mail</legend>
          <InputText type="email" v-model="emailRecovery" class="!border-none p-2 w-full outline-0 !shadow-none" placeholder="usuario@email.com"/>
        </fieldset>

        <span class="text-center block font-light text-sm">Você receberá um link para redefinir sua senha.</span>

        <button
            type="submit"
            class="block w-full my-3 py-4 px-4 border border-color-1 bg-color-1 font-bold rounded-md text-white duration-200 hover:bg-white hover:text-color-1 hover:border-color-1"
        >
          Enviar Link de Redefinição
        </button>
      </form>
    </div>

    <Footer/>
  </main>
</template>

<style scoped>

</style>