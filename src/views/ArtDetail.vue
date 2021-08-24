<!--
 * @author: DoubleW
 * @create: 2021-06-23 09:58 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-05 18:16 PM
 * @desc: 文章详情页
-->
<template>
  <div class="frame">
    <HeadNav
      :subNavDis="false"
      :col="{ col1: '#86909c', col2: '#86909c' }"
      :homewritedata="homewritedata"
      @writeTo="writeTo"
      @logTo="logTo"
    />
    <div class="article">
      <div class="left">
        <!-- 用户 -->
        <div class="author">
          <div class="auth_left">
            <img
              :src="
                icon(userInfo.icon) ? icon(userInfo.icon) : $store.state.avatar
              "
              class="cp"
              alt=""
            />
            <div class="auth_cont">
              <div class="cont_top cp">
                {{ userInfo.nick_name ? userInfo.nick_name : "不知名网友" }}
                <span>Lv3</span>
              </div>
              <div class="cont_time">
                {{ timeCom }}<span>阅读 {{ datas.pv }}</span>
              </div>
            </div>
          </div>
          <div class="auth_right">
            <button class="cp" @click.prevent="concerTo">
              {{ userInfo.be_concern ? "已关注" : "关注" }}
            </button>
          </div>
        </div>
        <!-- 文章内容 -->
        <div class="content">
          <img
            :src="icon(datas.pic) ? icon(datas.pic) : ''"
            class="pic"
            alt=""
          />
          <div class="detail"></div>
        </div>

        <!-- 文章分类 -->
        <div class="article_tag">
          <div class="tag_type" v-show="datas.article_type">
            文章分类 <span>{{ datas.article_type }}</span>
          </div>
          <div class="tag" v-show="datas.tags">
            文章标签
            <span v-for="item in datas.tags" :key="item.id"
              ><img
                src="https://lc-gold-cdn.xitu.io/5d70fd6af940df373834.png?imageView2/2/w/40/h/40/q/85/format/webp/interlace/1"
                alt=""
              />
              {{ item.tag_name }}</span
            >
          </div>
        </div>

        <!-- 收录专栏 -->
        <div class="special_column">
          <div class="title">文章被以下专栏收录</div>
          <div class="column_cont">
            <div class="cont_left">
              <img
                src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae63700d17dc42888bd42279ca2e452b~tplv-k3u1fbpfcp-watermark.image"
                alt=""
              />
              <div class="cont_content">
                <div class="content_title">前端</div>
                <div class="content_desc">收录众多精选前端相关技术文章</div>
              </div>
            </div>
            <button class="cont_right cp">关注专栏</button>
          </div>
        </div>

        <!-- 底部作者 -->
        <div class="footer_auth cp">
          <div class="auth_left">
            <img
              :src="userInfo.icon ? userInfo.icon : $store.state.avatar"
              class="cp"
              alt=""
            />
            <div class="auth_cont">
              <div class="cont_top cp">
                {{ userInfo.nick_name ? userInfo.nick_name : "不知名网友" }}
                <span>Lv3</span><span class="account">前端</span>
              </div>
              <div class="cont_time">
                发布了 {{ userInfo.article_all }} 篇文章 ·
                <span> 获得点赞 {{ userInfo.pins_all }} · </span
                ><span> 获得阅读 {{ datas.pv }} </span>
              </div>
            </div>
          </div>
          <div class="auth_right">
            <button class="cp">
              {{ userInfo.be_concern ? "已关注" : "关注" }}
            </button>
          </div>
        </div>

        <div class="plug_in">
          <a href="#" class="install">安装掘金浏览器插件</a>
          <div class="contet">
            打开新标签页发现好内容，掘金、GitHub、Dribbble、ProductHunt
            等站点内容轻松获取。快来安装掘金浏览器插件获取高质量内容吧！
          </div>
        </div>

        <Comment :article="datas" />
      </div>
      <div class="right">
        <div class="about_author" v-show="authorDis">
          <div class="about_top">关于作者</div>
          <div class="about_bottom">
            <div class="author_info">
              <img
                :src="
                  icon(userInfo.icon)
                    ? icon(userInfo.icon)
                    : $store.state.avatar
                "
                alt=""
              />
              <div class="info_right">
                <div class="info_name">
                  <span class="name">{{
                    userInfo.nick_name ? userInfo.nick_name : "不知名网友"
                  }}</span>
                  <span class="level">Lv2</span>
                </div>
                <div class="info_tag">Web前端</div>
              </div>
            </div>
            <div class="good">
              <svg
                data-v-1f67eefc=""
                data-v-71f2d09e=""
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="26"
                viewBox="0 0 25 26"
                class="zan"
              >
                <g
                  data-v-1f67eefc=""
                  data-v-71f2d09e=""
                  fill="none"
                  fill-rule="evenodd"
                  transform="translate(0 .57)"
                >
                  <ellipse
                    data-v-1f67eefc=""
                    data-v-71f2d09e=""
                    cx="12.5"
                    cy="12.57"
                    fill="#E1EFFF"
                    rx="12.5"
                    ry="12.57"
                  ></ellipse>
                  <path
                    data-v-1f67eefc=""
                    data-v-71f2d09e=""
                    fill="#7BB9FF"
                    d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"
                  ></path>
                </g>
              </svg>
              <span>获得点赞 {{ userInfo.pins_all }}</span>
            </div>
            <div class="read">
              <svg
                data-v-1f67eefc=""
                data-v-71f2d09e=""
                width="25"
                height="25"
                viewBox="0 0 25 25"
                class="icon stat-view-icon"
              >
                <g
                  data-v-1f67eefc=""
                  data-v-71f2d09e=""
                  fill="none"
                  fill-rule="evenodd"
                >
                  <circle
                    data-v-1f67eefc=""
                    data-v-71f2d09e=""
                    cx="12.5"
                    cy="12.5"
                    r="12.5"
                    fill="#E1EFFF"
                  ></circle>
                  <path
                    data-v-1f67eefc=""
                    data-v-71f2d09e=""
                    fill="#7BB9FF"
                    d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"
                  ></path>
                </g>
              </svg>
              <span>文章被阅读 11951</span>
            </div>
          </div>
        </div>
        <div class="download">
          <img
            src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/article.acd26aa.png"
            alt=""
          />
          <div class="downText">
            <div class="text_top">下载掘金客户端</div>
            <div class="text_bottom">一个帮助开发者成长的社区</div>
          </div>
        </div>
        <div class="banner">
          <img
            src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/img/default.640d9a7.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <RegLog v-show="log" :LoSNow="1" @logClose="logClose" />
  </div>
</template>

<script>
import { personInfo, concernList, concern, concernDel } from "@/api/user";
import HeadNav from "@/components/Headnav.vue";
import Comment from "@/components/Comment.vue";
import RegLog from "@/components/RegLog.vue";
export default {
  name: "detail",
  components: { Comment, HeadNav, RegLog },
  data() {
    return {
      // 导航沸点与文章的渲染
      homewritedata: [
        {
          namea: "写文章",
          typea: "a",
          nameb: "发布沸点",
          typeb: "b",
        },
      ],
      pwrite: false,
      datas: {},
      userInfo: {},
      authorDis: false,
      log: 0,
    };
  },
  methods: {
    // 写文章跳转
    writeTo(e) {
      if (localStorage.getItem("user")) {
        if (e.target.id == "a") {
          this.$router.push("/edit");
        } else if (e.target.id == "b") {
          this.pwrite = true;
        }
      } else {
        this.$message({
          message: "请先登录",
          type: "error",
        });
      }
    },

    close() {
      this.pwrite = false;
    },

    // 触发登录事件
    logTo(num) {
      this.log = num;
    },
    logClose(num) {
      this.log = num;
    },
    concerTo() {
      if (localStorage.getItem("user")) {
        let token = JSON.parse(localStorage.getItem("user")).token;
        if (this.userInfo.be_concern) {
          // 取消关注
          concernDel({ token, be_concern_user_id: this.userInfo.user_id }).then(
            (res) => {
              if (res.data.code == 2000) {
                this.$message({ type: "success", message: res.data.msg });
              }
              this.$forceUpdate();
              this.$router.go(0);
            }
          );
        } else {
          // 关注
          concern({ token, be_concern_user_id: this.userInfo.user_id }).then(
            (res) => {
              console.log(res.data);
              if (res.data.code == 2000) {
                this.$message({ type: "success", message: res.data.msg });
              } else if (res.data.code == 2010) {
                this.$message({ type: "warning", message: res.data.msg });
              }
              this.$forceUpdate();
              this.$router.go(0);
            }
          );
        }
      } else {
        this.$message({
          message: "请登录",
          type: "error",
        });
      }
    },
  },
  mounted() {
    let data = JSON.parse(this.$route.query.item);
    this.datas = data;
    this.$nextTick(() => {
      let detail = document.querySelector(".detail");
      // 判断是否为json字符串 否则catch处理
      try {
        detail.innerHTML = JSON.parse(data.info).content;
      } catch (error) {
        detail.innerHTML = data.info;
      }

      detail.childNodes.forEach((ele) => {
        ele.children.forEach((value) => {
          if (value.tagName == "IMG") {
            value.style.maxWidth = "100%";
          }
        });
      });
    });
    // 个人信息api接口
    personInfo({ user_id: data.user_id }).then((res) => {
      this.userInfo = res.data.data;

      // ! 获取 粉丝 与 关注 用户列表
      //! 添加 be_concern 属性用于判断用户是否被我关注
      if (localStorage.getItem("user")) {
        let data2 = JSON.parse(localStorage.getItem("user"));
        concernList({ user_id: data2.user_id }).then((res) => {
          res.data.data.my_concern.forEach((ele) => {
            if (ele.be_concern_user_id == this.userInfo.user_id) {
              this.userInfo.be_concern = true;
            } else {
              this.userInfo.be_concern = false;
            }
            this.$forceUpdate();
          });
        });
      }

      console.log(this.userInfo);
    });
  },
  computed: {
    timeCom() {
      let m = new Date(this.datas.updated_at * 1000).getMonth();
      let d = new Date(this.datas.updated_at * 1000).getDay();
      let g = new Date(this.datas.updated_at * 1000).getFullYear();
      return g + "年" + m + "月" + d + "日";
    },
    // 头像url处理
    icon() {
      return (pic) => {
        let reg = /(http|https):\/\/([\w.]+\/?)\S*/gi;
        let icon;
        if (!pic) {
          icon = pic;
        } else {
          if (reg.test(pic)) {
            icon = pic;
          } else {
            icon = "http://api_devss.wanxikeji.cn/" + pic;
          }
        }

        return icon;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.cp:hover {
  cursor: pointer;
}
.frame {
  min-height: 100vh;
  background-color: #f4f5f5;
}
.article {
  width: 960px;
  margin: 20px auto 0;

  &::after {
    content: "";
    display: table;
    clear: both;
  }

  .left {
    width: 700px;
    background-color: #fff;
    float: left;
    padding: 0 20px;
    box-sizing: border-box;

    .author,
    .footer_auth {
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 24px 0;

      .auth_left {
        display: flex;
        align-items: center;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .auth_cont {
          color: #333;
          margin-left: 12px;

          .cont_top {
            font-weight: 700;
            font-size: 15px;

            span {
              color: #fff;
              font-size: 12px;
              margin-left: 8px;
              background-color: rgb(89, 157, 255);
            }
          }

          .cont_time {
            font-size: 13px;
            color: #909090;

            span {
              margin-left: 10px;
            }
          }
        }
      }
      .auth_right {
        display: flex;
        align-items: center;

        button {
          width: 55px;
          height: 26px;
          font-size: 13px;
          border: 1px solid #6cbd45;
          color: #6cbd45;
          background-color: #fff;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }

    .content {
      width: 100%;
      word-break: break-all;

      .pic {
        width: 100%;
        margin-bottom: 24px;
      }
    }

    .article_tag {
      width: 100%;
      padding: 24px 0;
      border-top: 1px solid #e5e6eb;
      display: flex;
      align-items: center;
      color: #333;
      font-size: 14px;
      margin-top: 30px;

      .tag_type {
        margin-right: 25px;
      }

      span {
        background-color: #fafafa;
        color: #4e5969;
        border-radius: 2px;
        margin-left: 12px;
        padding: 8px;

        &:hover {
          cursor: pointer;
          background-color: #f5f5f5;
        }
      }

      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }

    .special_column {
      color: #1d2129;
      font-size: 14px;

      .column_cont {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
        padding: 16px 17px;
        box-sizing: border-box;
        font-size: 16px;

        &:hover {
          background: #fafafa;
          cursor: pointer;
        }

        .cont_left {
          display: flex;
          justify-content: flex-start;

          .cont_content {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 16px;

            .content_desc {
              font-size: 14px;
              color: #4e5969;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .cont_right {
          height: 30px;
          font-size: 14px;
          padding: 0 14px;
          background-color: #1d7dfa;
          color: #fff;
          border: 0;
        }
      }

      img {
        width: 96px;
        height: 54px;
      }
    }

    .footer_auth {
      background-color: #f4f5f5;
      padding: 15px 17px;
      margin-bottom: 24px;

      .cont_time {
        span {
          margin-left: 0 !important;
        }
      }

      .account {
        font-weight: normal !important;
        color: #909090 !important;
        background-color: transparent !important;
      }
    }

    .plug_in {
      width: 100%;
      border-left: 6px solid #ddd;
      padding: 2px 0 2px 24px;
      margin-bottom: 30px;
      box-sizing: border-box;

      a {
        color: #007fff;
        font-size: 15px;
        text-decoration: none;
      }
      .contet {
        font-size: 13px;
        color: #909090;
        margin-top: 5px;
      }
    }
  }
  .right {
    width: 240px;
    height: 500px;
    float: right;

    .about_author {
      width: 100%;
      background-color: #fff;
      margin-bottom: 18px;

      .about_top {
        width: 100%;
        height: 43px;
        border-bottom: 1px solid hsla(0, 0%, 58.8%, 0.1);
        color: #333;
        font-size: 14px;
        line-height: 43px;
        padding: 0 0 0 15px;
      }
      .about_bottom {
        width: 100%;

        .author_info {
          display: flex;
          align-items: center;
          padding: 15px;
          box-sizing: border-box;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }

          .info_right {
            font-size: 16px;
            color: #000;
            margin-left: 15px;

            .info_name {
              display: flex;
              align-items: center;

              .name {
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .level {
                color: #fff;
                font-size: 10px;
                background-color: #6eceff;
                font-weight: bold;
                padding: 2px 5px;
                margin-left: 5px;
              }
            }
            .info_tag {
              color: #72777b;
              font-size: 15px;
              margin-top: 6px;
            }
          }
        }

        .good,
        .read {
          padding-left: 15px;
          display: flex;
          align-items: center;
          padding-bottom: 10px;

          span {
            font-size: 15px;
            color: #000;
            margin-left: 12px;
          }
        }
      }
    }

    .download {
      width: 100%;
      display: flex;
      justify-content: center;
      background-color: #fff;
      padding: 12px 0;
      margin-bottom: 18px;

      img {
        width: 50px;
        height: 50px;
      }

      .downText {
        font-size: 12px;
        color: #86909c;
        margin-left: 10px;

        .text_top {
          font-size: 14px;
          line-height: 22px;
          color: #1d2129;
          font-weight: 500;
          margin-bottom: 5px;
        }
      }
    }
    .banner {
      margin-bottom: 18px;

      img {
        width: 100%;
      }
    }
  }
}
</style>