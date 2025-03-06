<script setup lang="ts">
import requestService from "~/service/requestService";

const items = ref([])

onMounted(async () => {
  await requestService.get('/alls-categories').then((response) => {
    items.value = response.data
  })
})
</script>

<template>
  <div class="w-full categories">
    <ul class="flex gap-10 justify-between relative">
      <li v-for="label in items" class="primary text-center font-bold text-xs pb-3 cursor-pointer">
            <span class="text-center" v-if="label.parent_id === null">
              <i :class="label.icon" class="block !text-3xl mb-2"></i>
              {{ label.category_name }}
            </span>

        <div class="headers hidden">
          <ul class="w-full left-0 top-[100%] absolute border shadow-xl flex gap-20 p-5 bg-white cursor-default">
            <li v-for="header in label.children">
              <span class="text-lg font-bold text-start block" v-if="header.category_header === 1">{{ header.category_name }}</span>

              <ul>
                <li v-for="children in header.children" class="font-light !text-[0.95rem] text-start my-4">
                  {{ children.category_name }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.categories {
  .primary:hover > .headers {
    display: flex;
  }
}
</style>