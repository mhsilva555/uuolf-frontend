<script setup lang="ts">
import {ref} from 'vue'
import requestService from "~/service/requestService";
const professionais = ref([])

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

onBeforeMount(() => {
  requestService.get('/featureds-professionals').then((response) => {
    if (response.status === 200 && response.data.length > 0) {
      professionais.value = response.data
    }
  })
})
</script>

<template>
  <section class="py-20 bg-color-2">
    <div class="container mx-auto px-8 lg:px-0">
      <h2 class="text-center text-2xl lg:text-4xl font-bold text-white">Profissionais em Destaque</h2>

      <Carousel class="carousel-professionals" :value="professionais" :numVisible="6" :numScroll="1" :show-navigators="false" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <article class="text-center p-5 py-10 h-full">
            <div class="rounded-lg overflow-hidden bg-white shadow-xl p-5 py-8 h-full">
                <img v-if="slotProps.data.userdata.photo !== ''" :src="slotProps.data.userdata.photo">
                <img v-else width="150" height="150" class="object-cover rounded-full mx-auto" src="https://placehold.co/300x300">
                <h3 class="font-bold my-2 text-color-1">{{ slotProps.data.name }}</h3>
                <p class="text-sm text-neutral-600">{{ slotProps.data.userdata.location.city }} - {{ slotProps.data.userdata.location.state }}</p>
                <a
                    class="bg-green-500 p-1 px-3 rounded-md mt-2 inline-block text-white font-bold"
                    target="_blank"
                    :href="`https://wa.me/55${slotProps.data.userdata.phone}`"
                >
                  WhatsApp <i class="fa-brands fa-whatsapp"></i>
                </a>

                <div class="mt-3 categorias-profissionais">
                  <p class="font-bold text-sm">Categorias:</p>
                  <ul class="flex flex-wrap gap-2 gap-y-0 justify-center">
                    <li class="text-xs italic font-semibold text-neutral-500" v-for="cat in slotProps.data.categories" :key="cat.user_category_id">
                      {{ cat.professional_categories.category_name }}
                    </li>
                  </ul>
                </div>
            </div>
          </article>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style>
.carousel-professionals {
  .p-carousel-indicator button {
    background: white !important;
  }
  .p-carousel-indicator-active button {
    background: #13213c !important;
  }
}
.categorias-profissionais {
  li:not(:last-child)::after {
    content: ',';
  }
}
</style>