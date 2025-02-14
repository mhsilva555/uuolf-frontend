<script setup lang="ts">
// import {authStore} from "~/store/authStore";
// const auth = authStore()
import requestService from "~/service/requestService";
import {eventStore} from "~/store/eventStore";

const events = eventStore()
const profileData = ref({})

onMounted(async () => {
  await requestService.get(`/profile/${events.profileType}`).then((response) => {
    events.progress = false
    if (response.data) {
      profileData.value = response.data
    }
  })
})
</script>

<template>
  <div>
    <Button label="Novo Projeto" icon="fa-light fa-plus" class="!bg-color-1 !border-none hover:!bg-color-2" />
    <MyProjects class="mt-5" />
  </div>
</template>

<style scoped>

</style>