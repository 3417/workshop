<template>
  <section class="zoom-move"></section>
  <main class="lay_container">
    <!-- 头部菜单 -->
    <section class="lay_scroll" v-for="(ic, ij) in navJson" :key="ij">
      <section class="lay_category" :style="{background:`linear-gradient(45deg, ${randomColor()}, ${randomColor()})`}">
        <p class="lay__text">{{ ic.title }}</p>
      </section>
      <section>
        <var-row :gutter="20">
          <var-col class="lay_col" :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(iv, ik) in ic.child"
            :key="ik">
            <a :href="iv.url" target="_blank">
              <div class="lay_item">
                <div class="lay__hd">
                  <div class="lay__title one_ellipsis" :style="{color:randomColor()}">{{ iv.name }}</div>
                </div>
              </div>
            </a>
          </var-col>
        </var-row>
      </section>
    </section>
  </main>
  <!-- 设置切换主题颜色色值 -->
  <section class="lay_side">
    <var-back-top :duration="300" target=".lay_container" />
  </section>
</template>
<script lang="ts">
export default{
  name:"sex18"
}
</script>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { reactive, ref } from "vue";
import navJson from '../assets/lsp.json';
const router = useRouter();

const randomColor = ()=>{
  return "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
}
</script>

<style lang="scss" scoped>
.lay_container {
  background: #f3f6f8;
  overflow: auto;
  height: 100%;

  .lay_scroll {
    margin: 20px;
    overflow: hidden;
    box-shadow: 1px 2px 8px 1px rgb(0 0 0 / 10%);
    background: #fff;
    border-radius: 2px;
    padding: 14px 20px;

    &:nth-child(1) {
      margin-top: 35px;
    }

    &:last-child {
      margin-bottom: 40px;
    }

    .lay_category {
      display: flex;
      align-items: center;
      font: 500 22px '微软雅黑';
      margin-bottom: 15px;
      color: #fff;
      border-radius: 2px;
      .lay__icon {
        margin-right: 4px;
      }
    }

    .lay_col {
      overflow: hidden;

      .lay_item {
        border-radius: 6px;
        background: #fff;
        padding: 10px;
        width: 100%;
        margin-bottom: 15px;
        border: 1px solid #e4ecf3;
        box-shadow: 1px 2px 3px #f2f6f8;
        cursor: pointer;
        
        &:hover {
          transform: translateY(1px);
          box-shadow: 0 18px 24px -16px rgb(0 36 100 / 30%);
          transition: transform 0.3s ease;
        }

        .lay__hd {
          display: flex;
          align-items: center;
          min-width: 0;

          .lay__logo {
            margin-right: 10px;
          }

          .lay__title {
            flex: 2;
            font-weight: 500;
          }
        }

        .lay_bd {
          line-height: 17px;
          margin: 10px 0;
          font-size: 12px;
          color: #9f9f9f;
          height: 34px;
        }
      }
    }
  }
}

.lay_side {
  position: fixed;
  right: 20px;
  bottom: 60px;
}

.zoom-move {
  background-color: #f3f6f8;
  height: 20px;
  -webkit-app-region: drag;
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
}

@media (min-width: 1200px) {
  .lay_container {
    .lay_scroll {
      max-width: 1200px;
      margin: 20px auto;
    }
  }
}
</style>