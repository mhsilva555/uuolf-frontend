<script setup lang="ts">
useHead({
  title: 'Uuolf - Cadastro',
})

import Header from "~/components/Share/Header.vue";
import Footer from "~/components/Share/Footer.vue";
</script>

<template>
  <main>
    <Header/>
    <div class="container mx-auto py-14">
      <h3 class="text-center mb-10 text-2xl">Cadastre-se</h3>

      <div class="flex justify-center gap-2 mb-8">
        <Button class="!px-10 !py-3 !text-2xl !bg-blue-700 !border-blue-700"><Icon name="mdi:facebook"></Icon></Button>
        <Button class="!px-10 !py-3 !text-2xl !bg-red-600 !border-red-600"><Icon name="mdi:google"></Icon></Button>
      </div>

      <form method="POST" class="max-w-[500px] mx-auto">
        <fieldset class="flex justify-center gap-6 mb-5">
          <div class="flex gap-1 items-center">
            <input name="profile-type" class="w-4 h-4" type="radio" id="professional" value="professional"/>
            <label for="professional" class="font-bold">Sou Profissional</label>
          </div>

          <div class="flex gap-1 items-center">
            <input name="profile-type" class="w-4 h-4" type="radio" id="customer" value="customer"/>
            <label for="customer" class="font-bold">Sou Cliente</label>
          </div>
        </fieldset>

        <fieldset class="border p-2 mb-4 rounded-md">
          <legend class="px-4 font-semibold">Nome</legend>
          <input type="text" class="p-2 w-full outline-0" placeholder="Nome Completo">
        </fieldset>

        <fieldset class="border p-2 mb-4 rounded-md">
          <legend class="px-4 font-semibold">E-mail</legend>
          <input type="email" class="p-2 w-full outline-0" placeholder="Seu e-mail">
        </fieldset>

        <fieldset class="border p-2 rounded-md">
          <legend class="px-4 font-semibold">Senha</legend>
          <input type="password" class="p-2 w-full outline-0" placeholder="*********">
        </fieldset>

        <button
            type="submit"
            class="block w-full my-3 py-4 px-4 border border-color-1 bg-color-1 font-bold rounded-md text-white duration-200 hover:bg-white hover:text-color-1 hover:border-color-1"
        >
          Cadastrar
        </button>

        <p class="text-sm">Ao se registrar, você confirma que aceita os <a href="#" class="underline text-blue-500">Termos de Uso</a> e as <a href="#" class="underline text-blue-500">Políticas de Privacidade</a> da Uuolf.</p>
      </form>
    </div>
    <Footer/>
  </main>
</template>

<style scoped>

</style>