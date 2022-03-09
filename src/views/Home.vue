<template>
  <Solar />
  <sign :show="show" />
</template>

<script lang="ts" setup>
import Solar from "@cp/solar.vue";
import sign from "@cp/sign.vue";
import { onMounted, ref } from "vue";
const show = ref(false);
// 目前只做了每次打开就幸运签
const isShow = (num:number) => {
  let _show = window.sessionStorage.getItem("S");
  if (_show) {
    show.value = false;
  } else {
    show.value = true;
    setTimeout(() => {
      show.value = false;
      window.sessionStorage.setItem("S", "ok");
    }, 4666+num);
  }
};

onMounted(() => {
  window.electron.receive('main_show',function(evt:any,args:any){
      isShow(200)
  })
});
</script>

<style lang="scss" scoped></style>