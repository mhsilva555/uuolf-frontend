<script setup lang="ts">
const creditCard = ref({
  cardNumber: null,
  expirationDate: null,
  cvv: null,
  titular: null,
})
</script>

<template>
  <form method="POST" class="mb-10">
    <fieldset class="border p-2 py-1 my-2 rounded-md">
      <legend class="px-4 font-semibold">Titular do Cartão</legend>
      <InputText
          type="text"
          class="p-2 w-full outline-0 !border-none"
          v-model="creditCard.titular"
          placeholder="Digite o número do Cartão"
      />
    </fieldset>

    <fieldset class="border p-2 py-1 my-2 rounded-md">
      <legend class="px-4 font-semibold">Número do Cartão</legend>
      <InputText
          type="text"
          class="p-2 w-full outline-0 !border-none"
          v-keyfilter.num
          v-model="creditCard.cardNumber"
          placeholder="Digite o número do Cartão"
      />
    </fieldset>

    <div class="flex gap-4">
      <fieldset class="border p-2 py-1 my-2 rounded-md max-w-[200px]">
        <legend class="px-4 font-semibold">Validade</legend>
        <div class="flex gap-2">
          <InputMask
              type="text" class="p-2 w-full outline-0 !border-none"
              v-keyfilter.num
              v-model="creditCard.expirationDate"
              mask="99/99"
              placeholder="00/00"
          />
        </div>
      </fieldset>

      <fieldset class="border p-2 py-1 my-2 rounded-md max-w-[250px]">
        <legend class="px-4 font-semibold">Código de Segurança</legend>
        <InputText
            type="text" class="p-2 w-full outline-0 !border-none"
            v-keyfilter.num
            v-model="creditCard.cvv"
            maxlength="4"
        />
      </fieldset>
    </div>

    <Button type="submit" class="mt-4 !bg-color-1 !border-none" label="Finalizar Pagamento"/>
  </form>
</template>

<style scoped>

</style>