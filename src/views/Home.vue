<template>
  <Solar />
  <sign :show="show" />
</template>

<script lang="ts" setup>
import Solar from "@cp/solar.vue";
import sign from "@cp/sign.vue";
import { onMounted, ref } from "vue";
const show = ref(false);
const isShow = () => {
  let _show = window.sessionStorage.getItem("S");
  if (_show) {
    show.value = false;
  } else {
    show.value = true;
    setTimeout(() => {
      show.value = false;
      window.sessionStorage.setItem("S", "ok");
    }, 6666);
  }
};

onMounted(() => {
  isShow();
});
</script>

<style lang="scss" scoped></style>