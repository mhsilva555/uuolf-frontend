<script setup>
import {authStore} from "~/store/authStore"
import {eventStore} from "~/store/eventStore.js"
const auth = authStore()
const events = eventStore()

const profile = ref('')
const profilePhoto = ref('https://d2tfco5ldvlr4r.cloudfront.net/profile/66x66/1728606997557-marcos-2b.jpg')
const profiles = ref([
  {label: 'Cliente', value: 'customer'},
  {label: 'Profissional', value: 'professional'},
])

const getProfile = async () => {
  events.progress = true
  events.profileType = profile.value
}

onBeforeMount(() => {
  if (!events.profileType) {
    events.profileType = auth.user.userdata.profile_primary
    profile.value = auth.user.userdata.profile_primary
  } else {
    profile.value = events.profileType
  }
})
</script>

<template>
  <client-only>
    <header class="bg-white py-4">
      <div class="container mx-auto block lg:flex items-center gap-10">
        <h1 class="text-4xl text-center font-extrabold">
          <NuxtLink href="/dashboard"><img class="w-full max-w-[150px] inline-block" src="@/static/logo-uuolf-horizontal-1.webp" alt="Uuolf"></NuxtLink>
        </h1>

        <div class="flex gap-3 lg:gap-5 justify-center lg:justify-end grow text-xs lg:text-lg font-semibold mt-5 lg:mt-0">
          <NuxtLink v-if="events.profileType === 'professional'" class="hover:bg-slate-100 hover:text-color-2 duration-150 flex items-center justify-center px-2 lg:px-6 rounded-lg" href="/dashboard/meu-plano">Meu Plano</NuxtLink>
          <NuxtLink class="hover:bg-slate-100 hover:text-color-2 duration-150 flex items-center justify-center px-2 lg:px-6 rounded-lg" href="/dashboard/minha-conta">Minha Conta</NuxtLink>
          <Button
              @click="auth?.deleteSession()"
              class="!rounded-lg !bg-color-2 !px-2 !py-0 lg:!py-2 lg:!px-6 !border-color-2 !text-white !text-sm lg:!text-lg hover:!bg-color-2 hover:!border-color-2">
            Sair
          </Button>
        </div>
      </div>
    </header>

    <div class="container mx-auto flex justify-between flex-wrap">
      <Breadcrumbs/>

      <div class="flex gap-3 items-center select-profile relative">
        <p class="text-lg font-bold">Olá, {{ auth?.user?.name ?? "" }}</p>

        <div>
          <Select class="!p-0" v-model="profile" @change="getProfile" :options="profiles" optionLabel="label" optionValue="value"></Select>
        </div>

        <ProgressBar v-if="events.progress" class="!absolute bottom-[-20px] left-0 w-full" mode="indeterminate" style="height: 6px"/>
      </div>
    </div>

    <hr class="container mx-auto my-5 mt-3">
  </client-only>
</template>

<style scoped>

</style>