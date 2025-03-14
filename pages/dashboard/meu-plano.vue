<script setup lang="ts">
import requestService from "~/service/requestService"
import stringService from "~/service/stringService"
import dateService from "~/service/dateService"
import {cartStore} from "~/store/cartStore"

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth-jwt', 'professional-access'],
  title: 'Meu Plano',
})

useHead({
  title: 'Meu Plano - Uuolf'
})

const cart = cartStore()
const subscription = ref({})
const plans = ref([])
const openDialog = ref(false)
const step = ref(1)
const paymentMethod = ref(false)
const progress = ref(false)
const dialogHeaderTitle = ref('Planos')
const backPayments = ref(false)

const getPlans = async () => {
  openDialog.value = true
  await requestService.get('/all-plans').then((response) => {
    plans.value = response.data
  })
}

const addPlanCart = (item) => {
  cart.setItemCart(item)
}

const setStep = (parseStep) => {
  switch (parseStep) {
    case 1:
      dialogHeaderTitle.value = "Planos"
          break
    case 2:
      dialogHeaderTitle.value = "Pagamento"
          break
    case 3:
      dialogHeaderTitle.value = `Pagar com ${paymentMethod.value === 'credit_card' ? 'Cartão de Crédito' : 'Pix'}`
          break
  }
  step.value = parseStep
}

const setPaymentMethod = (method) => {
  paymentMethod.value = method
}

const selectPayment = () => {
  progress.value = true
  setStep(3)
  progress.value = false
}

const sendingPaymentCard = (dados) => {
  backPayments.value = dados
}

const closeDialog = async () => {
  await cart.deleteCart()
}

const getStatusLabel = (status) => {
  switch (status) {
    case 1:
      return "Ativo"
    default:
      return "Cancelado"
  }
}

onBeforeMount(async () => {
  try {
    await requestService.get('/user/subscriptions').then((response) => {
      subscription.value = response.data ?? {}
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
<div class="bg-white pb-14 min-h-96">
  <div class="container mx-auto">
    <client-only v-if="subscription.plan">
      <div class="p-3 shadow-xl border rounded-lg border-s-4 border-s-color-1">
        <h2 class="text-3xl font-bold">{{ subscription.plan.plan_name }}</h2>
        <p>{{ subscription.plan?.plan_description }}</p>
        <p><b>Preço:</b> {{ stringService.formatPrice(subscription.plan.plan_price) }}</p>
        <p v-if="!subscription.end_subscription">Sem Expiração</p>
        <p v-else><b>Expira em:</b> {{ dateService.formatDateWithHours(subscription.end_subscription) }}</p>
        <p>
          <b>Status:</b>
          <span class="bg-green-500 rounded px-3 ms-2 text-white text-sm inline-block" :class="{'!bg-red-500': !subscription.status_subscription}">{{ getStatusLabel(subscription.status_subscription) }}</span>
        </p>
      </div>

      <Button
          type="button"
          label="Assinar Plano Premium"
          v-if="subscription.plan.plan_id === 1"
          class="!bg-color-1 !border-color-1 mt-5"
          @click="getPlans"
      />

      <Dialog modal v-model:visible="openDialog" @hide="closeDialog" class="w-full max-w-4xl" :header="dialogHeaderTitle">
        <div v-if="step === 1">
          <div v-if="plans.length < 1" class="grid grid-cols-3 gap-5">
            <Skeleton v-for="i in 3" class="!h-[250px] w-full" />
          </div>

          <div v-else>
            <p class="text-3xl font-bold text-color-1 mb-3">Premium</p>

            <div class="grid grid-cols-3 gap-5">
              <div v-if="plans.premium" v-for="plan in plans.premium" class="p-6 rounded-lg shadow-xl text-center border border-slate-100">
                <h2 class="font-bold mb-3">{{plan.plan_name}}</h2>
                <div v-if="plan.plan_price_discount">
                  <p class="text-xs"><b>De:</b> <del>{{ stringService.formatPrice(plan.plan_price) }}</del></p>
                  <p><b>Por:</b> {{ stringService.formatPrice(plan.plan_price_discount) }}</p>
                </div>
                <p v-else>{{ stringService.formatPrice(plan.plan_price) }}</p>
                <Button label="Contratar Plano" icon="pi pi-cart-plus" class="mt-3" @click="addPlanCart(plan)"/>
              </div>
            </div>
          </div>

          <div v-if="Object.keys(cart.cart).length > 0" class="mb-14">
            <p class="text-xl font-bold text-color-1 mt-10">Plano Selecionado</p>

            <div class="p-4 shadow-lg rounded-lg border border-slate-200 flex items-center gap-2 my-6">
              <p class="text-lg font-bold">{{ cart.cart.plan_name }}</p>
              <p>{{ stringService.formatPrice(cart.cart.plan_price_discount ?? cart.cart.plan_price) }}</p>
            </div>

            <Button label="Continuar Assinatura" icon-pos="right" icon="pi pi-arrow-right" @click="setStep(2)" />
          </div>
        </div>

        <div v-if="step === 2">
          <p class="text-3xl font-bold text-color-1 mb-3 text-center">Método de Pagamento</p>
          <p class="text-center">Selecione um método de pagamento para prosseguir</p>
          <div class="flex justify-center text-center gap-10 my-10" :class="{'!mb-5': progress}">
            <div
                class="w-full max-w-[220px] p-10 shadow-ld rounded-md border"
                :class="{'border-2 border-color-1' : paymentMethod === 'credit_card'}"
                @click="setPaymentMethod('credit_card')"
            >
              <i class="fa-solid fa-credit-card text-4xl"></i>
              <p class="mt-2">Cartão de Crédito</p>
            </div>

            <div
                class="w-full max-w-[220px] p-10 shadow-ld rounded-md border"
                :class="{'border-2 border-color-1' : paymentMethod === 'pix'}"
                @click="setPaymentMethod('pix')"
            >
              <i class="fa-brands fa-pix text-4xl"></i>
              <p class="mt-2">Pix</p>
            </div>
          </div>

          <ProgressBar mode="indeterminate" v-if="progress" class="!h-2 !w-full max-w-[500px] mx-auto mb-5" />

          <div class="flex justify-center gap-4">
            <Button severity="info" @click="setStep(1)" label="Voltar" icon="pi pi-arrow-left" icon-pos="left"/>
            <Button :disabled="!paymentMethod" @click="selectPayment" icon="pi pi-arrow-right" icon-pos="right" label="Prosseguir para Pagamento" class=""/>
          </div>
        </div>

        <div v-if="step === 3">
          <Pix v-if="paymentMethod === 'pix'"/>
          <CreditCard @sendingPayment="sendingPaymentCard" v-if="paymentMethod === 'credit_card'" />

          <Button :disabled="backPayments" @click="setStep(2)" icon="pi pi-arrow-left" severity="info" label="Voltar aos métodos de pagamento"/>
        </div>

        <Button severity="danger" label="Fechar" class="mt-10" @click="openDialog = false" />
      </Dialog>
    </client-only>
  </div>
</div>
</template>

<style scoped>

</style>