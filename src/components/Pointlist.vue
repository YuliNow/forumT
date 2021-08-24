<!--
 * @author: LUOCAN
 * @create: 2021-06-24 09:37 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-05 17:23 PM
 * @desc: 
-->
<template>
  <div class="pin">
    <!-- <div class="pin" v-for="(dataNow, index) in alldatas" :key="dataNow.article_id"> -->
    <!-- 顶部 -->
    <div class="pin-head">
      <div class="account-group">
        <!-- 头像 -->
        <div class="user">
          <a
            @mouseenter="infoShow(index, hotpointdata, 1)"
            @mouseleave="infoHide(index)"
          >
            <img
              :src="hotpointdata.icon ? hotpointdata.icon : $store.state.avatar"
              alt=""
            />
            <Personal
              :class="'per' + index"
              :user="userinfo"
              @reconcern="reconcern"
            />
          </a>
          <div class="user-content">
            <div class="user-name">
              <span
                class="nameName"
                @mouseenter="infoShow((index + 1) * 222, hotpointdata, 2)"
                @mouseleave="infoHide((index + 1) * 222)"
                >{{
                  hotpointdata.nick_name ? hotpointdata.nick_name : "不知名网友"
                }}</span
              >
              <Personal
                :class="'per' + (index + 1) * 222"
                :user="userinfo"
                @reconcern="reconcern"
              />
            </div>
            <div class="user-title">
              <span></span>
              <span></span>
              <span>{{ hotpointdata.updated_at }}</span>
            </div>
          </div>
        </div>
        <!-- 关注 -->
        <button
          class="palbtn"
          @click.prevent="
            concernTo(hotpointdata.user_id, hotpointdata.be_concern)
          "
        >
          <span>{{ hotpointdata.be_concern ? "已关注" : "关注" }}</span>
        </button>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="pin-center">
      <div class="content-box">
        <div class="content-text ct">
          {{ Comcont(hotpointdata.info) }}
        </div>
        <div class="unfold" @click.stop="diszy($event)">展开</div>
      </div>
      <!-- 图片位子 -->
      <div class="content-img" v-if="Comimgs(hotpointdata.info).length">
        <img
          :src="item"
          v-for="(item, index) in Comimgs(hotpointdata.info)"
          :key="index"
        />
      </div>
      <!-- 链接位置 -->
      <div class="content-link" style="display: none">
        <div class="link-box">
          <div class="link-info">
            <div class="link-title">QQ音乐</div>
            <div class="link-domain">c.y.qq.com</div>
          </div>
          <div class="link-thumb"></div>
        </div>
      </div>
      <!-- 标签位子 -->
      <div class="content-title">
        <span>#{{ hotpointdata.tags[0].tag_name }}#</span>
      </div>
    </div>
    <!-- 底部 -->
    <div class="action-box">
      <div class="like-action ab">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          class="icon like-icon"
        >
          <g fill="none" fill-rule="evenodd">
            <path d="M0 0h20v20H0z"></path>
            <path
              stroke="#8A93A0"
              stroke-linejoin="round"
              d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"
            ></path>
          </g>
        </svg>
        <span>赞</span>
      </div>
      <div class="comment-action ab" @click="apply">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          class="icon comment-icon"
        >
          <g fill="none" fill-rule="evenodd">
            <path d="M0 0h20v20H0z"></path>
            <path
              stroke="#8A93A0"
              stroke-linejoin="round"
              d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"
            ></path>
          </g>
        </svg>
        <span>{{
          hotpointdata.comment_num == 0 ? "评论" : hotpointdata.comment_num
        }}</span>
      </div>
      <div class="share-action ab">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          class="icon share-icon"
        >
          <g fill="none" fill-rule="evenodd">
            <path d="M0 0h20v20H0z"></path>
            <g stroke="#8A93A0" stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M10 2.5v10M13.5 7h2.001c.552 0 .999.437.999.96v8.621c0 1.919-1.447 1.919-1.999 1.919H5.5c-.552 0-1.999 0-1.999-1.919v-8.62c0-.53.443-.961.999-.961H6.5M7.519 4.538L10.019 2l2.5 2.513"
              ></path>
            </g>
          </g>
        </svg>
        <span>分享</span>
      </div>
    </div>
    <Comment
      :article="hotpointdata"
      v-if="hotpointdata.state"
      class="com-ment"
    />
    <!-- </div> -->
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import Personal from "@/components/PersonInfo.vue";
import { concern, concernDel, personInfo, concernList } from "@/api/user";
export default {
  name: "Poinlist",
  components: { Comment, Personal },
  props: {
    hotpointdata: Object,
    index: Number,
  },
  data() {
    return {
      a: false,
      comDis: false,
      dataNow: {},
      re: false,
      text: "",
      userinfo: {},
      concern: {},
    };
  },
  computed: {
    // 信息内容处理
    Comcont() {
      return (content) => {
        let cont;
        if (typeof content == "object") {
          cont = content.content;
        } else {
          cont = content;
        }
        return cont;
      };
    },
    // 信息图片处理
    Comimgs() {
      return (info) => {
        let img = [];
        if (typeof info == "object") {
          if (Array.isArray(info.imgs)) {
            img = [...info.imgs];
            for (let i = 0; i < img.length; i++) {
              img[i] = "http://api_devss.wanxikeji.cn/" + img[i];
            }
          } else {
            img.push(info.imgs);
          }
        }
        return img;
      };
    },
  },
  watch: {
    hotpointdata: {
      handler(newer) {
        // console.log(newer);
        this.dataNow = newer;
      },
    },
  },
  methods: {
    diszy(e) {
      if (this.a) {
        e.target.parentNode.children[0].classList.add("ct");
        this.a = false;
        e.target.innerHTML = "展开";
      } else {
        e.target.innerHTML = "收缩";
        e.target.parentNode.children[0].classList.remove("ct");
        this.a = true;
      }
    },
    // 回复ui的显示与隐藏
    apply() {
      this.dataNow.state = !this.dataNow.state;
      this.$forceUpdate();
    },
    concernTo(id, con) {
      if (localStorage.getItem("user")) {
        let token = JSON.parse(localStorage.getItem("user")).token;
        if (con) {
          // 取消关注
          concernDel({ token, be_concern_user_id: id }).then((res) => {
            if (res.data.code == 2000) {
              this.$message({ type: "success", message: res.data.msg });
              // this.dataNow.be_concern = false;
              this.$emit("concern");
            }

            this.$forceUpdate();
          });
        } else {
          // 关注
          concern({ token, be_concern_user_id: id }).then((res) => {
            console.log(res.data);
            if (res.data.code == 2000) {
              this.$message({ type: "success", message: res.data.msg });
              // this.dataNow.be_concern = true;
              this.$emit("concern");
            } else if (res.data.code == 2010) {
              this.$message({ type: "warning", message: res.data.msg });
            }

            this.$forceUpdate();
          });
        }
        // location.reload();
      } else {
        this.$message({
          message: "请登录",
          type: "error",
        });
      }
      this.$emit("Reconcern");
    },
    // 个人信息展示与隐藏
    infoShow(i, item, num) {
      let infoArr = JSON.parse(localStorage.getItem("passer"))
        ? JSON.parse(localStorage.getItem("passer"))
        : [];
      let re = infoArr.some((ele) => {
        return ele.user_id == item.user_id;
      });
      if (!re) {
        personInfo({ user_id: item.user_id }).then((res) => {
          let perData = res.data.data;

          // ! 获取 粉丝 与 关注 用户列表
          //! 添加 be_concern 属性用于判断用户是否被我关注
          if (localStorage.getItem("user")) {
            let data = JSON.parse(localStorage.getItem("user"));

            concernList({ user_id: data.user_id }).then((res) => {
              let re = res.data.data.my_concern.some((ele) => {
                return ele.be_concern_user_id == perData.user_id;
              });
              console.log(re);
              // 对比判断是否存在关注id 有则为true
              if (re) {
                perData.be_concern = true;
              } else {
                perData.be_concern = false;
              }
              this.$forceUpdate();

              this.userinfo = perData;
              // 新加入一条数据
              infoArr.push(perData);
              localStorage.setItem("passer", JSON.stringify(infoArr));
            });
          }
        });

        let per = document.querySelector(`.per${i}`);
        per.style.display = "block";
        if (num == 1) {
          per.style.top = "57px";
        }
        per.style.left = "-116px";
      } else {
        // 若第二次查看同一人的数据 使用本地存储
        this.$store.commit("getInfo");
        this.$store.state.infoArr.forEach((ele) => {
          if (ele.user_id == item.user_id) {
            this.userinfo = ele;
            console.log(this.userinfo);
          }
        });

        let per = document.querySelector(`.per${i}`);
        per.style.display = "block";
        if (num == 1) {
          per.style.top = "57px";
        }
        per.style.left = "-116px";
      }
    },
    infoHide(i) {
      let per = document.querySelector(`.per${i}`);
      per.style.display = "none";
    },

    // 重新判断是否关注信息
    reconcern(item) {
      personInfo({ user_id: item.user_id }).then((res) => {
        let perData = res.data.data;

        // ! 获取 粉丝 与 关注 用户列表
        //! 添加 be_concern 属性用于判断用户是否被我关注
        if (localStorage.getItem("user")) {
          let data = JSON.parse(localStorage.getItem("user"));

          concernList({ user_id: data.user_id }).then((res) => {
            let re = res.data.data.my_concern.some((ele) => {
              return ele.be_concern_user_id == perData.user_id;
            });
            console.log(re);
            // 对比判断是否存在关注id 有则为true
            if (re) {
              perData.be_concern = true;
            } else {
              perData.be_concern = false;
            }
            this.$forceUpdate();

            this.userinfo = perData;
          });
        }
      });
    },
  },
  mounted() {
    let text = document.querySelectorAll(".content-text");
    text.forEach((ele) => {
      if (ele.offsetHeight < 119) {
        ele.parentNode.children[1].style.display = "none";
      } else if (ele.offsetHeight == 119) {
        ele.parentNode.children[1].style.display = "block";
      }
    });
  },
  updated() {
    let text = document.querySelectorAll(".content-text");
    text.forEach((ele) => {
      if (ele.offsetHeight < 119) {
        ele.parentNode.children[1].style.display = "none";
      } else if (ele.offsetHeight == 119) {
        ele.parentNode.children[1].style.display = "block";
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.pin {
  width: 100%;
  //   height: 172px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 3px;
  //顶部头像关注
  .pin-head {
    width: 526px;
    height: 48px;
    padding: 16px 24px 0 24px;
    .account-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user {
        display: flex;
        a {
          position: relative;

          img {
            border-radius: 50%;
            width: 45px;
            height: 45px;
          }

          &:hover {
            cursor: pointer;
          }
        }
        .user-content {
          text-align: left;
          margin-left: 12px;
          width: 170px;
          height: 45px;
          .user-name {
            width: 320px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 15px;
            color: #2e3135;
            font-weight: 600;
            position: relative;

            .nameName:hover {
              cursor: pointer;
            }
          }
          .user-title {
            color: #8a9aa9;
            font-size: 13px;
            margin-top: 4px;
          }
        }
      }
      .palbtn {
        width: 55px;
        height: 26px;
        background-color: #ffffff;
        border: 1px solid #6cbd45;
        color: #6cbd45;
        font-size: 13px;
        text-align: center;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  //中间内容
  .pin-center {
    width: 100%;
    .content-box {
      width: 445px;
      margin: 5px 0 0 81px;
      text-align: left;
      .content-text {
        color: #17181a;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        word-break: break-all;
        white-space: pre-line;
      }
      .ct {
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        display: -webkit-box;
      }
      .unfold {
        height: 20px;
        padding-top: 30px;
        color: #007fff;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .content-img {
      width: 100%;
      margin: 5px 0 0 81px;
      img {
        width: 200px;
        height: 200px;
        padding-right: 10px;
      }
    }
    .content-link {
      margin: 12px 48px 0 81px;
      .link-box {
        width: 410px;
        height: 63px;
        padding: 10px 16px;
        border: 1px solid #ebebeb;
        transition: all 0.3s;
        display: flex;
        &:hover {
          box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 10%);
        }
        .link-info {
          flex-grow: 1;
          background-color: #fff;
          border-radius: 4px;
          .link-title {
            font-size: 15px;
            font-weight: 500px;
          }
          .link-domain {
            margin-top: 25px;
            font-size: 14px;
            color: #8a93a0;
          }
        }

        .link-thumb {
          background: url(https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/023ed669a394d8fea5d4b84fdaf20e47.svg);
          background-repeat: no-repeat;
          background-size: cover;
          width: 65px;
          height: 65px;
        }
      }
    }

    .content-title {
      margin: 8px 48px 0 84px;
      span {
        color: #1d7dfa;
        font-size: 14px;
      }
    }
  }
  //   底部
  .action-box {
    display: flex;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    position: relative;
    height: 34px;
    font-size: 13px;
    font-weight: 500px;
    color: #8a93a0;
    margin-top: 16px;
    .ab {
      flex: 1 1 33.333%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 100%;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .like-action {
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -1rem;
        width: 1px;
        height: 2rem;
        background-color: #ebebeb;
      }
    }
    .comment-action {
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -1rem;
        width: 1px;
        height: 2rem;
        background-color: #ebebeb;
      }
    }
  }

  .com-ment {
    padding: 16px 20px 1px;
    box-sizing: border-box;
  }
  //评论
  .pin-comment {
    position: relative;
    border-top: 1px solid #ebebeb;
    padding-top: 16px;
    padding: 12px 16px;
    margin: 0 20px 16px 20px;
    .comment-form {
      display: flex;
      .avatar-box {
        width: 32px;
        height: 45px;
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
      .form-box {
      }
    }
  }
}
</style>