<script setup lang="ts">
import EfiPay from 'payment-token-efi'
import {cartStore} from "~/store/cartStore"
import requestService from "~/service/requestService"

const cart = cartStore()
const creditCard = ref({
  cardNumber: null,
  expirationDate: null,
  cvv: null,
  titular: null,
  installments: null,
})
const cardBrand = ref('')
const invalidBrand = ref(false)
const cardBrandIcon = ref('')
const installments = ref(null)
const loadingInstallments = ref(false)
const disabled = ref(true)

const identifyBrand = async  () => {
  if (!creditCard.value?.cardNumber) {
    return false
  }

  const cardNumb = String(creditCard.value.cardNumber)

  try {
    const brand = await EfiPay.CreditCard
        .setCardNumber(cardNumb)
        .verifyCardBrand()

    if (brand === "unsupported") {
      invalidBrand.value = true
      installments.value = null
      cardBrandIcon.value = `<i class="fa-duotone fa-solid fa-credit-card-blank"></i>`
      return false
    }

    cardBrandIcon.value = brand === "elo" || brand === "hipercard"
        ? `<i class="fa-solid fa-credit-card-front"></i>`
        : `<i class="fa-brands text-3xl fa-cc-${brand}"></i>`;

    cardBrand.value = brand
    listInstallments()
  } catch (e) {
    console.log(e)
  }
}

const listInstallments = async () => {
  loadingInstallments.value = true
  let price = cart.cart?.plan_price_discount ?? cart.cart.plan_price
  price = String(price).replace(".", "")

  try {
    await EfiPay.CreditCard
      .setAccount("3539eb1ba98feea5e6f2c8070f1c26e3")
      .setEnvironment("sandbox") // 'production' or 'sandbox'
      .setBrand(cardBrand.value)
      .setTotal(parseInt(price * 10, 10))
      .getInstallments()
      .then(response => {
        loadingInstallments.value = false
        installments.value = []
        response.installments.forEach((element) => {
          installments.value.push({
            label: `${element.installment}x de R$ ${element.currency} ${element.has_interest ? 'com juros' : 'sem juros'}`,
            installment: element.installment,
            value: element.value,
            currency: element.currency
          })
        })

        creditCard.value.installments = 1
      })
  } catch (error) {
    console.log(error)
  }
}

const createPayment = async () => {
  await requestService.post('/payments/new', {
    payment_method: "credit_card",
    item: cart.cart,
  }).then((response) => {
    console.log(response)
  })
}

watch(creditCard.value, (newValue) => {
  disabled.value = Object.values(newValue).some(value => value === null || value === "")
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
          placeholder="Como Inscrito no Cartão"
      />
    </fieldset>

    <fieldset class="border p-2 py-1 my-2 rounded-md">
      <legend class="px-4 font-semibold">Número do Cartão</legend>
      <div class="flex gap-5 items-center">
        <InputText
            type="text"
            class="p-2 w-full outline-0 !border-none"
            v-keyfilter.num
            v-model="creditCard.cardNumber"
            @focusout="identifyBrand"
            maxlength="16"
            placeholder="Digite o Número do Cartão"
        />
        <div v-html="cardBrandIcon"></div>
      </div>
    </fieldset>

    <span v-if="invalidBrand" class="block text-orange-600 text-xs">
      <i class="pi pi-exclamation-triangle"></i> Este cartão não é aceito. Somente <b>Mastecard, Visa, Amex, Elo e Hipercard.</b>
    </span>

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
            placeholder="***"
        />
      </fieldset>
    </div>

    <ProgressBar v-if="loadingInstallments" mode="indeterminate" class="!h-2" />
    <fieldset v-if="installments" class="border p-2 py-1 my-2 rounded-md">
      <legend class="px-4 font-semibold">Parcelamento</legend>
      <Select
          fluid
          v-model="creditCard.installments"
          :options="installments"
          optionLabel="label"
          optionValue="installment"
          class="!border-0"
      />
    </fieldset>

    <Button
        @click="createPayment"
        :disabled="disabled"
        type="submit"
        class="mt-4 !bg-color-1 !border-none"
        label="Finalizar Pagamento"
        icon="pi pi-check"
    />
  </form>
</template>

<style scoped>

</style>