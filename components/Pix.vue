<script setup lang="ts">
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css'

defineProps({
  data: Object
})

const codePix = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    toast('Link Copiado!', {
      type: "success"
    })
  })
}
</script>

<template>
  <div class="text-center">
    <img class="block mx-auto mb-5" :src="data.imagemQrcode" />
    <a target="_blank" :href="data.linkVisualizacao" class="border border-color-1 p-1 px-3 rounded text-sm inline-block">Página de Pagamento <i class="pi pi-link"></i></a>
    <Button @click="codePix(data.qrcode)" label="Copiar Link do Pix" class="!block mx-auto mt-5 mb-10 !bg-color-1 !border-none" />
  </div>
</template>

<style scoped>

</style>