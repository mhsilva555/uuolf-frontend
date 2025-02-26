<script setup lang="ts">
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css'
import requestService from "~/service/requestService";
import {cartStore} from "~/store/cartStore";
const swal = useNuxtApp().$swal

defineProps({
  data: Object
})

const cart = cartStore()
const pix = ref(null)
let eventSource;

const codePix = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    toast('Link Copiado!', {
      type: "success"
    })
  })
}

onBeforeMount(async () => {
  await requestService.post('/payments/new', {
    payment_method: 'pix',
    item: cart.cart,
  }).then((response) => {
    pix.value = response.data?.qrcode ?? null

    const intervalID = setInterval(() => {
      requestService.get(`/check-pix-status/${response.data?.pix.txid}`).then((response) => {
        if (response.data === 'finished') {
          clearInterval(intervalID)
          swal.fire({
            title: 'Pagamento Recebido!',
            html: `A sua assinatura do plano <b>${cart.cart.plan_name}</b> foi realizada com sucesso!`,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              cart.deleteCart()
              document.location.reload()
            }
          })
        }
      })
    }, 3000)
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