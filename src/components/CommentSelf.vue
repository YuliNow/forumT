<!--
 * @author: DoubleW
 * @create: 2021-06-25 09:45 AM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-06-30 14:33 PM
 * @desc: 
-->
<template>
  <div class="comment_form df" :style="{ background: bgCol.bg }">
    <!-- 头像 -->
    <div class="avatar" v-show="imgDis">
      <img :src="selfIcon ? selfIcon : $store.state.avatar" alt="" />
    </div>
    <!-- 评论框右侧布局 -->
    <div class="input_box">
      <div
        class="rich_box"
        tabindex="1"
        @focus="focusFunc"
        @blur="blurFunc"
        :style="{ borderColor: bgCol.bd }"
      >
        <div
          class="rich_input"
          ref="richIpt"
          tabindex="1"
          @focus="focusFunc"
          contenteditable="true"
          @input="inputFunc($event)"
          placeholder="输入评论..."
        ></div>
        <!-- 图片列表 -->
        <div class="rich_img" v-show="listArr.length">
          <div
            class="img_preview"
            v-for="(item, index) in listArr"
            :key="index"
            :style="{ backgroundImage: 'url(' + item + ')' }"
          >
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 21 21"
              class="icon close-icon"
              @click="delet(index)"
            >
              <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
                <circle
                  cx="9.5"
                  cy="9.5"
                  r="9.5"
                  fill="#000"
                  stroke="#FFF"
                  opacity=".5"
                ></circle>
                <path
                  fill="#FFF"
                  d="M13.743 5.964L10.207 9.5l3.536 3.536-.707.707L9.5 10.207l-3.536 3.536-.707-.707L8.793 9.5 5.257 5.964l.707-.707L9.5 8.793l3.536-3.536z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="bottom df" v-show="bottomShow">
        <div class="bottom_left df">
          <div
            class="emoji df"
            tabindex="1"
            @focus="emojiTo(1)"
            @blur="emojiTo(2)"
          >
            <img
              src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/5594dbb510a36a6453e2d9a67d13f5ff.svg"
              alt=""
              class="cp"
            /><span class="cp">表情</span>
            <ul class="emojiArr" v-show="emojiDis">
              <li
                class="emojiItem"
                v-for="(item, idx) in $store.state.emojiArr.slice(
                  i * 63,
                  (i + 1) * 63
                )"
                :key="idx"
                @click="add(item)"
              >
                {{ item }}
              </li>

              <div
                :class="'circle circle' + value"
                @click="changeTo(value)"
                :style="{ backgroundColor: bgObj[value - 1] }"
                v-for="value in Math.ceil($store.state.emojiArr.length / 63)"
                :key="value * 1000"
              ></div>
            </ul>
          </div>
          <el-upload
            name="img"
            class="image df cp"
            action="http://api_devss.wanxikeji.cn/api/savePic"
            :on-success="UpSuccess"
          >
            <svg
              data-v-e284b7c0=""
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              class="icon image-icon"
            >
              <g data-v-e284b7c0="" fill="none" fill-rule="evenodd">
                <path data-v-e284b7c0="" d="M1 1h20v20H1z"></path>
                <g data-v-e284b7c0="" transform="translate(2 3)">
                  <path
                    data-v-e284b7c0=""
                    stroke="#027FFF"
                    stroke-width=".9"
                    d="M2.28.667h13.44c1.075 0 1.947.871 1.947 1.946v10.774a1.947 1.947 0 0 1-1.947 1.946H2.28a1.947 1.947 0 0 1-1.947-1.946V2.613c0-1.075.872-1.946 1.947-1.946zM.333 12.499L5 8l9.01 7.333m-6.343-4.842L10.333 8l7.136 5.914"
                  ></path>
                  <circle
                    data-v-e284b7c0=""
                    cx="13.5"
                    cy="4.5"
                    r="1.5"
                    fill="#027FFF"
                  ></circle>
                </g>
              </g></svg
            ><span>图片</span>
          </el-upload>
        </div>
        <div class="bottom_right df">
          <div class="tip">Ctrl or ⌘ + Enter</div>
          <button
            class="cp"
            :disabled="disabled"
            :style="{ opacity: disabled ? '0.4' : '1' }"
            @click.prevent="commentTo"
          >
            评论
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addComment } from "@/api/article";
export default {
  name: "commentSelf",
  props: {
    // 总数据
    data: { type: [Object, Array] },
    // 头像显示
    imgDis: { type: Boolean, default: true },
    // 聚、失功能是否生效
    foblNow: { type: Boolean, default: true },
    // 底部样式是否生效
    bottomShow: { type: Boolean, default: false },
    // 背景颜色
    bgCol: { type: Object },
    // 一级评论 id
    father_id: { type: Number, default: 0 },
  },
  data() {
    return {
      i: 0,
      emojiDis: false,
      bgObj: ["#d8d8d8", "#f0f0f0"],
      listArr: [],
      disabled: true,
      dgCol: {},
    };
  },
  computed: {
    selfIcon() {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user")).icon;
      } else {
        return "";
      }
    },
  },
  methods: {
    // 输入框聚焦失焦
    focusFunc() {
      if (this.foblNow) {
        if (localStorage.getItem("user")) {
          this.$emit("bgChange", 1);
        } else {
          this.$message({
            message: "请先登录",
            type: "error",
          });
        }
      }
    },
    blurFunc() {
      if (this.foblNow) {
        this.$emit("bgChange", 2);
      }
    },
    // 输入框实时判断内容是否为空
    inputFunc(e) {
      !e.target.innerHTML ? (this.disabled = true) : (this.disabled = false);
    },
    // 表情内容调换
    changeTo(num) {
      if (num == 1) {
        this.i = 0;
        this.bgObj = ["#d8d8d8", "#f0f0f0"];
      } else {
        this.i = 1;
        this.bgObj = ["#f0f0f0", "#d8d8d8"];
      }
      this.$forceUpdate();
    },
    emojiTo(num) {
      num == 1 ? (this.emojiDis = true) : (this.emojiDis = false);
    },
    // 添加表情到输入框中
    add(emoji) {
      let rich = this.$refs.richIpt;
      rich.innerHTML += emoji;
    },
    // 删除图片
    delet(i) {
      this.listArr.splice(i, 1);
    },
    // 图片上传成功后的数据处理
    UpSuccess(file) {
      console.log(file.data);
      // this.listArr.push("'http://api_devss.wanxikeji.cn/" + file.data + "'");
      this.listArr.push(file.data);
    },

    // 发表评论
    commentTo() {
      let info = localStorage.getItem("user");
      let infoo = JSON.parse(info);
      let ipt = this.$refs.richIpt;
      // father_id
      let params;
      if (this.father_id) {
        // 多级评论
        params = {
          token: infoo.token,
          comment_info: { content: ipt.innerHTML, imgs: this.listArr },
          article_id: this.data.article_id,
          father_id: this.father_id,
        };
      } else {
        // 一级评论
        params = {
          token: infoo.token,
          comment_info: { content: ipt.innerHTML, imgs: this.listArr },
          article_id: this.data.article_id,
        };
      }
      // 发表评论接口
      addComment(params).then((res) => {
        this.$message({ type: "success", message: res.data.msg });
        ipt.innerHTML = "";
        this.listArr = [];
        this.$forceUpdate();
      });
      location.reload();
    },
  },
};
</script>

<style lang="scss">
.df {
  display: flex;
}
.cp:hover {
  cursor: pointer;
}
// 手动去除upload组件后的文件列表
.el-upload-list {
  display: none;
}
.comment_form {
  margin: 0 0 16px;
  padding: 12px 16px;

  .avatar {
    margin-right: 13px;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
  .input_box {
    flex-grow: 1;

    .rich_box {
      width: 100%;
      box-sizing: border-box;
      color: #17181a;
      line-height: 20px;
      padding: 7px 12px;
      border-radius: 3px;
      border: 1px solid #f1f1f1;
      background-color: #fff;

      .rich_input:empty::before {
        content: attr(placeholder);
        color: #999;
        font-size: 14px;
      }

      .rich_img {
        margin-top: 7px;
        display: flex;
        .img_preview {
          width: 80px;
          height: 80px;
          text-align: right;
          margin-right: 10px;
          background-size: cover;
          background-position-x: 50%;

          svg {
            margin: 3px 3px 0 0;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }

    .bottom {
      margin-top: 6px;
      justify-content: space-between;

      .bottom_left {
        gap: 20px;
        font-size: 13px;
        color: #027fff;

        .emoji,
        .image {
          align-items: center;
          position: relative;
          user-select: none;

          .el-upload {
            display: flex;
            align-items: center;
          }

          img {
            width: 18px;
            padding-right: 3px;
          }
          svg {
            width: 18px;
            padding-right: 5px;
          }

          .emojiArr {
            width: 285px;
            height: 230px;
            position: absolute;
            top: 100%;
            background-color: #fff;
            display: grid;
            grid-template-columns: repeat(auto-fill, 27px);
            grid-template-rows: repeat(auto-fill, 27px);
            gap: 5px;
            box-shadow: 0 5px 18px 0 rgb(0 0 0 / 16%);
            border-radius: 2px;
            padding: 10px;

            .emojiItem {
              font-size: 20px;

              &:hover {
                cursor: pointer;
                transform: scale(1.2);
              }
            }
            .circle {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              position: absolute;
              bottom: 5px;

              &:hover {
                cursor: pointer;
                transform: scale(1.2);
              }
            }
            .circle1 {
              left: 133px;
            }
            .circle2 {
              left: 165px;
            }
          }
        }
      }
      .bottom_right {
        .tip {
          color: #c2c2c2;
          margin-right: 8px;
          font-size: 13px;
          line-height: 32px;
        }
        button {
          background-color: #027fff;
          border-radius: 2px;
          font-size: 15px;
          padding: 6px 15px;
          border: 0;
          color: #fff;
        }
      }
    }
  }
}
</style>