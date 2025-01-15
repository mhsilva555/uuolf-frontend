<script setup lang="ts">

import Header from "~/components/Share/Header.vue";
</script>

<template>
  <footer class="bg-color-1 pt-14 text-white">
    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-3">
      <div>
        <p class="text-2xl mb-3 font-bold">Institucional</p>

        <ul class="footer-links">
          <li><a href="#">Quem Somos</a></li>
          <li><a href="#">Relação com Investidores</a></li>
          <li><a href="#">Trabalhe Conosco</a></li>
          <li><a href="#">Profissionais Verificados</a></li>
          <li><a href="#">Blog do Uuolf</a></li>
          <li><a href="#">Dicas de Segurança</a></li>
          <li><a href="#">Mapa do Site</a></li>
        </ul>
      </div>

      <div>
        <p class="text-2xl mb-3 font-bold">Redes Sociais</p>

        <ul class="footer-links flex gap-3">
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

    <div class="container mx-auto">
      <hr class="my-10">

      <div class="lg:flex items-center justify-between">
        <div>
          <img class="footer-logo max-w-[130px]" src="@/static/logo-uuolf-horizontal-1.webp" alt="">
        </div>

        <div>
          <ul class="lg:flex gap-4 text-sm">
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