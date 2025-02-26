<script setup lang="ts">
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css'
import requestService from "~/service/requestService";
import {cartStore} from "~/store/cartStore";

defineProps({
  data: Object
})

const cart = cartStore()
const pix = ref(null)

const codePix = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    toast('Link Copiado!', {
      type: "success"
    })
  })
}

onMounted(async () => {
  await requestService.post('/payments/new', {
    payment_method: 'pix',
    item: cart.cart,
  }).then((response) => {
    pix.value = response.data?.qrcode ?? null
  })
})
</script>

<template>
  <Skeleton v-if="!pix" class="!h-[338px] !max-w-[250px] mx-auto mb-10" />

  <div v-else class="text-center">
    <img class="block mx-auto mb-5" :src="pix?.imagemQrcode" />
    <a target="_blank" :href="pix?.linkVisualizacao" class="border border-color-1 p-1 px-3 rounded text-sm inline-block">Página de Pagamento <i class="pi pi-link"></i></a>
    <Button @click="codePix(pix?.qrcode)" label="Copiar Link do Pix" class="!block mx-auto mt-5 mb-10 !bg-color-1 !border-none" />
  </div>
</template>

<style scoped>

</style>