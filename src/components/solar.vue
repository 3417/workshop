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
  <div class="zoom-fing"></div>
  <div class="zoom-flex">
    <div :class="['zoom',iv.className]" :title="iv.text" v-for="(iv, ik) in vmenuIcon" :key="ik" @click.stop="handleItem(ik)"></div>
  </div>
  <div class="zoom-move"></div> 
</template>
<script lang="ts" setup>
import {
  onMounted,
  ref,
  onBeforeUnmount,
  defineComponent,
} from "vue";
import defaultImgs from "@as/imgs/default.jpg";
// import { useRouter, useRoute } from "vue-router";
const bgImg = ref(defaultImgs);
const vhitokoto = ref("");
const vfrom = ref("");
const vfrom_who = ref("");
const vmenuIcon = ref([{className:'',text:''},{className:'max',text:'最大化'},{className:'min',text:'最小化'},{className:'shuffle',text:'随机一下'},{className:'close',text:'关闭'}]);
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
      img.onload = function () {
        bgImg.value = img.src;
      };
    })
    .then((data) => {
      // console.log(data);
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

// 点击事件
const handleItem = (ik: Number) => {
  if(ik===1){
    window.electron.send('maxBox')
  }else if(ik===2){
    window.electron.send('minBox')
  }else if(ik===3){
    getBackImg();
    getSpeech();
  }else{
    window.electron.send('close')
  }
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
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap");
.solar {
  width: 100vw;
  height: 100vh;
  transition: background-image, filter 0.5s linear; //背景图动画效果
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
  color: #000;
  font-weight: bold;
  letter-spacing: 2px;
  transition: top 0.2s ease-in-out;
  z-index: 999;
  font-family: "Ma Shan Zheng", cursive;
  &:hover {
    top: 48%;
    box-shadow: -3px 8px 18px rgba(0, 0, 0, 0.3);
  }
}
.max{
  background: url('@as/imgs/max.png') no-repeat;
}
.min{
  background: url('@as/imgs/min.png') no-repeat;
}
.shuffle{
  background: url('@as/imgs/shuffle.png') no-repeat;
}
.close{
  background: url('@as/imgs/close.png') no-repeat;
}
.drag {
  background: url("@as/imgs/drag.png") no-repeat;
  -webkit-app-region: drag;
  animation: shake 12s ease-in-out infinite;
}

.zoom-flex{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position:absolute;
  top: 50%;
  user-select: none;
  transform: translate(38px,-50%);
  right:6px;
  transition: transform .2s ease-in;
}

.zoom-fing{
  background: url('@as/imgs/fig.png') no-repeat;
    background-size:100% auto;
    width:60px;
    height: 40px;
    position:absolute;
    right:0;
    top:50%;
    transform: translateY(-50%);
    opacity: .23;
    transition: right .2s ease-in-out;
    &:hover{
      right:36px;
    }
    &:hover+.zoom-flex{
      transform: translate(0,-50%);
    }
}

.zoom-move{
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:35px;
   -webkit-app-region: drag;
}
.zoom{
  width: 26px;
  height: 26px;
  background-size:100% auto;
  &:not(:last-child){
    margin-bottom:20px;
  }
}

.solar_form:hover + .solar {
  filter: blur(10px);
}
.solar_koto {
  margin-bottom: 5px;
  font-size: 20px;
}
.solar_ple {
  text-align: right;
}

@keyframes shake {
  2% {
    transform: translate(1.5px, -1.5px) rotate(-0.5deg);
  }

  4% {
    transform: translate(-1.5px, -0.5px) rotate(1.5deg);
  }

  6% {
    transform: translate(1.5px, 2.5px) rotate(-0.5deg);
  }

  8% {
    transform: translate(2.5px, 0.5px) rotate(-0.5deg);
  }

  10% {
    transform: translate(2.5px, -0.5px) rotate(-0.5deg);
  }

  12% {
    transform: translate(-0.5px, 1.5px) rotate(1.5deg);
  }

  14% {
    transform: translate(2.5px, -0.5px) rotate(1.5deg);
  }

  16% {
    transform: translate(0.5px, -1.5px) rotate(0.5deg);
  }

  18% {
    transform: translate(2.5px, 2.5px) rotate(-0.5deg);
  }

  20% {
    transform: translate(1.5px, -0.5px) rotate(1.5deg);
  }

  22% {
    transform: translate(-0.5px, 1.5px) rotate(0.5deg);
  }

  24% {
    transform: translate(-1.5px, 1.5px) rotate(0.5deg);
  }

  26% {
    transform: translate(2.5px, 0.5px) rotate(1.5deg);
  }

  28% {
    transform: translate(-0.5px, -0.5px) rotate(0.5deg);
  }

  30% {
    transform: translate(0.5px, -0.5px) rotate(0.5deg);
  }

  32% {
    transform: translate(1.5px, -0.5px) rotate(1.5deg);
  }

  34% {
    transform: translate(1.5px, 0.5px) rotate(-0.5deg);
  }

  36% {
    transform: translate(0.5px, 2.5px) rotate(0.5deg);
  }

  38% {
    transform: translate(-1.5px, -0.5px) rotate(0.5deg);
  }

  40% {
    transform: translate(0.5px, -0.5px) rotate(0.5deg);
  }

  42% {
    transform: translate(0.5px, -0.5px) rotate(1.5deg);
  }

  44% {
    transform: translate(-1.5px, 0.5px) rotate(1.5deg);
  }

  46% {
    transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
  }

  48% {
    transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
  }

  50% {
    transform: translate(-0.5px, -0.5px) rotate(0.5deg);
  }

  52% {
    transform: translate(-1.5px, 0.5px) rotate(1.5deg);
  }

  54% {
    transform: translate(2.5px, 0.5px) rotate(-0.5deg);
  }

  56% {
    transform: translate(1.5px, 2.5px) rotate(1.5deg);
  }

  58% {
    transform: translate(0.5px, 1.5px) rotate(1.5deg);
  }

  60% {
    transform: translate(-1.5px, -1.5px) rotate(1.5deg);
  }

  62% {
    transform: translate(0.5px, 1.5px) rotate(-0.5deg);
  }

  64% {
    transform: translate(1.5px, 2.5px) rotate(1.5deg);
  }

  66% {
    transform: translate(1.5px, -0.5px) rotate(1.5deg);
  }

  68% {
    transform: translate(-1.5px, 1.5px) rotate(0.5deg);
  }

  70% {
    transform: translate(0.5px, 0.5px) rotate(-0.5deg);
  }

  72% {
    transform: translate(-0.5px, -0.5px) rotate(0.5deg);
  }

  74% {
    transform: translate(0.5px, -1.5px) rotate(0.5deg);
  }

  76% {
    transform: translate(-0.5px, 1.5px) rotate(0.5deg);
  }

  78% {
    transform: translate(1.5px, -1.5px) rotate(-0.5deg);
  }

  80% {
    transform: translate(-1.5px, -0.5px) rotate(0.5deg);
  }

  82% {
    transform: translate(0.5px, -0.5px) rotate(0.5deg);
  }

  84% {
    transform: translate(2.5px, 2.5px) rotate(1.5deg);
  }

  86% {
    transform: translate(2.5px, -0.5px) rotate(1.5deg);
  }

  88% {
    transform: translate(0.5px, 0.5px) rotate(-0.5deg);
  }

  90% {
    transform: translate(-0.5px, -1.5px) rotate(-0.5deg);
  }

  92% {
    transform: translate(2.5px, 1.5px) rotate(-0.5deg);
  }

  94% {
    transform: translate(2.5px, -1.5px) rotate(-0.5deg);
  }

  96% {
    transform: translate(2.5px, 2.5px) rotate(0.5deg);
  }

  98% {
    transform: translate(2.5px, -0.5px) rotate(0.5deg);
  }

  0%,
  100% {
    transform: translate(0, 0) rotate(0);
  }
}
</style>
