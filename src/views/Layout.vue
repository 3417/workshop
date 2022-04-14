<template>
  <main class="lay_container">
    <section class="lay_search">
      <!-- 搜索框 -->
      <section class="lay-ips">
        <section class="lay_lf" @click="show = true">
          <i :class="['iconfont', actIconName]" :style="{color:actIconColor}"></i>
        </section>
        <section class="lay_rt">
          <input type="text" placeholder="请输入搜索的内容,按确定/Enter即可搜索" v-model="search" @keydown.enter="onSearch">
        </section>
      </section>
      <!-- 搜索引擎 -->
      <section class="lay-engine" v-if="show">
        <div class="lay_content">
          <var-row :gutter="10">
            <var-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item, key) in elist" :key="key" @click="onItem(item)">
              <div class="lay_li">
                <i :class="['iconfont', item.iconName]" :style="{color:item.color}"></i>
                <span>{{ item.name }}</span>
              </div>
            </var-col>
          </var-row>
        </div>
      </section>
    </section>
    <section class="lay_scroll" v-for="(ic, ij) in navJson" :key="ij">
      <section class="lay_category">
        <p class="lay__icon">
          <i :class="['iconfont', ic.category_icon]"></i>
        </p>
        <p class="lay__text">{{ ic.category_CN }}</p>
      </section>
      <section>
        <var-row :gutter="20">
          <var-col class="lay_col" :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(iv, ik) in ic.item_children"
            :key="ik">
            <a :href="iv.a_href" target="_blank">
              <div class="lay_item">
                <div class="lay__hd">
                  <div class="lay__logo">
                    <var-image width="40px" height="40px" fit="cover" radius="50%" :src="getImgUrl(iv.img_src)" />
                  </div>
                  <div class="lay__title one_ellipsis">{{ iv.child_name }}</div>
                </div>
                <div class="lay_bd two_ellipsis" :title="iv.child_desc">
                  {{ iv.child_desc }}
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
    <var-space>
      <var-back-top :duration="300" target=".lay_container" />
    </var-space>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import navJson from '../assets/db.json';
const search = ref("");
const actIconName = ref("icon-baidu");
const actIconColor = ref("#2319dc");
const actIconUrl = ref("https://www.baidu.com/s?wd=");
const show = ref(false);
const elist = ref([
  {
    iconName: "icon-baidu",
    color:'#2319dc',
    name: "百度",
    url: 'https://www.baidu.com/s?wd='
  },
  {
    iconName: "icon-gugegoogle114",
    color:'#4c8bf5',
    name: "谷歌",
    url: 'https://www.google.com/search?q='
  },
  {
    iconName: "icon-biying",
    color:'#0a8583',
    name: "必应",
    url: 'https://cn.bing.com/search?q='
  },
  {
    iconName: "icon-github2",
    color:'#24292e',
    name: "GitHub",
    url: 'https://github.com/search?utf8=✓&q='
  },
  {
    iconName: "icon-sousuo",
    color:'#f8b616',
    name: "好搜",
    url: 'https://www.so.com/s?q='
  },
  {
    iconName: "icon-sougou",
    color:'#fe620d',
    name: "搜狗",
    url: 'https://www.sogou.com/web?query='
  },
  {
    iconName: "icon-bilibili-s",
    color:'#f45a8d',
    name: "B站",
    url: 'http://search.bilibili.com/all?keyword='
  },
  {
    iconName: "icon-icon-zhihu",
    color:'#0078d7',
    name: "知乎",
    url: 'https://www.zhihu.com/search?type=content&q='
  }
])

const getImgUrl = (url: string) => {
  let reg = /[^\./\s]+(?:\/[^\/\s]+)+/
  let _match = reg.exec(url)
  let imgUrl = _match ? _match[0] : ''
  return new URL(`../assets/${imgUrl}`, import.meta.url).href;
}

const onItem = (item:any)=>{
  actIconColor.value = item.color;
  actIconName.value = item.iconName;
  actIconUrl.value = item.url;
  show.value = false;
}

const onSearch = ()=>{
  window.open(actIconUrl.value+search.value,'_blank');
  search.value = '';
}

</script>

<style lang="scss" scoped>
.lay_container {
  height: 100%;
  background: #f3f6f8;
  overflow: auto;

  .lay_search {
    position: relative;
    .lay-engine {
      position: absolute;
      top: 52px;
      left: 0;
      width: 100%;
      background: #FFF;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0px 5px 20px 0px #d8d7d7;
      transition: all 0.3s;
      z-index: 999;
      box-sizing: border-box;
      .lay_content {
        .lay_li {
          background-color: #f9f9f9;
          line-height: 30px;
          font-size: 14px;
          padding: 5px 10px 5px 10px;
          margin-bottom: 10px;
          color: #999;
          cursor: pointer;
          border-radius: 2px;
          i{
            margin-right: 6px;
            font-size:18px;
          }
        }
      }
    }

    .lay-ips {
      position: relative;

      .lay_lf {
        position: absolute;
        left: 0;
        width: 45px;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 8px;
        box-sizing: border-box;
        i{
          font-size: 22px;
        }
        &::after{
          content:"";
          position: absolute;
          right: 0;
          bottom: 0;
          border: 6px solid transparent;
          border-top-color: #ddd;
        }
      }

      .lay_rt {
        box-shadow: 0 1px 3px #ddd;
        padding: 0 12px 0 45px;
        background-color: #fff;
        height: 45px;
        line-height: 45px;
        border-radius: 2px;
      }

      input {
        font: 500 16px '微软雅黑';
        border: none;
        outline: none;
        width: 100%;
        height: inherit;
        padding-left: 8px;
      }
    }
  }

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

    .lay_category {
      display: flex;
      align-items: center;
      font: 500 18px '微软雅黑';
      margin-bottom: 15px;

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
          transform: translateY(-6px);
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
            color: #3273dc;
            font-weight: 700;
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

// 媒体查询
@media (min-width: 992px) {
  .lay_search {
    width: 650px;
    margin: 12px auto 35px;
  }
}

@media (max-width: 992px) {
  .lay_search {
    width: 100%;
    max-width: 650px;
    margin: 12px auto 35px;
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