<script setup lang="ts">

</script>

<template>
<footer class="bg-white nav-fixed p-5 py-3 fixed bottom-0 left-0 w-full z-[500]">
  <div class="container mx-auto grid grid-cols-4 text-xs text-color-2">
    <div class="item-nav-fixed">
      <Icon class="icon" name="mdi:bullhorn-outline" />
      <span class="text-color-1">Projetos</span>
    </div>

    <div class="item-nav-fixed">
      <Icon class="icon" name="mdi:star-circle" />
      <span class="text-color-1">ojetos</span>
    </div>

    <div class="item-nav-fixed">
      <Icon class="icon" name="mdi:hand-coin" />
      <span class="text-color-1">Moedas</span>
    </div>

    <div class="item-nav-fixed">
      <Icon class="icon" name="mdi:account" />
      <span class="text-color-1">Minha Conta</span>
    </div>
  </div>
</footer>
</template>

<style scoped>
.nav-fixed {
  box-shadow: -1px -1px 20px 1px rgba(0,0,0,0.2);
}
.item-nav-fixed {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  & span {
    display: block;
  }
  & .icon {
    font-size: 1.5rem !important;
    margin-bottom: 5px;
  }
}
</style>