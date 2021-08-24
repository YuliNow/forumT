<!--
 * @author: LUOCAN
 * @create: 2021-06-23 18:26 PM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-06-30 17:11 PM
 * @desc: 
-->

<template>
  <div class="pointnav">
    <div class="pn-nav">
      <div class="reconmmend n" @click="pnclick($event, tag_id)">推荐</div>
      <div class="hot pn n h" id="热门" @click="pnclick($event)">热门</div>
      <div
        class="attention pn n h"
        id="关注"
        @click="pnclick($event)"
        v-show="attention"
      >
        关注
      </div>
    </div>
    <div class="cards">
      <div
        class="pn n h"
        v-for="item in cards"
        :key="item.tag_id"
        @click="pnclick($event, item.tag_id)"
      >
        {{ item.tag_name }}
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import { concernList } from "@/api/user";
import { articleList } from "@/api/article";
export default {
  name: "Pointnav",
  props: {
    cards: Array,
    attention: Boolean,
  },
  data() {
    return {
      tag_id: "",
      caredata: [],
    };
  },

  methods: {
    pnclick(e, id) {
      let div = document.querySelectorAll(".n");
      div.forEach((e) => {
        e.style.color = "#909090";
        e.style.background = "none";
        e.classList.add("h");
      });
      e.target.style.color = "#FFF";
      e.target.style.background = "#007fff";
      e.target.classList.remove("h");
      if (e.target.id == "关注") {
        if (localStorage.getItem("user")) {
          // 沸点页面关注用户发送的帖子数据
          let user = JSON.parse(localStorage.getItem("user"));
          concernList({ user_id: user.user_id }).then((res) => {
            res.data.data.my_concern.forEach((ele) => {
              articleList({ user_id: ele.user_id, type: 2 }).then((res) => {
                res.data.data.data.forEach((e) => {
                  this.caredata.push(e);
                });

                // 发送标签id用于截取不同标签的数据
                this.$emit("pnclick", {
                  id: id,
                  e: e,
                  caredata: this.caredata ? this.caredata : "",
                });
                console.log(this.caredata);
              });
            });
          });
        }
      } else {
        // 发送标签id用于截取不同标签的数据
        this.$emit("pnclick", {
          id: id,
          e: e,
          caredata: this.caredata ? this.caredata : "",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pointnav {
  width: 88px;
  height: 460px;
  padding: 16px 12px;
  background-color: #fff;
  position: sticky;
  top: 60px;
  .pn-nav {
    position: relative;
    font-size: 14px;
    color: #909090;
    .pn {
      width: 100%;
      height: 30px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
    }
    .h {
      &:hover {
        cursor: pointer;
        background-color: hsla(0, 0%, 94.9%, 0.6) !important;
      }
    }
    .n {
      cursor: pointer;
    }
    .reconmmend {
      width: 100%;
      height: 30px;
      background-color: #007fff;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
    }
  }

  .cards {
    font-size: 14px;
    color: #909090;
    .pn {
      width: 100%;
      height: 30px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
    }
    .h {
      &:hover {
        cursor: pointer;
        background-color: hsla(0, 0%, 94.9%, 0.6) !important;
      }
    }
    .n {
      cursor: pointer;
    }
  }

  .divider {
    display: block;
    position: absolute;
    top: 130px;
    width: 88px;
    height: 1px;
    background: rgba(92, 96, 102, 0.1);
  }
}
</style>