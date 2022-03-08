<template>
  <div class="menu">
    <input class="toggle" id="menu" type="checkbox" />
    <label class="style" for="menu" >
      <i class="fa fa-bars" aria-hidden="true"></i>
    </label>
    <a
      class="tab"
      href="#"
      v-for="(iv, ik) in vmenu"
      :key="ik"
      :title="iv.text"
      @click="handleItem(iv.id, $event)"
    >
      <i :class="['fa', iv.iconName]"></i>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const vmenu = ref([
  { text: "全屏化", id: 1, iconName: "fa-window-maximize" },
  { text: "最小化", id: 2, iconName: "fa-window-minimize" },
  { text: "随机壁纸", id: 3, iconName: "fa-random" },
  { text: "下载当前壁纸", id: 4, iconName: "fa-download" },
  { text: "关闭应用", id: 5, iconName: "fa-window-close-o" },
  { text: "占位", id: 6, iconName: "fa-ban" },
]);

const emit = defineEmits(['getParentFn'])
const props = defineProps({
    bgImg:{type:String,default:''}
})

const vDrag = { //TODO:移动范围不加限制条件
  mounted(el: any, binding: any, vnode: any) {
    let disX:number,disY:number;
    function onDown(e:any) {
      const { clientX, clientY } = e;
      const odiv = e.target;
      el.setCapture &&　el.setCapture();
      // 计算元素的相对位置
      disX = clientX - odiv.offsetLeft;
      disY = clientY - odiv.offsetTop;
      document.onmousemove = (e) => {onMove(e)};
      document.onmouseup = (e) => {onDrop(e)};
    }
    function onDrop(e: any) {
      document.onmousemove = null;
      document.onmouseup = null;
      el.releaseCapture &&　el.releaseCapture();
    }
    function onMove(e: any) {
      let {clientX,clientY} = e;
      let left = clientX - disX;
      let top = clientY - disY;
      // 移动当前元素
      el.style.left = left +'px';
      el.style.top = top +'px';
    }
    el.addEventListener("mousedown", onDown);
  },
};

const handleItem = (ik: Number, $event: any) => {
  const dom:any = document.querySelector("#menu");
  if (ik === 1) {
    window.electron.send("maxBox");
  } else if (ik === 2) {
    window.electron.send("minBox");
  } else if (ik === 3) {
    emit('getParentFn')
  } else if (ik === 4) {
    window.electron.send("downloadImg", props.bgImg);
  } else if(ik === 5) {
    window.electron.send("close");
  }
  // dom.checked = false;
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.menu {
  position: absolute;
  right: 6%;
  top: 26%;
  transform: translate(-50%,-50%);
}

.toggle {
  display: none;
}

.toggle + .style {
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%) scale(1);
  z-index: 5;
  display: block;
  max-width: 60px;
  margin-bottom: 0;
  background: rgba(255, 255, 255, 0.52);
  box-shadow: inset 2px 2px 4px rgb(0 0 0 / 30%);
  color: #fff;
  font-size: 1.8em;
  text-align: center;
  transition: all 0.8s;
}
.toggle + .style:hover {
  box-shadow: inset 0px 1px 20px 0px rgba(0, 0, 0, 0.7);
}

.toggle:checked + .style {
  transform: translate(-50%, -50%) scale(0.96);
}

.menu input[type="checkbox"] + label:before {
  content: "";
  position: absolute;
}

.toggle + .style:before,
.toggle + .style:after {
  content: "";
  position: absolute;
  margin: -3px;
  border-radius: 5px;
  transition: all 0.3s;
}

.toggle + .style:before {
  width: 30px;
  height: 0px;
  left: 10px;
  top: 25px;
}

.toggle + .style:after {
  width: 0px;
  height: 30px;
  left: 25px;
  top: 10px;
}

.toggle:checked + .style:before,
.toggle:checked + .style:after {
  transform: rotate(135deg);
}

.toggle ~ .tab {
  position: absolute;
  background: rgba(255, 255, 255, 0.52);
  box-shadow: inset 2px 2px 4px rgb(0 0 0 / 30%);
  color: #fff;
  width: 55px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%) scale(0);
  transition: all 0.3s;
  opacity: 0;
  border-radius: 50%;
}

.toggle:checked ~ .tab {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.menu > .toggle:checked ~ .tab:nth-of-type(1) {
  top: -80px;
  left: 0px;
  transition-delay: 0s;
}

.menu > .toggle:checked ~ .tab:nth-of-type(2) {
  top: -46px;
  left: 70px;
  transition-delay: 0.125s;
}

.menu > .toggle:checked ~ .tab:nth-of-type(3) {
  top: 36px;
  left: 80px;
  transition-delay: 0.25s;
}

.menu > .toggle:checked ~ .tab:nth-of-type(4) {
  top: 80px;
  left: 0px;
  transition-delay: 0.375s;
}

.menu > .toggle:checked ~ .tab:nth-of-type(5) {
  top: 46px;
  left: -70px;
  transition-delay: 0.5s;
}
.menu > .toggle:checked ~ .tab:nth-of-type(6) {
  top: -36px;
  left: -80px;
  transition-delay: 0.625s;
}
</style>