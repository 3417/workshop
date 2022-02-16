<template>
  <div class="solar_form">
    <div class="solar_hit">
      <p class="solar_koto">{{ vhitokoto }}</p>
      <p class="solar_ple">
        <span>{{ vfrom ? vfrom : "未知" }}</span>
        <span>——</span>
        <span>{{ vfrom_who ? vfrom_who : "未知" }}</span>
      </p>
    </div>
  </div>
  <div
    class="solar"
    :style="{
      background: `url(${bgImg}) no-repeat`,
      backgroundSize: '100% 100%',
    }"
  ></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, defineComponent } from "vue";
import defaultImgs from '@as/imgs/default.jpg';
// import { useRouter, useRoute } from "vue-router";
const bgImg = ref(defaultImgs);
const vhitokoto = ref("");
const vfrom = ref("");
const vfrom_who = ref("");
// const route = useRouter();
const timer = ref(0);
defineComponent({
  name: "solar",
});
const getBackImg = () => {
  fetch("https://picsum.photos/1920/1080?random")
    .then((response) => {
      const { url } = response;
      let img = new Image();
      img.src = url;
      img.onload = function(){
        bgImg.value = img.src;
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch(function (e) {
      console.log("Oops, error");
    });
};

// 获取每日一言
const getSpeech = () => {
  fetch("https://v1.hitokoto.cn")
    .then((response) => response.json())
    .then((data) => {
      const { hitokoto, from, from_who } = data;
      vhitokoto.value = hitokoto;
      vfrom.value = from;
      vfrom_who.value = from_who;
    })
    .catch(console.error);
};

onMounted(() => {
  getBackImg();
  getSpeech();
});
timer.value = window.setInterval(() => {
  getBackImg();
  getSpeech();
}, 5 * 60 * 1000);
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');
.solar {
  width: 100vw;
  height: 100vh;
  transition: background-image,filter .5s linear;  //背景图动画效果
}
.solar_form {
  position: absolute;
  padding: 20px 30px;
  top: 50%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 240px;
  color:#444;
  font-weight: bold;
  letter-spacing: 2px;
  transition: top .2s ease-in-out;
  z-index:999;
  font-family: 'Ma Shan Zheng', cursive;
  &:hover{
    top:48%;
    box-shadow: -3px 8px 18px rgba(0, 0, 0, 0.3);
  }
}
.solar_form:hover+.solar{
  filter:blur(10px);
}
.solar_koto{
  margin-bottom: 5px;
  font-size:20px;
}
.solar_ple{
    text-align: right;
}
</style>
