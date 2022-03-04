<template>
  <transition>
    <div class="tran_root" v-if="show">
      <div
        class="sign"
        :style="{ background: `linear-gradient(${deg},${signImg},${botImg})` }"
      >
        <!-- 垂直居中竖排的文字 -->
        <div class="sign_text">
          <p>今日幸运字母</p>
          <p class="letter">{{ covto.type }}</p>
        </div>
        <!-- 时间 -->
        <div class="sign_time">
          <div class="sign_day">{{ day }}</div>
          <div class="sign_month">{{ month }}</div>
        </div>
        <!-- 鸡汤语句 -->
        <div class="sign_bane">
          <p class="_hitokoto">{{ covto.hitokoto }}</p>
          <p class="_name">
            <span>{{ covto.from ? covto.from : "未知" }}</span>
            <span>——</span>
            <span>{{ covto.from_who ? covto.from_who : "未知" }}</span>
          </p>
        </div>
      </div>
      <div class="popup"></div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const deg = ref("");
const signImg = ref("");
const botImg = ref("");
const month = ref("");
const day = ref("");
const store = useStore();
const covto = computed(() => store.state.voto);
function randomHexColor(): string {
  //随机生成十六进制颜色
  return (
    "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  );
}

function getDate() {
  const _day = new Date(),
    enMonth: any = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
  day.value = _day.getDate() < 10 ? "0" + _day.getDate() : String(_day);
  month.value = enMonth[_day.getMonth() + 1];
}

function randomNum(): number {
  const num = Math.floor(Math.random() * 360);
  return num < 10 ? num * 17 : num;
}
const getBackColor = () => {
  deg.value = randomNum() + "deg";
  signImg.value = randomHexColor();
  botImg.value = randomHexColor();
};
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
getBackColor();
getDate();
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap");
.sign {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  z-index: 1002;
  padding: 10px;
  min-height: 330px;
  width: 260px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.43);
}
.popup {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.66);
  z-index: 1000;
}

.sign_text {
  text-align: center;
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  font: 700 20px "黑体";
  user-select: none;
  padding: 45px 0;
  .letter {
    font-size: 60px;
    text-transform: Uppercase;
  }
}

.sign_time {
  display: flex;
  align-items: baseline;
  font: 800 12px "微软雅黑";
  color: #fff;
  text-shadow: 1px 0 6px rgba(0, 0, 0, 0.8);
  .sign_day {
    font-size: 50px;
    margin-right: 10px;
  }
  .sign_month {
    font-size: 28px;
  }
}

.sign_bane {
  color: #fff;
  font: 400 14px "Ma Shan Zheng", cursive;
  ._hitokoto {
    font-size: 16px;
    word-break: break-all;
  }
  ._name {
    text-align: right;
    margin-top: 8px;
    font-size: 12px;
  }
}
</style>
