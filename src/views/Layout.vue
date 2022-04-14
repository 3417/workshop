<template>
  <main class="lay_container">
    <section class="lay_search">
      <var-input placeholder="请输入搜索内容,按回车 / Enter 搜索" clearable v-model="value">
        <template #prepend-icon>
          <section class="lay_group">
            <section class="lay__pr">
              <var-icon name="heart-half-full" title="点击切换搜索引擎" />
            </section>
            <section class="lay-engine">
              <div class="lay_title">选择你的默认搜索引擎</div>
              <div class="lay_content">
                <var-row :gutter="10">
                  <var-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item, key) in elist" :key="key">
                    <div class="lay_li">
                      <i :class="item.icon"></i>
                      <span>{{ item.name }}</span>
                    </div>
                  </var-col>
                </var-row>
              </div>
            </section>
          </section>
        </template>
      </var-input>
    </section>
    <section class="lay_scroll" v-for="(ic, ij) in navJson" :key="ij">
      <section class="lay_category">
        <p class="lay__icon">icon</p>
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
                    <!-- <var-image width="40px" height="40px" fit="cover" radius="50%" :src="iv.img_src" /> -->
                    <var-image width="40px" height="40px" fit="cover" radius="50%" src="https://varlet.gitee.io/varlet-ui/cat.jpg" />
                  </div>
                  <div class="lay__title one_ellipsis">{{ iv.child_name }}</div>
                </div>
                <div class="lay_bd two_ellipsis">
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
      <var-back-top :duration="300" target=".lay_container"/>
    </var-space>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import navJson from '../assets/db.json';
const value = ref("");
const elist = ref([
  {
    icon: "",
    name: "百度"
  },
  {
    icon: "",
    name: "谷歌"
  },
  {
    icon: "",
    name: "必应"
  },
  {
    icon: "",
    name: "GitHub"
  },
  {
    icon: "",
    name: "好搜"
  },
  {
    icon: "",
    name: "搜狗"
  },
  {
    icon: "",
    name: "B站"
  },
  {
    icon: "",
    name: "知乎"
  }
])
</script>

<style lang="scss" scoped>
.lay_container {
  height: 100%;
  background: #f3f6f8;
  overflow: auto;

  .lay_search {
    .lay_group {
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
        display: none;

        .lay_title {
          font: 400 14px '黑体';
          color: #333;
          margin-bottom: 12px;
        }

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
          }
        }
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