<!--
 * @author: DoubleW
 * @create: 2021-06-24 11:59 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-01 10:33 AM
 * @desc: 文章发布编辑页
-->
<template>
  <div class="frame">
    <header>
      <input
        type="text"
        maxlength="80"
        class="title"
        placeholder="输入文章标题..."
        spellcheck="false"
        v-model="title_value"
      />
      <div class="right_box">
        <div class="status_text">文章将自动保存至草稿箱</div>
        <button class="xitu_btn cp">草稿箱</button>
        <div
          class="confirm"
          tabindex="1"
          @focus="confirm(1)"
          @blur="confirm(0)"
        >
          <button class="xitu_btn publish_btn cp" @click="confirmTo">
            发布
          </button>
          <!-- 确认发布 -->
          <div class="confirm_ui" v-show="con_Pub">
            <div class="con_title">发布文章</div>
            <!-- 分类 -->
            <div class="form_item">
              <div class="type_left">分类：</div>
              <div class="type_right">
                <div class="item">后端</div>
                <div class="item">前端</div>
                <div class="item">Android</div>
                <div class="item">iOS</div>
                <div class="item">人工智能</div>
                <div class="item">开发工具</div>
                <div class="item">代码人生</div>
                <div class="item">阅读</div>
              </div>
            </div>
            <!-- 添加标签 -->
            <div class="form_item">
              <div class="type_left">添加标签：</div>
              <div class="type_right">
                <div
                  class="input_select cp"
                  tabindex="0"
                  @blur="selTo(2)"
                  @focus="selTo(1)"
                >
                  <div class="input_box">
                    <div class="tag_list" v-show="choose_tag">
                      <span class="cont">{{ choose_tag }}</span>
                      <svg
                        aria-hidden="true"
                        width="14"
                        height="14"
                        viewBox="0 0 21 21"
                        class="icon close-icon"
                        @click="delTag"
                      >
                        <g
                          data-v-e284b7c0=""
                          data-v-1d94dede=""
                          fill="none"
                          fill-rule="evenodd"
                          transform="translate(1 1)"
                        >
                          <circle
                            data-v-e284b7c0=""
                            data-v-1d94dede=""
                            cx="9.5"
                            cy="9.5"
                            r="9.5"
                            fill="#000"
                            stroke="#FFF"
                            opacity=".5"
                          ></circle>
                          <path
                            data-v-e284b7c0=""
                            data-v-1d94dede=""
                            fill="#FFF"
                            d="M13.743 5.964L10.207 9.5l3.536 3.536-.707.707L9.5 10.207l-3.536 3.536-.707-.707L8.793 9.5 5.257 5.964l.707-.707L9.5 8.793l3.536-3.536z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div
                      class="input"
                      contenteditable="true"
                      placeholder="请搜索添加标签"
                      @focus="selTo(1)"
                    ></div>
                  </div>
                  <ul
                    class="select"
                    :style="{
                      opacity: choose_tag ? '0.4' : '1',
                    }"
                    v-show="selShow"
                  >
                    <li
                      class="byte-select-option"
                      v-for="(item, index) in select_tags"
                      :key="index"
                      @click="addTag(item)"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 文章封面 -->
            <div class="form_item">
              <div class="type_left">文章封面：</div>
              <div class="type_right">
                <el-upload
                  name="img"
                  action="http://api_devss.wanxikeji.cn/api/savePic"
                  :on-success="UpSuccess"
                  list-type="picture-card"
                  v-show="!titleImg"
                >
                </el-upload>
                <img
                  class="title_img"
                  :src="titleImg"
                  alt=""
                  v-show="titleImg"
                />
                <el-button
                  v-show="titleImg"
                  class="del_icon"
                  title="移除这张照片"
                  icon="el-icon-delete"
                  size="mini"
                  @click="delTitleImg"
                ></el-button>
              </div>
            </div>
            <!-- 收录至专栏 -->
            <div class="form_item">
              <div class="type_left">收录至专栏：</div>
              <div class="type_right">
                <div
                  class="column input_box"
                  tabindex="0"
                  placeholder="请搜索添加专栏，同一篇文章最多添加三个专栏"
                ></div>
              </div>
            </div>
            <!-- 编辑摘要 -->
            <div class="form_item">
              <div class="type_left">编辑摘要：</div>
              <div class="type_right">
                <div class="abstract">
                  <textarea
                    name=""
                    id="tetarea"
                    maxlength="100"
                    cols="55"
                    rows="7"
                    v-model="nowContent"
                  ></textarea>
                  <span>{{ nowContent.length }}/100</span>
                </div>
              </div>
            </div>
            <!-- 发布 -->
            <div class="footer">
              <button class="cancel">取消</button>
              <button class="confirm" @click="publishTo">确定并发布</button>
            </div>
          </div>
        </div>
        <div class="editor_switch">
          <div class="toggle_btn">
            <svg
              data-v-8af99a28=""
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                data-v-8af99a28=""
                d="M4.7998 9.6001L19.1998 9.6001L15.1998 5.6001"
                stroke="#86909C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                data-v-8af99a28=""
                d="M19.1997 14.3999L4.79971 14.3999L8.79971 18.3999"
                stroke="#86909C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <div class="panel">切换为富文本编辑器</div>
        </div>
        <div class="avator" tabindex="1" @focus="personShow" @blur="personHide">
          <img
            src="https://sf1-ttcdn-tos.pstatp.com/img/mosaic-legacy/3795/3033762272~300x300.image?imageView2/1/w/64/h/64/q/85/interlace/1"
            alt=""
            class="cp"
          />
          <div class="root_menu" v-show="rootDis">
            <div class="menu_group">
              <div class="item">写文章</div>
              <div class="item">草稿</div>
            </div>
            <div class="menu_group">
              <router-link to="/"><div class="item">我的主页</div></router-link>
              <div class="item">我喜欢的</div>
              <div class="item">我的收藏集</div>
              <div class="item">标签管理</div>
            </div>
            <div class="menu_group">
              <div class="item">设置</div>
              <div class="item about">
                关于
                <div class="menu_group item_group">
                  <div class="item">下载应用</div>
                  <div class="item">关于</div>
                  <div class="item">加入我们</div>
                  <div class="item">翻译计划</div>
                  <div class="item">合作伙伴</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <Editor class="editor" :getFullText="getFullText" />
  </div>
</template>

<script>
import Editor from "../components/Editor.vue";
import { addModifyArticle } from "../api/article";
export default {
  components: { Editor },
  name: "edit",
  data() {
    return {
      rootDis: false,
      title_value: "",
      Html: "",
      confirmDis: false,
      // 添加标签内容
      select_tags: [
        "前端",
        "后端",
        "JavaScript",
        "GitHub",
        "面试",
        "架构",
        "代码规范",
        "Vue.js",
        "算法",
        "CSS",
      ],
      choose_tag: "",
      selShow: false,
      titleImg: "",
      nowContent: "",
      con_Pub: false,
    };
  },
  methods: {
    // 个人操作界面显示与隐藏
    personShow() {
      this.rootDis = !this.rootDis;
    },
    personHide() {
      setTimeout(() => {
        this.rootDis = !this.rootDis;
      }, 100);
    },
    // 获取富文本 html 内容
    getFullText(html) {
      this.Html = html;
    },
    confirm(num) {
      num == 1 ? (this.confirmDis = true) : (this.confirmDis = false);
    },
    // 发布消息
    publishTo() {
      let info = localStorage.getItem("user");
      let infoo = JSON.parse(info);
      if (infoo) {
        let token = infoo.token;
        /**
         * obj.token token
         * this.title_value 标题
         * this.Html 帖子详情
         * [this.choose_tag] 标签
         * this.titleImg 封面图片
         * this.nowContent 描述
         */

        let params = {
          token: token,
          title: this.title_value,
          info: { content: this.Html },
          tags_name: [this.choose_tag],
          pic: this.titleImg,
          describe: this.nowContent,
        };
        // 调用发布文章接口
        addModifyArticle(params).then((res) => {
          console.log(res);
          if (res.code == 2000) {
            this.$message(res.msg);
            this.$router.push("/");
          }
        });
      }
    },
    // 添加标签
    addTag(value) {
      if (!this.choose_tag) {
        this.choose_tag = value;
      }
      this.selTo(2);
    },
    // 删除标签
    delTag() {
      this.choose_tag = "";
    },
    selTo(num) {
      num == 1 ? (this.selShow = true) : (this.selShow = false);
    },
    // 文章封面的添加与删除
    UpSuccess(file) {
      console.log(file);
      this.titleImg = "http://api_devss.wanxikeji.cn/" + file.data;
    },
    delTitleImg() {
      this.titleImg = "";
    },
    // 确认发布
    confirmTo() {
      this.con_Pub = !this.con_Pub;
    },
  },
};
</script>

<style lang="scss" scoped>
.cp:hover {
  cursor: pointer;
}
header {
  width: 100%;
  height: 63px;
  padding: 0 27px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  user-select: none;

  .title {
    font-size: 24px;
    font-weight: 500;
    color: #1d2129;
    border: none;
    flex-grow: 1;
  }

  .right_box {
    display: flex;
    align-items: center;

    .status_text {
      font-size: 14px;
      white-space: nowrap;
      color: #c9cdd4;
      user-select: none;
      margin: 0 8px;

      &:hover {
        cursor: default;
      }
    }

    .xitu_btn {
      color: #1d7dfa;
      background-color: #fff;
      height: 32px;
      padding: 2px 16px;
      font-size: 14px;
      line-height: 22px;
      border: 1px solid #1d7dfa;
      border-radius: 2px;
      margin: 0 8px;
    }

    .confirm {
      margin: 0 8px;
      position: relative;
      z-index: 21;

      button {
        margin: 0;
      }

      .confirm_ui {
        width: 560px;
        position: absolute;
        left: -500px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 2px;
        -webkit-box-shadow: 0 1px 2px #f1f1f1;
        box-shadow: 0 1px 2px #f1f1f1;

        .con_title {
          padding: 24px 20px 16px 20px;
          font-weight: 500;
          font-size: 18px;
          line-height: 24px;
          color: #1d2129;
          border-bottom: 1px solid #e5e6eb;
        }

        .form_item {
          display: flex;
          margin: 20px 20px 32px;

          .type_left {
            font-size: 14px;
            text-align: right;
            width: 85px;
            line-height: 28px;
            flex-shrink: 0;
          }
          .type_right {
            display: flex;
            flex-wrap: wrap;
            position: relative;

            .input_select {
              position: relative;
              z-index: 16;
            }

            .el-upload--picture-card {
              width: 160px;
              height: 86px;
              background-color: #fafafa;
            }

            .title_img {
              width: 160px;
            }

            .del_icon {
              position: absolute;
              top: 0;
              right: 0;
            }

            .item {
              box-sizing: border-box;
              margin-right: 5px;
              margin-bottom: 10px;
              padding: 0 8px;
              font-size: 14px;
              line-height: 28px;
              width: 88px;
              height: 28px;
              white-space: nowrap;
              overflow: hidden;
              text-align: center;
              text-overflow: ellipsis;
              border-radius: 2px;
              cursor: pointer;
              color: #86909c;
              background-color: #f4f5f5;
            }

            .input_box {
              width: 335px;
              border: 1px solid #e6e8eb;
              transition: all 0.3s;
              text-indent: 10px;
              font-size: 14px;
              padding: 5px 0;
              display: flex;

              &:hover {
                border: 1px solid #3370ff !important;
              }

              &:focus {
                border: 1px solid #3370ff !important;
                box-shadow: 0 0 0 2px #d6e8ff;
              }

              .tag_list {
                background-color: #f0f1f2;
                font-size: 12px;
                color: #282f38;
                margin-left: 10px;
                display: flex;
                align-items: center;
                border-radius: 2px;

                svg {
                  padding: 0 5px;
                }
              }
              .input {
                &:empty::before {
                  content: attr(placeholder);
                  font-size: 14px;
                  color: #999;
                }
              }
            }

            .column {
              &:empty::before {
                content: attr(placeholder);
                font-size: 14px;
                color: #999;
              }
              &:hover {
                cursor: pointer;
              }
            }

            .select {
              width: 335px;
              height: 240px;
              border: 1px solid #e6e8eb;
              border-radius: 2px;
              background-color: #fff;
              -webkit-box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
              box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
              overflow: auto;
              font-size: 14px;
              color: #333;
              position: absolute;
              top: 100%;
              left: 0;

              &::-webkit-scrollbar {
                width: 4px;
              }
              /* 滚动槽 */
              &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
                border-radius: 10px;
              }
              /* 滚动条滑块 */
              &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: rgba(0, 0, 0, 0.1);
                -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
              }
              &::-webkit-scrollbar-thumb:window-inactive {
                background: #c9cdd4;
              }

              li {
                padding: 8px 0 8px 16px;
                box-sizing: border-box;

                &:hover {
                  background-color: #f5f6f7;
                  cursor: pointer;
                }
              }
            }

            .abstract {
              position: relative;

              #tetarea {
                color: #1d2129;
                background: #fafafa;
                border: 1px solid #e6e8eb;
                padding: 6px 10px;
                border-radius: 2px;
                resize: none;
                font-size: 14px;

                &:hover {
                  background: #e5e6eb;
                  border-color: #1d7dfa;
                }

                &:focus {
                  background-color: #fff;
                }
              }

              span {
                color: rgb(238, 77, 56);
                position: absolute;
                right: 10px;
                bottom: 10px;
                font-size: 12px;
              }
            }
          }
        }
        .footer {
          width: 100%;
          height: 72px;
          border-top: 1px solid #e5e6eb;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          box-sizing: border-box;
          padding: 0 20px;

          button {
            width: 90px;
            height: 30px;
            border: 1px solid #1d7dfa;

            &:hover {
              cursor: pointer;
            }
          }
          .cancel {
            color: #1d7dfa;
            margin-right: 16px;
            background-color: #fff;
          }
          .confirm {
            color: #fff;
            background-color: #1d7dfa;
          }
        }
      }
    }

    .publish_btn {
      background-color: #1d7dfa;
      color: #fff;
    }

    .editor_switch {
      position: relative;
      z-index: 20;
      margin: 0 8px;

      .toggle_btn:hover {
        background-color: #dcdee3;
        cursor: pointer;

        & + .panel {
          display: block;
        }
      }

      .panel {
        display: none;
        font-size: 14px;
        width: 130px;
        position: absolute;
        top: 40px;
        left: 50%;
        -webkit-transform: translate(-50%);
        transform: translate(-50%, 0);
        color: #909090;
        padding: 12px 24px;
        background-color: #fff;
        border-radius: 2px;
        -webkit-box-shadow: 1px 1px 5px #9e9e9e;
        box-shadow: 1px 1px 5px #9e9e9e;

        &::after {
          content: "";
          display: block;
          width: 0;
          height: 0;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translate(-50%, 0);
          border-bottom: 10px solid #fff;
          border-top: 10px solid transparent;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
        }
      }
    }

    .avator {
      margin: 0 8px;
      position: relative;
      z-index: 40;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      .root_menu {
        width: 166px;
        position: absolute;
        top: 49px;
        right: -15px;
        font-size: 15px;
        background-color: #fff;
        color: #909090;
        border: 1px solid rgba(177, 180, 185, 0.45);
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);

        .menu_group {
          padding: 10px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);

          a {
            color: #909090;
            text-decoration: none;
          }

          .about {
            position: relative;

            &::before {
              content: "";
              display: block;
              position: absolute;
              right: 20px;
              top: 50%;
              width: 10px;
              height: 10px;
              background-color: #909090;
              transform: translate(0, -50%) rotate(45deg);
            }
            &::after {
              content: "";
              display: block;
              position: absolute;
              right: 22px;
              top: 50%;
              width: 10px;
              height: 10px;
              background-color: #fff;
              transform: translate(0, -50%) rotate(45deg);
            }

            &:hover {
              .item_group {
                display: block;
              }
            }

            .item_group {
              color: #909090 !important;
              display: none;
              width: 166px;
              background-color: #fff;
              border-radius: 4px;
              border: 1px solid rgba(177, 180, 185, 0.45);
              position: absolute;
              top: 0;
              left: -169px;

              .item:hover {
                color: #333;
              }
            }
          }

          &:last-child {
            border: 0;
          }

          .item {
            padding: 10px 14px;

            &:hover {
              color: #333;
              background-color: hsla(0, 0%, 94.9%, 0.5);
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.editor {
  position: relative;
  z-index: 30;
}
</style>