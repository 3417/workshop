<template>
  <div
    class="random_color"
    :style="{
      backgroundImage: `linear-gradient(${deg}deg, ${color1},${color2})`,
    }"
  >
    <div
      class="random_text"
      :style="{
        backgroundImage: `linear-gradient(${deg}deg, ${color1},${color2})`,
      }"
    >
      <p>愚蠢的大海</p>
      <p>愚蠢的郑军</p>
    </div>
  </div>
  <audio autoplay>
    <source src="./dj.mp3" type="audio/mp3" />
  </audio>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const deg = ref(0);
const color1 = ref("");
const color2 = ref("");
const time = ref(1);
const getColor = () => {
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
};

function randomNum(): number {
  const num = Math.floor(Math.random() * 360);
  return num < 10 ? num * 17 : num;
}

const setColor = () => {
  setInterval(() => {
    color1.value = getColor();
    color2.value = getColor();
    deg.value = randomNum();
  }, time.value);
};
setColor();
</script>

<style lang="scss" scoped>
.random_color {
  font-size: 6em;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .random_text {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }
}
</style>