<template>
  <div class="container">
    <div class="zoom_coxt">
      <div class="zoom-move">
          Picture
      </div>
      <div class="menu_top">
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
    </div>
    <!-- 内容 -->
    <div class="content">
        <div class="alink">
            <div class="alink_item" v-for="item in cate.split(',')" :key="item.id" @click="onCate(item)">{{item}}</div>
        </div>
        <!-- 图片内容 -->
        <div class="img_container">
            <div class="img_list_warp">
                <div class="img_list" v-for="(iv,ik) in imgList" :key="ik">
                    <img :src="iv" alt="img">
                </div>
            </div>
            <div class="img_center">
                <p class="img_title">{{subTitle}}</p>
            </div>
        </div>
    </div>
    <!-- 返回首页 -->
    <div class="back" @click="onBack">homepage</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "pic",
});
</script>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const subTitle = ref('');
const imgList = ref([]);
const iconSVG = {
  menu: `<svg t="1646720433535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2757" width="20" height="20"><path d="M384 480H192c-52.8 0-96-43.2-96-96V192c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM192 160c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V192c0-17.6-14.4-32-32-32H192zM832 480H640c-52.8 0-96-43.2-96-96V192c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM640 160c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V192c0-17.6-14.4-32-32-32H640zM384 928H192c-52.8 0-96-43.2-96-96V640c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM192 608c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V640c0-17.6-14.4-32-32-32H192zM832 928H640c-52.8 0-96-43.2-96-96V640c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM640 608c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V640c0-17.6-14.4-32-32-32H640z" p-id="2758" fill="#ffffff"></path></svg>`,
  min: `<svg t="1646720570692" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5143" width="20" height="20"><path d="M895.531061 534.934007 126.604444 534.934007c-13.5716 0-24.573248-11.001648-24.573248-24.573248s11.001648-24.573248 24.573248-24.573248l768.926616 0c13.5716 0 24.573248 11.001648 24.573248 24.573248S909.102661 534.934007 895.531061 534.934007z" p-id="5144" fill="#ffffff"></path></svg>`,
  close: `<svg t="1646720535589" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3551" width="20" height="20"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="3552" fill="#ffffff"></path></svg>`,
  max: `<svg t="1646720549797" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4356" width="20" height="20"><path d="M917.268 132.531H106.732c-38.99 0-70.892 31.898-70.892 70.892v612.034c0 38.99 31.903 70.892 70.892 70.892h810.536c38.99 0 70.892-31.903 70.892-70.892V203.423c0-38.994-31.903-70.892-70.892-70.892z m12.335 689.813H93.809V195.948h835.788v626.396z" fill="#ffffff" p-id="4357"></path></svg>`,
  restore: `<svg t="1646720608178" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6074" width="20" height="20"><path d="M192 64l0 192L0 256l0 704 832 0 0-192 192 0L1024 64 192 64zM768 896 64 896 64 320l704 0L768 896zM960 704l-128 0L832 256 256 256 256 128l704 0L960 704z" p-id="6075" fill="#ffffff"></path></svg>`,
};
const vmenu = ref([
  { text: "最小化", id: 2, actName: "min" },
  { text: "全屏化", id: 1, actName: "max" },
  { text: "关闭应用", id: 5, actName: "close" },
]);

const cate = ref('女仆,jk制服,兔女郎,夏日泳装,动漫类,幼齿,萝莉,少女,御姐,巨乳,丰满微胖,黑丝,白丝,肉丝,网丝,吊带袜,腿控,脚控,臀控,旗袍')

const handleItem = (ik: number) => {
  if (ik === 1) {
    window.electron.send("maxBox");
  } else if (ik === 2) {
    window.electron.send("minBox");
  } else if (ik === 5) {
    window.electron.send("close");
  }
};

const onCate = (cat?:string)=>{
    fetch(`https://api.uomg.com/api/rand.img4?sort=${cat}&format=json`)
    .then((response) => response.json())
    .then((data) => {
      const { title,imgurl } = data;
      subTitle.value = title;
      imgList.value = imgurl;
    })
    .catch(console.error);
}

const onBack = ()=>{
    router.push({path:'/'})
}

onMounted(()=>{
    onCate('女仆');
})
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap");
.container {
  height: 100vh;
  background: #fafafa;
  overflow: auto;
}
.zoom_coxt {
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0,0,0,.125);
  box-shadow: 0 0 3px #eee;
  .zoom-move {
    flex: 1;
    height: 20px;
    font-family: "Ma Shan Zheng", cursive;
    padding-left:2px;
    user-select: none;
    -webkit-app-region: drag;
  }
}
.menu_top {
  position: relative;
  user-select: none;
  flex: 0 0 140px;
  padding-top: 6px;
  .menu-bars {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.content{
    padding-top:42px;
    .alink{
        width:62%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 22px;
       
    }
    .alink_item{
        font-family: "Ma Shan Zheng", cursive;
        text-decoration: underline;
        margin-right: 2px;
    }
}
.back{
    margin: 12px;
    background-color: #1a4fdf;
    height: 48px;
    line-height:48px;
    text-align: center;
    font-size:24px;
    color:#fff;
    border-radius: 4px;
    box-shadow: 1px 1px 3px #ddd;
    user-select: none;
    cursor: pointer;
    font-family: "Ma Shan Zheng", cursive;
}

.img_container{
    .img_list_warp{
        display: flex;
        align-items: center;
        flex-direction: column;
        .img_list{
            min-width:600px;
            height: 720px;
            margin-bottom:3px;
        }
        img{
            height: 100%;
        }
    }
    .img_center{
        text-align: center;
    }
    .img_title{
        font-family: "Ma Shan Zheng", cursive;
        font-size:20px;
        text-decoration: underline;
        color:#333;
        display: inline-block;
    }
}
</style>