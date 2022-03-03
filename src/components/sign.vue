<template>
  <div class="sign" :style="`background':'url('${signImg}') #fff no-repeat;`">
    <!-- 垂直居中竖排的文字 -->
    <!-- 时间 -->
    <!-- 鸡汤语句 -->
  </div>
  <div class="popup"></div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const signImg = ref("");

const getBgImg = () =>{
    const type = [1,2,3,4,5,6,7,8,9,10]
    const randomType = type[Math.floor((Math.random()*type.length))]
    fetch(`http://api.wpbom.com/api/wallpa.php?msg=${randomType}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("获取随机图片数据==>",data);
    })
    .catch(console.error);
}

getBgImg();
</script>

<style lang="scss" scoped>
.sign {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% auto;
  border-radius: 4px;
  z-index: 1002;
  padding: 10px;
  min-height: 280px;
  min-width: 200px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.43);
}
.popup {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .66);
  z-index:1000
}
</style>
