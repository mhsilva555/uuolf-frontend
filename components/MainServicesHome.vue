<script setup lang="ts">
import {ref} from 'vue'
const services = ref([
  {title: 'Serviço 1', description: 'Descrição serviço'},
  {title: 'Serviço 2', description: 'Descrição serviço'},
  {title: 'Serviço 3', description: 'Descrição serviço 1'},
  {title: 'Serviço 4', description: 'Descrição serviço'},
])
</script>

<template>
  <section class="py-14">
    <div class="container mx-auto">
      <h2 class="text-center text-4xl font-bold">Principais Serviços</h2>

      <div class="grid grid-cols-4 gap-8 mt-10">
        <article v-for="(service, index) in services" :key="index"
          class="text-center rounded-lg border overflow-hidden shadow-xl">
          <header>
            <img class="h-[150px] w-full object-cover" src="https://www.revendedor.com.br/wp-content/uploads/2023/08/Como-trabalhar-de-entregador-do-Mercado-Livre-passo-a-passo-atualizado.jpg">
          </header>

          <footer class="p-5">
            <h2 class="text-lg">{{ service.title }}</h2>
            <p class="text-sm">{{ service.description }}</p>
            <a href="#" class="mt-5 inline-block text-blue-500">Solicitar orçamento</a>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>