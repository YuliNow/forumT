<!--
 * @author: LUOCAN
 * @create: 2021-06-23 18:57 PM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-07-06 08:59 AM
 * @desc: 
-->
<template>
  <div class="content">
    <Pointwrite
      v-show="pwrite"
      v-on="{ close: close }"
      :pwrite="pwrite"
    ></Pointwrite>
    <Headnav
      @logTo="logTo"
      style="position: relative; z-index: 10"
      :homewritedata="homewritedata"
      @writeTo="writeTo"
      :col="{ col1: '#86909c', col2: '#1e80ff' }"
      :subNavDis="false"
    ></Headnav>
    <div class="main">
      <!-- 左侧导航 -->
      <Pointnav
        :cards="cardsdata"
        v-on="{ pnclick: pnclick }"
        :attention="attention"
      ></Pointnav>
      <div class="center">
        <!-- 发帖子 -->
        <Release v-show="issue"></Release>
        <!-- 用户帖子 -->
        <Pointlist
          v-for="(item, index) in hotpointdata"
          :key="index"
          :hotpointdata="item"
          :index="index"
          @Reconcern="Reconcern"
          @concern="concernFrom"
          v-show="list"
        ></Pointlist>
        <div class="standby" v-show="list2">暂无资源！</div>
        <!-- :hotpointdata="hotpointdata" -->
      </div>
      <!-- 右侧用户信息 -->
      <div class="right">
        <!-- 个人信息 -->
        <div
          class="profile-box"
          v-for="item in user"
          :key="item.name"
          v-show="box"
        >
          <div class="pb">
            <div class="profile">
              <img
                :src="item.userimg ? item.userimg : $store.state.avatar"
                alt=""
              />
            </div>
            <div class="user-info">
              <div class="username">
                {{ item.name ? item.name : "不知名网友" }}
              </div>
              <div class="position"></div>
            </div>
          </div>
          <div class="stat-list">
            <div class="item">
              <div class="title">沸点</div>
              <div class="count">{{ item.hotpoints }}</div>
            </div>
            <div class="item">
              <div class="title">关注</div>
              <div class="count">{{ item.like }}</div>
            </div>
            <div class="item">
              <div class="title">关注者</div>
              <div class="count">{{ item.likes }}</div>
            </div>
          </div>
        </div>
        <!-- 精品沸点 -->
        <div class="related-pin">
          <div class="related-head">
            <span>精品沸点</span>
          </div>
          <div class="related-list" v-for="(item, i) in boutique" :key="i">
            <div class="related-item">
              <a class="related-a">
                <div class="related-box">
                  <div class="relateda">
                    {{ item.boxtext }}
                  </div>
                  <div class="relatedb">
                    <span>{{ item.like }} 赞 ·</span>
                    <span>{{ item.comment }} 评论</span>
                  </div>
                </div>
                <div
                  class="related-img"
                  :style="{ backgroundImage: 'url(' + item.img + ')' }"
                ></div>
              </a>
            </div>
          </div>
        </div>
        <!-- 玩转沸点 -->
        <div class="guide-link">
          <a>
            <img
              src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/6c1b9a023d0084efca85cc217a4ee962.svg"
              alt=""
            />
            <div class="guide">如何玩转沸点</div>
          </a>
        </div>
        <div class="guide-link gl">
          <a>
            <img
              src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/6c1b9a023d0084efca85cc217a4ee962.svg"
              alt=""
            />
            <div class="guide">如何玩转沸点</div>
          </a>
        </div>
      </div>
    </div>
    <RegLog v-show="log" @logClose="logClose" :LoSNow="num" @reglog="reglog" />
  </div>
</template>
<!-- 1198945130@qq.com -->
<!-- qwe123 -->
<script>
import Pointnav from "@/components/Pointnav.vue";
import Pointwrite from "@/components/Pointwrite.vue";
import Pointlist from "@/components/Pointlist.vue";
import Headnav from "@/components/Headnav.vue";
import RegLog from "@/components/RegLog.vue";
import Release from "@/components/ReleaseBoilingPoint.vue";
import { userAllInfo, concernList } from "@/api/user";
import { articleList, tagRanking } from "@/api/article";
export default {
  name: "Hotpoint",
  components: {
    Pointnav,
    Pointwrite,
    Pointlist,
    Headnav,
    RegLog,
    Release,
  },
  data() {
    return {
      log: 0,
      box: true,
      issue: true,
      pwrite: false,
      attention: "",
      list: true,
      list2: false,
      //Pointlist帖子数据
      hotpointdata: [],
      // 个人用户信息
      user: [],
      // 左侧列表数据
      cardsdata: [],
      // 帖子类型
      navtype: "",
      // 导航写文章与发沸点的切换
      homewritedata: [
        {
          namea: "写沸点",
          typea: "b",
          nameb: "发布文章",
          typeb: "a",
        },
      ],
      // 精品沸点数据
      boutique: [
        {
          boxtext:
            "🚢【寻找掘金品牌体验官｜活动篇】 掘友们，早上好！今天是我来到掘金的第2天，为xdm带来两重福利啦❣️🍗第1重福利 - 和我一样是17号加入掘金的朋友🙋🏻‍♀️🙋🏻 在哪里？！ -将在参与活动并加入掘金时间为17的幸运er中，随机抽取17位掘友，送全新「码赛克」系列周边一个🎁（自选）",
          like: "12",
          comment: "1",
          img: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e63482a79f094aa3ac20c34e79160a12~tplv-k3u1fbpfcp-watermark.image",
        },
        {
          boxtext:
            "🚢【寻找掘金品牌体验官｜活动篇】 掘友们，早上好！今天是我来到掘金的第2天，为xdm带来两重福利啦❣️🍗第1重福利 - 和我一样是17号加入掘金的朋友🙋🏻‍♀️🙋🏻 在哪里？！ -将在参与活动并加入掘金时间为17的幸运er中，随机抽取17位掘友，送全新「码赛克」系列周边一个🎁（自选）",
          like: "12",
          comment: "1",
          img: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e63482a79f094aa3ac20c34e79160a12~tplv-k3u1fbpfcp-watermark.image",
        },
        {
          boxtext:
            "🚢【寻找掘金品牌体验官｜活动篇】 掘友们，早上好！今天是我来到掘金的第2天，为xdm带来两重福利啦❣️🍗第1重福利 - 和我一样是17号加入掘金的朋友🙋🏻‍♀️🙋🏻 在哪里？！ -将在参与活动并加入掘金时间为17的幸运er中，随机抽取17位掘友，送全新「码赛克」系列周边一个🎁（自选）",
          like: "12",
          comment: "1",
          img: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e63482a79f094aa3ac20c34e79160a12~tplv-k3u1fbpfcp-watermark.image",
        },
      ],
      concern: {},
      // 初始请求页码
      page: 1,
      // 请求状态
      flag: false,
      num: 1,
    };
  },

  methods: {
    // 触发登录事件
    logTo(num) {
      this.log = num;
    },
    logClose(num) {
      this.log = num;
    },

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

    // 左侧导航点击事件
    pnclick(id) {
      if (id.e.target.id == "关注") {
        for (let i = 0; i < id.caredata.length; i++) {
          const ele = id.caredata[i];
          // 接收数据进行数据处理
          let a;
          if (typeof ele.updated_at == "string") {
            console.log(ele.updated_at);
          } else {
            let b = new Date().getTime() - ele.updated_at * 1000;
            a = Math.ceil((b % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let text;
            try {
              text = JSON.parse(ele.info);
            } catch (error) {
              text = ele.info;
            }

            ele.info = text;
            // 判断头像是否为空
            let reg = /(http|https):\/\/([\w.]+\/?)\S*/gi;
            // 判断头像是否为空
            if (ele.icon == null) {
              ele.icon = this.$store.state.avatar;
            } else {
              if (!reg.test(ele.icon)) {
                ele.icon = "http://api_devss.wanxikeji.cn/" + ele.icon;
              }
            }
            if (a > 12) {
              ele.updated_at = Math.floor(a / 12) + "天前";
            } else {
              ele.updated_at = a + "小时前";
            }
            if (ele.tags[0].tag_name == null) {
              ele.tags[0].tag_name = "默认";
            }
            // 判断正在回复的条件
            ele.state = false;
          }
        }
        let datas = id.caredata;
        // ! 获取 粉丝 与 关注 用户列表
        if (localStorage.getItem("user")) {
          let data = JSON.parse(localStorage.getItem("user"));
          concernList({ user_id: data.user_id }).then((res) => {
            this.concern = res.data.data;

            this.concern.my_concern.forEach((ele) => {
              datas.forEach((value) => {
                if (ele.be_concern_user_id == value.user_id) {
                  value.be_concern = true;
                } else {
                  value.be_concern = false;
                }
              });
            });
            this.hotpointdata = datas;
            if (this.hotpointdata == "") {
              this.list = false;
              this.list2 = true;
            } else {
              this.list = true;
              this.list2 = false;
            }
          });
        } else {
          this.hotpointdata = datas;
          if (this.hotpointdata == "") {
            this.list = false;
            this.list2 = true;
          } else {
            this.list = true;
            this.list2 = false;
          }
        }
      } else {
        if (id.id) {
          this.navtype = id.id;
        } else {
          this.navtype = "";
        }
        articleList({ type: 2, tag_id: this.navtype }).then((res) => {
          console.log(res.data.data.data);
          res.data.data.data.forEach((ele) => {
            // 接收数据进行数据处理
            let b = new Date().getTime() - ele.updated_at * 1000;
            let a = Math.ceil((b % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let text;
            try {
              text = JSON.parse(ele.info);
            } catch (error) {
              text = ele.info;
            }

            ele.info = text;
            // 判断头像是否为空
            let reg = /(http|https):\/\/([\w.]+\/?)\S*/gi;
            // 判断头像是否为空
            if (ele.icon == null) {
              ele.icon = this.$store.state.avatar;
            } else {
              if (!reg.test(ele.icon)) {
                ele.icon = "http://api_devss.wanxikeji.cn/" + ele.icon;
              }
            }
            if (a > 12) {
              ele.updated_at = Math.floor(a / 12) + "天前";
            } else {
              ele.updated_at = a + "小时前";
            }
            if (ele.tags[0].tag_name == null) {
              ele.tags[0].tag_name = "默认";
            }
            // 判断正在回复的条件
            ele.state = false;
          });

          let datas = res.data.data.data;
          // ! 获取 粉丝 与 关注 用户列表
          if (localStorage.getItem("user")) {
            let data = JSON.parse(localStorage.getItem("user"));
            concernList({ user_id: data.user_id }).then((res) => {
              this.concern = res.data.data;

              this.concern.my_concern.forEach((ele) => {
                datas.forEach((value) => {
                  if (ele.be_concern_user_id == value.user_id) {
                    value.be_concern = true;
                  } else {
                    value.be_concern = false;
                  }
                });
              });

              this.hotpointdata = datas;
              if (this.hotpointdata == "") {
                this.list = false;
                this.list2 = true;
              } else {
                this.list = true;
                this.list2 = false;
              }
            });
          } else {
            this.hotpointdata = datas;
            if (this.hotpointdata == "") {
              this.list = false;
              this.list2 = true;
            } else {
              this.list = true;
              this.list2 = false;
            }
          }
        });
      }
    },
    // 重新请求并更新关注信息
    Reconcern() {
      if (localStorage.getItem("user")) {
        let user = JSON.parse(localStorage.getItem("user"));
        this.articleRender(user);
        this.getHotArtList();
      }
    },
    // 沸点列表信息渲染
    articleRender(user) {
      // 沸点列表右侧信息渲染
      let tokenn = user.token;
      userAllInfo({ token: tokenn }).then((res) => {
        this.user = [
          {
            name: res.data.data.nick_name,
            userimg: res.data.data.icon,
            hotpoints: res.data.data.pins_all,
            likes: res.data.data.fans,
            like: res.data.data.concern,
          },
        ];
      });
    },

    // 更改关注状态
    concernFrom() {
      this.concern.my_concern.forEach((ele) => {
        this.hotpointdata.forEach((value) => {
          if (ele.be_concern_user_id == value.user_id) {
            value.be_concern = true;
          } else {
            value.be_concern = false;
          }
        });
      });
      this.$forceUpdate();
    },

    reglog(num) {
      console.log(num);
      if (num == 1) {
        this.num = 1;
      } else {
        this.num = 2;
      }
    },

    // 沸点列表信息渲染
    getHotArtList() {
      articleList({ type: 2, tag_id: this.navtype }).then((res) => {
        console.log(res.data.data.data);
        res.data.data.data.forEach((ele) => {
          // 接收数据进行数据处理
          let b = new Date().getTime() - ele.updated_at * 1000;
          let a = Math.ceil((b % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let text;
          try {
            text = JSON.parse(ele.info);
          } catch (error) {
            text = ele.info;
          }

          ele.info = text;
          // 判断头像是否为空
          let reg = /(http|https):\/\/([\w.]+\/?)\S*/gi;
          // 判断头像是否为空
          if (ele.icon == null) {
            ele.icon = this.$store.state.avatar;
          } else {
            if (!reg.test(ele.icon)) {
              ele.icon = "http://api_devss.wanxikeji.cn/" + ele.icon;
            }
          }
          if (a > 12) {
            ele.updated_at = Math.floor(a / 12) + "天前";
          } else {
            ele.updated_at = a + "小时前";
          }
          if (ele.tags[0].tag_name == null) {
            ele.tags[0].tag_name = "默认";
          }
          // 判断正在回复的条件
          ele.state = false;
        });

        let datas = res.data.data.data;
        // ! 获取 粉丝 与 关注 用户列表
        if (localStorage.getItem("user")) {
          let data = JSON.parse(localStorage.getItem("user"));
          // 用户关注与粉丝列表 接口
          concernList({ user_id: data.user_id }).then((res) => {
            this.concern = res.data.data;

            this.concern.my_concern.forEach((ele) => {
              datas.forEach((value) => {
                if (!value.be_concern) {
                  if (ele.be_concern_user_id == value.user_id) {
                    value.be_concern = true;
                  }
                }
              });
            });

            this.hotpointdata = datas;
          });
        } else {
          this.hotpointdata = datas;
        }
      });
    },
  },
  mounted() {
    let gl = document.querySelector(".gl");
    let vm = this;
    window.onscroll = function () {
      if (window.scrollY >= 730) {
        gl.style.cssText = " opacity: 1;";
      } else {
        gl.style.cssText = " opacity: 0;";
      }

      // 懒加载事件
      let scrollY = document.documentElement.scrollTop;
      let scrollH = document.documentElement.scrollHeight;
      let clientH = document.documentElement.clientHeight;

      let scrollBottom = scrollH - scrollY - clientH;

      if (scrollBottom <= 200 && !vm.flag) {
        vm.flag = true;
        vm.page++;
        // 调用文章列表api
        articleList({ type: 2, page: vm.page, tag_id: vm.navtype }).then(
          (res) => {
            res.data.data.data.forEach((ele) => {
              vm.hotpointdata.push(ele);
            });
            vm.flag = false;
          }
        );
      }
    };
    // 判断用户是否登录如果没有登录就隐藏
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));

      this.articleRender(user);

      this.box = true;
      this.issue = true;
      this.attention = true;
    } else {
      this.box = false;
      this.issue = false;
      this.attention = false;
    }

    // 沸点列表信息渲染
    this.getHotArtList();

    //左侧标签列表
    tagRanking({ ranking_num: 9 }).then((res) => {
      this.cardsdata = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #f4f5f5;
  &::before {
    content: "";
    display: table;
  }
  height: 100%;
}
.main {
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  margin-top: 20px;
  //   background: #fff;
  .center {
    width: 570px;
    margin: 0 15px;
    // background-color: #fff;
    .standby {
      width: 100%;
      height: 150px;
      background-color: #fff;
      font-size: 18px;
      color: #666;
      line-height: 150px;
      text-align: center;
    }
  }
  .right {
    width: 248px;
    .profile-box {
      background-color: #fff;
      padding: 16px;
      margin-bottom: 8px;
      .pb {
        display: flex;
        border-bottom: 1px solid rgba(92, 96, 102, 0.1);
        .profile {
          margin-right: 12px;
          img {
            width: 62px;
            height: 62px;
            border-radius: 50%;
          }
        }
        .user-info {
          text-align: left;
          margin: 12px 0;
          font-size: 15px;
          .username {
            width: 150px;
            color: #17181a;
            font-weight: 600;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          // .position {
          // }
        }
      }
      .stat-list {
        display: flex;
        padding: 16.5px 0;
        text-align: center;
        .item {
          flex: 1 1 33.333%;
          .title {
            font-size: 13px;
            color: #8a9aa9;
            margin-bottom: 3;
          }
          .count {
            font-size: 15px;
            font-weight: 600;
            color: #2e3135;
          }
        }
      }
    }
    .related-pin {
      background: #fff;
      .related-head {
        padding: 13px 16px;
        color: #2e3135;
        font-size: 15px;
        font-weight: 600px;
        text-align: center;
        border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
      }
      .related-list {
        padding: 0 16px;
        .related-item:not(:last-child) {
          border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
        }
        .related-item {
          padding: 12px 0;
          .related-a {
            display: flex;
            .related-box {
              color: #2e3135;
              font-size: 14px;
              width: 136px;
              .relateda {
                height: 35px;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .relatedb {
                margin-top: 16px;
                span {
                  color: #76797e;
                  font-size: 12px;
                }
              }
            }
            .related-img {
              width: 68px;
              height: 68px;
              margin-left: 12px;
              border-radius: 4px;
              background-position: 50%;
              background-size: cover;
              background-repeat: no-repeat;
            }
          }
        }
      }
    }
    .gl {
      opacity: 0;
      position: sticky;
      top: 60px;
      transition: all 0.3s;
    }
    .guide-link {
      background: #fff;
      padding: 16px;
      font-size: 14px;
      color: #2e3135;
      margin-top: 8px;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
      a {
        display: flex;
        align-items: center;
        img {
          width: 36px;
          height: 36px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>