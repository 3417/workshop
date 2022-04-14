<template>
  <div class="menu">
    <div class="menu_top">
      <div class="menu_top_hd">
        <div class="menu_top__menus" v-html="iconSVG['home']" title="点我回首页" @click="onLayout"></div>
      </div>
      <div class="menu_child" id="menu">
        <div class="menu_child__items" v-for="(ij, il) in vbars" :key="il" @click="handleItem(ij.id)">
          {{ ij.text }}
        </div>
      </div>
    </div>
    <div class="menu-bars">
      <div
        class="menu_svg"
        v-for="(iv, ik) in vmenu"
        :key="ik"
        v-html="iconSVG[iv.actName]"
        @click="handleItem(iv.id)"
        :title="iv.text"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {useStore} from '@/store';
import {useRouter} from 'vue-router';
const iconSVG = {
  home:`<svg t="1649927246155" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2545" width="20" height="20"><path d="M937.067069 482.335377 556.719504 106.839307c-1.89107-2.251274-6.123464-6.173606-11.997242-10.048867-9.889231-6.522554-21.093411-10.486842-33.388435-10.486842-13.137205 0-24.610514 3.984754-34.245965 10.590196-5.826705 3.997034-9.844206 8.076956-12.117992 11.117199L85.643566 482.381425c-14.653745 14.434757-14.653745 37.890982 0 52.358485 14.538111 14.380522 33.883715 8.316409 50.366108-7.919367L161.532977 501.587859l350.847693-339.869664 374.329501 368.073007c20.077268 13.223163 37.773302 17.377786 50.358945 4.946662C951.720813 520.273431 951.720813 496.801856 937.067069 482.335377z" p-id="2546" fill="#ffffff"></path><path d="M793.007045 462.046285c-17.391089 0-31.567973 13.938454-31.634488 31.236422l0 0.085958 0 0.089028 0 350.143659c0 17.416671-14.371312 31.602765-32.119535 31.602765l-84.129072 0 0-192.166671c0-49.818639-40.803311-90.111321-91.14486-90.111321l-85.268012 0c-50.326199 0-91.143836 40.300868-91.143836 90.111321l0 192.166671L293.437146 875.204116c-17.750269 0-32.119535-14.186094-32.119535-31.602765L261.317611 493.391177c-0.033769-17.355273-14.21884-31.343869-31.611975-31.343869-17.418718 0-31.589462 13.96506-31.658024 31.302937l0 354.429265c0 49.844222 40.808428 90.133833 91.14486 90.133833l141.253094 0 10.389628 0 0-10.391674 0-240.262062c0-17.410532 14.365172-31.580253 32.119535-31.580253l76.801177 0c17.756409 0 32.119535 14.169721 32.119535 31.580253l0 240.262062 0 10.391674 10.391674 0 141.253094 0c50.321082 0 91.14486-40.297798 91.14486-90.133833L824.665069 493.322615C824.527946 475.958132 810.380738 462.046285 793.007045 462.046285z" p-id="2547" fill="#ffffff"></path></svg>`,
  min: `<svg t="1646720570692" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5143" width="20" height="20"><path d="M895.531061 534.934007 126.604444 534.934007c-13.5716 0-24.573248-11.001648-24.573248-24.573248s11.001648-24.573248 24.573248-24.573248l768.926616 0c13.5716 0 24.573248 11.001648 24.573248 24.573248S909.102661 534.934007 895.531061 534.934007z" p-id="5144" fill="#ffffff"></path></svg>`,
  close: `<svg t="1646720535589" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3551" width="20" height="20"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="3552" fill="#ffffff"></path></svg>`,
  max: `<svg t="1646720549797" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4356" width="20" height="20"><path d="M917.268 132.531H106.732c-38.99 0-70.892 31.898-70.892 70.892v612.034c0 38.99 31.903 70.892 70.892 70.892h810.536c38.99 0 70.892-31.903 70.892-70.892V203.423c0-38.994-31.903-70.892-70.892-70.892z m12.335 689.813H93.809V195.948h835.788v626.396z" fill="#ffffff" p-id="4357"></path></svg>`,
  restore: `<svg t="1646720608178" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6074" width="20" height="20"><path d="M192 64l0 192L0 256l0 704 832 0 0-192 192 0L1024 64 192 64zM768 896 64 896 64 320l704 0L768 896zM960 704l-128 0L832 256 256 256 256 128l704 0L960 704z" p-id="6075" fill="#ffffff"></path></svg>`,
};
const store = useStore();
const router = useRouter();
const vmenu = ref([
  { text: "最小化", id: 2, actName: "min" },
  { text: "全屏化", id: 1, actName: "max"},
  { text: "关闭应用", id: 5, actName: "close" },
]);

const vbars = ref([
  { text: "随机壁纸", id: 3 },
  { text: "下载当前壁纸", id: 4 },
  { text: "情怀版本", id: 6 }
]);
store.isAdult ? vbars.value.splice(2,1,{ text: "平淡版本", id: 6 }) : vbars.value.splice(2,1,{ text: "情怀版本", id: 6 })
const emit = defineEmits(["getParentFn"]);
const props = defineProps({
  bgImg: { type: String, default: "" },
});

const vDrag = {
  mounted(el: any, binding: any, vnode: any) {
    let disX: number, disY: number;
    function onDown(e: any) {
      const { clientX, clientY } = e;
      const odiv = e.target;
      el.setCapture && el.setCapture();
      // 计算元素的相对位置
      disX = clientX - odiv.offsetLeft;
      disY = clientY - odiv.offsetTop;
      document.onmousemove = (e) => {
        onMove(e);
      };
      document.onmouseup = (e) => {
        onDrop(e);
      };
    }
    function onDrop(e: any) {
      document.onmousemove = null;
      document.onmouseup = null;
      el.releaseCapture && el.releaseCapture();
    }
    function onMove(e: any) {
      let { clientX, clientY } = e;
      let left = clientX - disX;
      let top = clientY - disY;
      // 移动当前元素
      el.style.left = left + "px";
      el.style.top = top + "px";
    }
    el.addEventListener("mousedown", onDown);
  },
};

const handleItem = (ik: Number) => {
  if (ik === 1) {
    window.electron.send("maxBox");
  } else if (ik === 2) {
    window.electron.send("minBox");
  } else if (ik === 3) {
    emit("getParentFn");
  } else if (ik === 4) {
    window.electron.send("downloadImg", props.bgImg);
  } else if (ik === 5) {
    window.electron.send("close");
  } else if(ik === 6){
    const hasAdu = store.isAdult;
    hasAdu ? store.SET_ADULT(false) : store.SET_ADULT(true)
  }
};

const onLayout = ()=>{
  router.push('/')
}
onMounted(()=>{
  window.electron.receive('window-resize',function(evt:any,args:any){
      let obj = {text:"还原",id:1,actName:'restore'};
      let nobj = {text:"全屏化",id:1,actName:'max'};
      evt ? vmenu.value.splice(1,1,obj) :  vmenu.value.splice(1,1,nobj)
  })
})
</script>

<style lang="scss" scoped>
.menu {
  padding: 6px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: end;
  .menu-bars {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .menu_svg {
      margin: 0 8px;
    }
  }

  .menu_top {
    position:relative;
    user-select: none;
    .menu_top_hd{
      display: inline-flex;
      align-items: center;
      .menu_top__menus:nth-child(1){
        margin-right: 4px;
      }
    }
    &:hover .menu_child {
      display: block;
    }
    .menu_child {
      display: none;
      background-color: transparent;
      border-radius: 4px;
      position: absolute;
      left:0;
      min-width:120px;
      box-shadow: 0px 0px 2px rgb(0 0 0 / 30%);
      cursor: pointer;
      .menu_child__items {
        padding: 10px 12px;
        &:hover {
          background-color: #2c43f3;
        }
      }
    }
  }
}
</style>