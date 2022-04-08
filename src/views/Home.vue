<template>
  <component :is="isAdults ? Adult :Solar" />
  <sign :show="show" />
</template>

<script lang="ts" setup>
import Solar from "@cp/solar.vue";
import Adult from "@cp/adult.vue";
import sign from "@cp/sign.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "@/store";
const store = useStore();
const show = ref(false);
const isAdult = ref(true);
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
    }, 3666+num);
  }
};

const isAdults = computed(()=>{
    return store.isAdult;
})

onMounted(() => {
  window.electron.receive('main_show',function(evt:any,args:any){
      console.log("加载主页面-显示签到模块, %c I am ready","color:#0f0;font-size:32px;");
      isShow(100);
  })
});
</script>

<style lang="scss" scoped></style>