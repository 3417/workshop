<template>
  <div class="menu">
    <div class="menu_top">
      <div class="menu_top__menus" v-html="iconSVG['menu']"></div>
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
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
const iconSVG = {
  menu: `<svg t="1646720433535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2757" width="20" height="20"><path d="M384 480H192c-52.8 0-96-43.2-96-96V192c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM192 160c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V192c0-17.6-14.4-32-32-32H192zM832 480H640c-52.8 0-96-43.2-96-96V192c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM640 160c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V192c0-17.6-14.4-32-32-32H640zM384 928H192c-52.8 0-96-43.2-96-96V640c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM192 608c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V640c0-17.6-14.4-32-32-32H192zM832 928H640c-52.8 0-96-43.2-96-96V640c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM640 608c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V640c0-17.6-14.4-32-32-32H640z" p-id="2758" fill="#ffffff"></path></svg>`,
  min: `<svg t="1646720570692" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5143" width="20" height="20"><path d="M895.531061 534.934007 126.604444 534.934007c-13.5716 0-24.573248-11.001648-24.573248-24.573248s11.001648-24.573248 24.573248-24.573248l768.926616 0c13.5716 0 24.573248 11.001648 24.573248 24.573248S909.102661 534.934007 895.531061 534.934007z" p-id="5144" fill="#ffffff"></path></svg>`,
  close: `<svg t="1646720535589" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3551" width="20" height="20"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="3552" fill="#ffffff"></path></svg>`,
  max: `<svg t="1646720549797" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4356" width="20" height="20"><path d="M917.268 132.531H106.732c-38.99 0-70.892 31.898-70.892 70.892v612.034c0 38.99 31.903 70.892 70.892 70.892h810.536c38.99 0 70.892-31.903 70.892-70.892V203.423c0-38.994-31.903-70.892-70.892-70.892z m12.335 689.813H93.809V195.948h835.788v626.396z" fill="#ffffff" p-id="4357"></path></svg>`,
  restore: `<svg t="1646720608178" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6074" width="20" height="20"><path d="M192 64l0 192L0 256l0 704 832 0 0-192 192 0L1024 64 192 64zM768 896 64 896 64 320l704 0L768 896zM960 704l-128 0L832 256 256 256 256 128l704 0L960 704z" p-id="6075" fill="#ffffff"></path></svg>`,
};
const store:any = useStore();
const router = useRouter();
const vmenu = ref([
  { text: "最小化", id: 2, actName: "min" },
  { text: "全屏化", id: 1, actName: "max"},
  { text: "关闭应用", id: 5, actName: "close" },
]);

const vbars = ref([
  { text: "随机壁纸", id: 3 },
  { text: "下载当前壁纸", id: 4 },
  { text: "情怀版本", id: 6 },
  { text: "MZ图片", id: 7 },
]);
store.state.isAdult ? vbars.value.splice(2,1,{ text: "平淡版本", id: 6 }) : vbars.value.splice(2,1,{ text: "情怀版本", id: 6 })
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
    const hasAdu = store.state.isAdult;
    hasAdu ? store.commit('SET_ADULT',false) : store.commit('SET_ADULT',true)
  } else if(ik === 7){
    router.push({name:"pic"})
  }
};
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
          background-color: #041dd7;
        }
      }
    }
  }
}
</style>