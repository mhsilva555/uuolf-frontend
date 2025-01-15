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
  <section class="py-20 bg-color-2">
    <div class="container mx-auto">
      <h2 class="text-center text-4xl font-bold text-white">Principais Serviços</h2>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        <article v-for="(service, index) in services" :key="index"
          class="text-center rounded-lg overflow-hidden bg-white shadow-xl">
          <header>
            <img class="h-[150px] w-full object-cover" src="https://www.revendedor.com.br/wp-content/uploads/2023/08/Como-trabalhar-de-entregador-do-Mercado-Livre-passo-a-passo-atualizado.jpg">
          </header>

          <footer class="p-5">
            <h2 class="text-lg">{{ service.title }}</h2>
            <p class="text-sm">{{ service.description }}</p>
            <a href="#" class="mt-5 inline-block text-color-1 font-bold">Solicitar orçamento</a>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>