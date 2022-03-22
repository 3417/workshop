<template>
  <div class="solar_form">
    <div class="solar_hit">
      <p class="solar_koto">{{ vhitokoto }}</p>
      <p class="solar_ple">
        <span>{{ vfrom || "未知" }}</span>
        <span>——</span>
        <span>{{ vfrom_who || "未知" }}</span>
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
  <!-- 屏蔽右键菜单 -->
  <!-- <div class="zoom-flex" v-contextmenu="vmenu">
    <div
      class="zoom"
      :title="iv.text"
      v-for="(iv, ik) in vmenu"
      :key="ik"
      @click.stop="handleItem(iv.id, $event)"
    >
      {{ iv.text }}
    </div>
  </div> -->
  <div class="zoom_coxt">
    <div class="zoom-move"></div>
    <!-- 菜单按钮快捷键 -->
    <v-menus @getParentFn="getParentFn" :bgImg="bgImg"/>
  </div>
  <!-- 数据更新完成提示框 -->
  <div :class="['zoom-tips', { 'zoom-in': isTips }]">壁纸切换成功</div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, defineComponent } from "vue";
import { useStore } from "vuex";
import vMenus from "@/views/menu.vue";
import defaultImgs from "@as/imgs/default.jpg";
// import { useRouter, useRoute } from "vue-router";
const bgImg = ref(defaultImgs);
const vhitokoto = ref("");
const vfrom = ref("");
const vfrom_who = ref("");
const isTips = ref(false);
const store = useStore();
const vmenu = ref([
  { text: "全屏化", id: 1, iconName: "fa-icon" },
  { text: "最小化", id: 2, iconName: "fa-icon" },
  { text: "随机壁纸", id: 3, iconName: "fa-icon" },
  { text: "下载当前壁纸", id: 4, iconName: "fa-icon" },
  { text: "关闭应用", id: 5, iconName: "fa-icon" },
]);
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
      isTips.value = true;
      setTimeout(() => {
        isTips.value = false;
      }, 1500);
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
      store.commit("SET_VOTO", data);
    })
    .catch(console.error);
};

const getParentFn = () => {
  getBackImg();
  getSpeech();
};

// 点击事件
const handleItem = (ik: Number, $event: any) => {
  if (ik === 1) {
    window.electron.send("maxBox");
  } else if (ik === 2) {
    window.electron.send("minBox");
  } else if (ik === 3) {
    getBackImg();
    getSpeech();
  } else if (ik === 4) {
    window.electron.send("downloadImg", bgImg.value);
  } else {
    window.electron.send("close");
  }
  const $events = $event.currentTarget.parentElement;
  $events.style.opacity = 0;
  $events.style.zIndex = -1000;
};
onMounted(() => {
  getParentFn();
});
timer.value = window.setInterval(() => {
  getParentFn();
}, 5 * 60 * 1000);
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
const vContextmenu = {
  created() {},
  beforeMount() {},
  mounted(el: any, binding: any, vnode: any) {
    function showMenu(e: any) {
      const { clientX, clientY, offsetX, offsetY } = e;
      const dWidth = document.body.clientWidth;
      const dHeight = document.body.clientHeight;
      const boxWidth = el.clientWidth;
      const boxHeight = el.clientHeight;
      e.preventDefault();
      el.style.opacity = 1; //右键显示
      el.style.zIndex = 1000;
      if (dWidth - offsetX < boxWidth) {
        el.style.left = offsetX - boxWidth + "px";
      } else {
        el.style.left = clientX + "px";
      }
      if (dHeight - offsetY < boxHeight) {
        el.style.top = offsetY - boxHeight + "px";
      } else {
        el.style.top = clientY + "px";
      }
    }
    function closeMenu(e: any) {
      el.style.opacity = 0;
      el.style.zIndex = -1000;
    }
    addEventListener("click", (e) => closeMenu(e));
    document.addEventListener("contextmenu", showMenu);
  },
  beforeUnmount() {},
  unmounted() {},
};
</script>


<style lang="scss" scoped>
/*@charset "UTF-8";*/
@import url("https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap");
.solar {
  width: 100vw;
  height: 100vh;
  // transition: background-image, filter 0.3s linear; //背景图动画效果
  transition: background-image 0.3s, background-color 0.2s, filter 0.2s;
  will-change: background-image;
}
.solar_form {
  position: absolute;
  padding: 20px 30px;
  top: 50%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  min-width: 240px;
  color: #000;
  font-weight: bold;
  letter-spacing: 2px;
  transition: transform 0.12s linear;
  z-index: 999;
  font-family: "Ma Shan Zheng", cursive;
  &:hover {
    transform: translate3d(-50%, -58%, 0);
    box-shadow: -3px 8px 18px rgba(0, 0, 0, 0.3);
  }
}
.solar_form:hover + .solar {
  filter: blur(4px);
}
.zoom-flex {
  padding: 7px 0px;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  position: absolute;
  z-index: 1000;
  left: 0;
  top: 0;
  user-select: none;
  box-shadow: rgb(0 0 0 / 12%) 0px 4px 19px 0px;
  border-radius: 6px;
  overflow: hidden;
  transition: opacity 0.3s ease 0s;
  opacity: 0;
}

.zoom_coxt {
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  .zoom-move {
    flex:1;
    height: 20px;
    -webkit-app-region: drag;
  }
}

.zoom {
  margin: 1px 0px;
  cursor: pointer;
  font-size: 13px;
  line-height: 1.4;
  padding: 8px 20px;
  color: rgb(51, 51, 51);
  white-space: nowrap;
  transition: none 0s ease 0s;
  background-color: rgb(255, 255, 255);
  font-family: "Ma Shan Zheng", cursive;
  &:hover {
    color: #fefefe;
    background-color: #7d89f0;
  }
}
.solar_koto {
  margin-bottom: 5px;
  font-size: 20px;
}
.solar_ple {
  text-align: right;
}

.zoom-tips {
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 14px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 4px 0;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.2s ease-in-out;
}
.zoom-in {
  opacity: 1;
  z-index: 1000;
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
