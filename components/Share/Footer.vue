<script setup lang="ts">

import Header from "~/components/Share/Header.vue";
</script>

<template>
  <footer class="bg-color-1 pt-14 text-white text-center lg:text-left">
    <div class="container mx-auto px-8 lg:px-0 grid grid-cols-1 lg:grid-cols-3">
      <div class="mb-10 lg:mb-0">
        <p class="text-2xl mb-3 font-bold">Institucional</p>

        <ul class="footer-links">
          <li><a href="#">Quem Somos</a></li>
          <li><a href="#">Trabalhe Conosco</a></li>
          <li><a href="#">Dicas de Segurança</a></li>
          <li><a href="#">Mapa do Site</a></li>
        </ul>
      </div>

      <div class="mb-10 lg:mb-0">
        <p class="text-2xl mb-3 font-bold">Redes Sociais</p>

        <ul class="footer-links flex justify-center lg:justify-start gap-3">
          <li><a href="#"><Icon class="text-5xl" name="mdi:facebook"/></a></li>
          <li><a href="#"><Icon class="text-5xl" name="mdi:instagram"/></a></li>
          <li><a href="#"><Icon class="text-5xl" name="mdi:youtube"/></a></li>
        </ul>
      </div>

      <div>
        <p class="text-2xl mb-3 font-bold">Downloads</p>

        <ul>
          <li><a href="#">#</a></li>
        </ul>
      </div>
    </div>

    <div class="container mx-auto px-8 lg:px-0">
      <hr class="my-10">

      <div class="lg:flex items-center justify-center lg:justify-between">
        <div class="text-center lg:text-left mb-10 lg:mb-0">
          <img class="footer-logo max-w-[130px] inline-block" src="@/static/logo-uuolf-horizontal-1.webp" alt="">
        </div>

        <div>
          <ul class="flex flex-wrap gap-4 text-sm justify-center">
            <li><a href="#">Fale Conoso</a></li>
            <li><a href="#">Políticas de Privacidade</a></li>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Ajuda</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-color-2 mt-10 text-center py-3 text-color-1 text-sm">
      <p>Uuolf&copy; 2025. Todos os Direitos Reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-logo {
  filter: brightness(0) invert(100%);
}
.footer-links {
  & li {
    margin: 5px 0;
  }
  & a {
    font-size: 0.9rem;
  }
}
</style>