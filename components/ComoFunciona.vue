<script setup lang="ts">

</script>

<template>
<section class="py-20">
  <div class="container mx-auto">
    <h2 class="text-center text-4xl font-bold text-color-1 mb-4">Como funciona a Uuolf?</h2>
    <p class="text-center text-lg">Uuolf é uma plataforma brasileira para a contratação de serviços. Nossa missão é unir profissionais de todas as regiões do país a pessoas que precisam de serviços, garantindo uma experiência ágil, prática e de alta qualidade para atender às mais diversas necessidades.</p>

    <div class="grid grid-cols-3 cards-como-funciona mt-10">
      <article class="card">
        <img src="@/static/project.png" alt="">
        <h3>Poste o seu projeto</h3>
        <p>Fale sobre o que precisa ser realizado!</p>
      </article>

      <article class="card">
        <img src="@/static/budget.png" alt="">
        <h3>Receba os orçamentos</h3>
        <p>Profissionais verificados e experientes entrarão em contato com você!</p>
      </article>

      <article class="card">
        <img src="@/static/deal.png" alt="">
        <h3>Escolha a melhor opção</h3>
        <p>Você negocia diretamente com o profissional!</p>
      </article>
    </div>
  </div>
</section>
</template>

<style scoped>
.cards-como-funciona {
  text-align: center;
  & img {
    display: inline-block;
    max-width: 80px;
    height: auto;
  }
  & h3 {
    font-weight: bold;
    font-size: 1.5rem;
    margin: 10px 0;
  }
  & p {
    font-size: 0.95rem;
    color: rgba(0,0,0,0.6);
  }
}
</style>