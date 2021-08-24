<!--
 * @author: DoubleW
 * @create: 2021-06-23 10:01 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-01 08:51 AM
 * @desc: 
-->
<template>
  <div class="com_frame">
    <form action="">
      <CommentSelf
        @bgChange="bgChange"
        :data="article"
        :bottomShow="nowBS"
        :bgCol="bgCol"
      />
      <!-- {{ commentList.data }} -->
      <ul class="comment_list">
        <li
          class="comment df"
          v-for="(item, index) in commentList.data"
          :key="index"
        >
          <div
            class="comment_left cp"
            @mouseenter="infoShow((index + 1) * 100, item, 1)"
            @mouseleave="infoHide((index + 1) * 100)"
          >
            <img
              :src="icon(item.icon) ? icon(item.icon) : $store.state.avatar"
              alt=""
            />
            <Personal :class="'per' + (index + 1) * 100" :user="userinfo" />
          </div>
          <div class="comment_right">
            <div class="netPeo cp">
              <span
                class="namePeo"
                @mouseenter="infoShow((index + 1) * 200, item, 2)"
                @mouseleave="infoHide((index + 1) * 200)"
                >{{ item.nick_name ? item.nick_name : "不知名网友" }}
                <Personal
                  :class="'per' + (index + 1) * 200"
                  :user="userinfo"
                /> </span
              ><span class="level cp" :style="{ background: levelbg }">Lv1</span
              ><span class="profess">&nbsp;</span>
            </div>
            <div class="content">{{ Cominfo(item.comment_info) }}</div>
            <div
              class="imgs"
              v-if="
                CominfoImg(item.comment_info) &&
                CominfoImg(item.comment_info).length > 0
              "
            >
              <div
                class="img"
                @click="imgTo(item.comment_info)"
                v-if="typeof CominfoImg(item.comment_info) == 'Array'"
              >
                <img
                  :src="icon(item)"
                  alt=""
                  v-for="(item, idx) in CominfoImg(item.comment_info)"
                  :key="idx"
                />
              </div>
              <div class="imgS" v-else>
                <img :src="icon(CominfoImg(item.comment_info))" alt="" />
              </div>
            </div>
            <div class="time df">
              <div class="time_left">{{ timeCom(item.created_at) }}前</div>
              <div class="time_right df">
                <div class="first df cp"><span>&#xe627;</span>点赞</div>
                <div class="second df cp" @click="applyTo(999, index)">
                  <span>&#xe612;</span>回复
                </div>
              </div>
            </div>

            <!-- 二级评论区 -->
            <div class="second_com">
              <CommentSelf
                :data="article"
                :imgDis="false"
                :foblNow="false"
                :bottomShow="true"
                :bgCol="{ bg: '#FAFBFC', bd: '#007fff' }"
                :father_id="item.comment_id"
                v-show="item.state"
              />
              <div
                class="comment2 df"
                v-for="(value, idx) in item.child"
                :key="value.comment_id"
              >
                <div
                  class="comment_left cp"
                  @mouseenter="infoShow((index + 1) * 300, item, 1)"
                  @mouseleave="infoHide((index + 1) * 300)"
                >
                  <img
                    :src="
                      icon(value.icon) ? icon(value.icon) : $store.state.avatar
                    "
                    alt=""
                  />
                  <Personal
                    :class="'per' + (index + 1) * 300"
                    :user="userinfo"
                  />
                </div>
                <div class="comment_right">
                  <div class="netPeo cp">
                    <span
                      class="namePeo"
                      @mouseenter="infoShow((index + 1) * 400, item, 2)"
                      @mouseleave="infoHide((index + 1) * 400)"
                      >{{ value.nick_name ? value.nick_name : "不知名网友" }}
                      <Personal
                        :class="'per' + (index + 1) * 400"
                        :user="userinfo"
                      /> </span
                    ><span class="level cp" :style="{ background: levelbg }"
                      >Lv2</span
                    ><span class="profess">软件开发工程师</span>
                  </div>
                  <div class="content">{{ Cominfo(value.comment_info) }}</div>
                  <div
                    class="imgs"
                    v-if="
                      CominfoImg(value.comment_info) &&
                      CominfoImg(value.comment_info).length > 0
                    "
                  >
                    <div
                      class="img"
                      @click="imgTo(value.comment_info)"
                      v-if="typeof CominfoImg(value.comment_info) == 'Array'"
                    >
                      <img
                        :src="icon(it)"
                        alt=""
                        v-for="(it, index) in CominfoImg(value.comment_info)"
                        :key="index"
                      />
                    </div>
                    <div class="imgS" v-else>
                      <img :src="icon(CominfoImg(value.comment_info))" alt="" />
                    </div>
                  </div>
                  <div class="time df">
                    <div class="time_left">
                      {{ timeCom(value.created_at) }}前
                    </div>
                    <div class="time_right df">
                      <div class="first df cp"><span>&#xe627;</span>点赞</div>
                      <div class="second df cp" @click="applyTo(index, idx)">
                        <span>&#xe612;</span>回复
                      </div>
                    </div>
                  </div>
                  <CommentSelf
                    :data="article"
                    :imgDis="false"
                    :foblNow="false"
                    :bottomShow="true"
                    :bgCol="{ bg: '#fff', bd: '#007fff' }"
                    :father_id="item.comment_id"
                    v-show="value.state"
                  />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { articleInfo } from "@/api/article";
import { personInfo } from "@/api/user";
import CommentSelf from "./CommentSelf.vue";
import Personal from "@/components/PersonInfo.vue";
export default {
  components: { CommentSelf, Personal },
  name: "comment",
  props: { article: { type: Object, default: () => {} } },
  // props: ["article", "user"],
  data() {
    return {
      borderColor: "#f1f1f1",
      levelbg: "#8CDBF4",
      commentList: [],
      childList: [],
      nowBS: false,
      bgCol: { bg: "#FAFBFC", bd: "#f1f1f1" },
      userinfo: {},
      // 图片加载错误预处理
      // defaultImg: 'this.src="' + require(this.$store.state.avatar) + '"',
    };
  },
  methods: {
    imgTo(info) {
      console.log(JSON.parse(info));
    },
    bgChange(value) {
      if (value == 1) {
        this.nowBS = true;
        this.bgCol.bd = "#007fff";
      } else {
        this.nowBS = false;
        this.bgCol.bd = "#f1f1f1";
      }
      this.$forceUpdate();
    },
    // 回复事件
    applyTo(num, idx) {
      let data = this.commentList.data;
      if (localStorage.getItem("user")) {
        if (data[idx].state) {
          data[idx].state = false;
        } else if (num != 999 && data[num].child[idx].state) {
          data[num].child[idx].state = false;
        } else {
          data.forEach((ele) => {
            ele.state = false;
            ele.child.forEach((value) => {
              value.state = false;
            });
          });
          // num 用于判断是一级评论还是二级评论
          if (num == 999) {
            data[idx].state = true;
          } else {
            data[num].child[idx].state = true;
          }
        }
      } else {
        this.$message({
          message: "请先登录",
          type: "error",
        });
      }
    },
    // 个人信息展示
    infoShow(i, item, num) {
      personInfo({ user_id: item.user_id }).then((res) => {
        // console.log(res.data.data);
        this.userinfo = res.data.data;
        let per = document.querySelector(`.per${i}`);
        per.style.display = "block";
        if (num == 1) {
          per.style.left = "-122px";
          per.style.top = "45px";
        } else {
          per.style.left = "-125px";
          per.style.top = "30px";
        }
      });
    },
    infoHide(i) {
      let per = document.querySelector(`.per${i}`);
      per.style.display = "none";
    },
  },
  watch: {
    article: {
      handler(newV) {
        let id = newV.article_id;
        // 评论列表 api
        articleInfo({ article_id: id }).then((res) => {
          if (res.data.data.data) {
            // 赋予初始回复状态
            res.data.data.data.forEach((ele) => {
              ele.state = false;
              if (ele.child) {
                ele.child.forEach((value) => {
                  value.state = false;
                });
              }
            });
            this.commentList = res.data.data;
          }
        });
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
    },
  },

  computed: {
    // 封面图片url处理
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
    // 时间计算
    timeCom: () => {
      return (time) => {
        let date = new Date();
        let timeT = date.getTime() - time * 1000;
        let day = timeT / (1000 * 60 * 60 * 24);
        // 更新时间数据判断
        if (day > 1) {
          if (day <= 31) {
            day = Math.floor(day) + "天";
          } else if (day > 31 && day / 30 <= 12) {
            day = Math.floor(day / 30) + "月";
          } else if (day / 30 > 12) {
            day = Math.floor(day / 12) + "年";
          }
          return day;
        } else if (day * 24 > 1) {
          return parseInt(day * 24) + "小时";
        } else {
          return Math.floor(day * 24 * 60) + "分钟";
        }
      };
    },
    Cominfo() {
      return (info) => {
        let data;
        try {
          data = JSON.parse(info).content;
          if (!data) {
            data = info;
          }
        } catch (error) {
          data = info;
        }
        return data;
      };
    },
    CominfoImg() {
      return (info) => {
        let data;
        try {
          data = JSON.parse(info).imgs;
        } catch (error) {
          data = [];
        }
        return data;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$col: #007fff;
.df {
  display: flex;
}
.cp:hover {
  cursor: pointer;
}
.com_frame {
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid #ebebeb;
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: -7px;
    left: 50%;
    background-color: #ebebeb;
    transform: translate(-50%, 0) rotate(45deg);
    width: 10px;
    height: 10px;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: -5px;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%, 0) rotate(45deg);
    width: 10px;
    height: 10px;
  }

  .comment_list {
    margin: 0 0 0 63px;

    .comment {
      width: 100%;
      margin-top: 16px;

      .comment_left {
        margin-right: 10px;
        height: 33px;
        position: relative;

        img {
          border-radius: 50%;
          width: 32px;
          height: 32px;
        }
      }
      .comment_right {
        flex-grow: 1;
        border-bottom: 1px solid #f1f1f1;

        .netPeo {
          font-size: 13px;
          color: #333;

          .namePeo {
            position: relative;
          }

          .level {
            font-weight: 400;
            margin: 0 4px 0 8px;
            color: #fff;
            font-size: 11px;
            padding: 0 2px;
            vertical-align: text-top;
          }
          .profess {
            color: #8a9aa9;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .content {
          margin: 9px 0 6px;
          font-size: 13px;
          word-break: break-all;
        }
        .imgs {
          display: grid;
          grid-template-columns: 80px 80px 80px;
          grid-auto-rows: 80px 80px 80px;
          grid-gap: 2px;
          .img,
          .imgS {
            img {
              width: 80px;
              height: 80px;
            }
          }
        }
        .time {
          justify-content: space-between;
          font-size: 13px;
          font-family: "iconfont";
          margin-bottom: 7px;

          .time_left {
            color: #8a9aa9;
          }
          .time_right {
            color: #8a93a0;

            .first {
              margin-right: 28px;
              align-items: center;

              &:hover {
                opacity: 0.8;
              }

              span {
                font-size: 16px;
              }
            }
            .second {
              align-items: center;

              &:hover {
                opacity: 0.8;
              }

              span {
                font-size: 20px;
              }
            }
            div span {
              margin-right: 5px;
            }
          }
        }
        .second_com {
          margin-bottom: 12px;
        }
        .comment2 {
          background-color: #fafbfc;
          box-sizing: border-box;
          padding: 12px 12px 0;

          &:last-child {
            .comment_right {
              border-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>