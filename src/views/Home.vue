<!--
 * @author: DoubleW
 * @create: 2021-06-17 15:37 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-05 15:03 PM
 * @desc: 
-->
<template>
  <div class="home">
    <!-- <div>这是导航页</div> -->
    <Headnav
      @twoChange="changeTo"
      @logTo="logTo"
      style="position: sticky; top: 0; z-index: 10"
      @linkage="linkage"
      :homewritedata="homewritedata"
      @writeTo="writeTo"
      :col="{ col1: '#1e80ff', col2: '#86909c' }"
    ></Headnav>
    <HomeType
      :list="tagList"
      :status="status"
      v-on:showM="showTo"
      v-show="tagList"
      style="position: relative; z-index: 5"
    />
    <div class="frame" style="position: relative; z-index: 1">
      <div class="left">
        <!-- 热门分类 -->
        <div class="type">
          <div
            class="type_name cp"
            @click="typeCho(1)"
            :style="{ color: typeCol.col1 ? typecol2 : typecol1 }"
          >
            热门
          </div>
          <div
            class="type_name cp"
            @click="typeCho(2)"
            :style="{ color: typeCol.col2 ? typecol2 : typecol1 }"
          >
            最新
          </div>
          <div
            class="type_name cp"
            @click="typeCho(3)"
            :style="{ color: typeCol.col3 ? typecol2 : typecol1 }"
          >
            热榜
          </div>
          <!-- 热榜时间筛选 -->
          <div class="screen_time cp" v-show="screenDis">
            <div class="now_choose" ref="nowCho" @click="timeChoose">
              {{ nowTime }}<i></i>
            </div>
            <ul class="others" :style="{ display: open ? 'block' : 'none' }">
              <li
                class="other"
                v-for="(item, i) in time"
                :key="i"
                @click="timeCho(i)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <!-- 文章列表 -->
        <ul class="uist" ref="box" v-if="new_data.length">
          <li
            class="list cp"
            @click="skip(index)"
            v-for="(item, index) in new_data"
            :key="item.article_id"
            :style="{ zIndex: zCom(index) }"
          >
            <router-link
              :to="{ path: '/artDetail', query: { item: jsItem(item) } }"
            >
              <div class="container">
                <div
                  class="author cp"
                  @mouseenter="infoShow(index, item, $event)"
                >
                  {{ nameCom(item.nick_name) }}
                </div>
                <div class="time">{{ timeCom(item.updated_at) }}前</div>
                <div class="tag_name cp" v-if="item.tags.length">
                  <span class="tag" v-for="value in item.tags" :key="value.id">
                    {{ value.tag_name }}
                  </span>
                </div>
              </div>
              <div class="wrapper">
                <div class="wrap_left">
                  <div class="title" :ref="'list' + index">
                    {{ item.title ? item.title : "暂无标题" }}
                  </div>
                  <div class="preview">
                    {{
                      item.describe ? item.describe : "&nbsp;&nbsp;&nbsp;&nbsp;"
                    }}
                  </div>
                  <ul class="action">
                    <li class="action_list">
                      <span class="icon">&#xe6cc;</span>
                      <span>{{ item.pv ? item.pv : "浏览" }}</span>
                    </li>
                    <li class="action_list list1">
                      <span class="icon">&#xe627;</span>
                      <span>点赞</span>
                    </li>
                    <li class="action_list list1">
                      <span class="icon">&#xe612;</span>
                      <span>{{
                        item.comment_num ? item.comment_num : "评论"
                      }}</span>
                    </li>
                  </ul>
                </div>
                <div class="wrap_right" v-show="item.pic">
                  <img :src="icon(item.pic)" alt="" />
                </div>
              </div>
            </router-link>
            <Personal :class="'per' + index" :user="userinfo" />
          </li>
        </ul>
        <!-- 无资源时的样式 -->
        <div class="standby" v-else>暂无资源！</div>
      </div>
      <div class="right">
        <!-- 登录 -->
        <div class="logIn">
          <div class="title">掘金 - juejin.cn</div>
          <div class="desc">一个帮助开发者成长的社区</div>
          <input type="text" placeholder="请输入邮箱" />
          <input type="password" placeholder="请输入密码" />
          <el-button class="btn">立即登录</el-button>
          <div class="tip">
            注册登录即表示<br />同意<a href="#">用户协议</a> 、
            <a href="#">隐私政策</a>
          </div>
        </div>
        <!-- 广告 -->
        <div class="advertising1"></div>
        <div class="advertising2"></div>
        <!-- app二维码 -->
        <div class="app_link"></div>
        <!-- 作者排行榜 -->
        <div class="author_list"></div>
        <div class="link_block"></div>
        <!-- 版权信息 -->
        <div class="copy"></div>
      </div>
    </div>
    <!-- v-show 控制界面的显示 LoSNow 控制是登录、注册还是重置密码的UI logClose 关闭界面 -->
    <Pointwrite
      v-show="pwrite"
      v-on="{ close: close }"
      :pwrite="pwrite"
    ></Pointwrite>
    <RegLog v-show="log" :LoSNow="num" @logClose="logClose" @reglog="reglog" />
  </div>
</template>

<script>
import { articleList } from "@/api/article";
import { personInfo, concernList } from "@/api/user";
import Headnav from "@/components/Headnav.vue";
import HomeType from "@/components/HomeType.vue";
import RegLog from "@/components/RegLog.vue";
import Personal from "@/components/PersonInfo.vue";
import Pointwrite from "@/components/Pointwrite.vue";
export default {
  name: "Home",
  components: { HomeType, RegLog, Headnav, Personal, Pointwrite },
  data() {
    return {
      num: 1,
      pwrite: false,
      article_data: [],
      article_search: [],
      new_data: [],
      typeCol: { col1: true, col2: false, col3: false },
      typecol1: "#909090",
      typecol2: "#1d7dfa",
      tagList: [],
      tagList1: [
        "全部",
        "后端",
        "Java",
        "Go",
        "python",
        "MySQL",
        "Redis",
        "Spring Boot",
        "数据库",
        "Spring",
      ],
      tagList2: [
        "全部",
        "后端",
        "Java",
        "Go",
        "python",
        "MySQL",
        "Redis",
        "Spring Boot",
        "数据库",
        "Spring",
        "算法",
        "Kubernetes",
        "Linux",
        "JVM",
        "架构",
        "Spring Cloud",
      ],
      status: 1,
      open: false,
      time: ["3天内", "7天内", "30天内", "全部"],
      nowTime: "3天内",
      log: 0,
      userinfo: {},
      screenDis: false,
      caredata: [],
      // 初始请求页码
      page: 1,
      // 请求状态
      flag: false,
      // 导航写文章与发沸点的切换
      homewritedata: [
        {
          namea: "写文章",
          typea: "a",
          nameb: "发布沸点",
          typeb: "b",
        },
      ],
      now_type: "",
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

    // TODO 文章跳转事件
    skip(i) {
      let list = this.$refs[`list${i}`];
      list[0].style.color = "#86909c";
    },
    // TODO 热门分类转换事件
    typeCho(num) {
      num == 1
        ? (this.typeCol = { col1: true, col2: false, col3: false })
        : num == 2
        ? (this.typeCol = { col1: false, col2: true, col3: false })
        : (this.typeCol = { col1: false, col2: false, col3: true });
      if (num == 3) {
        this.screenDis = true;
      } else {
        this.screenDis = false;
      }
    },
    // TODO 滚动条监听函数 -- 懒加载
    getScroll() {
      let scrollY = document.documentElement.scrollTop;
      let scrollH = document.documentElement.scrollHeight;
      let clientH = document.documentElement.clientHeight;

      let scrollBottom = scrollH - scrollY - clientH;

      if (scrollBottom <= 200 && !this.flag) {
        this.flag = true;
        this.page++;
        // 调用文章列表api
        articleList({ page: this.page }).then((res) => {
          res.data.data.data.forEach((ele) => {
            this.article_data.push(ele);
            if (this.now_type != "推荐") {
              this.article_data.forEach((ele) => {
                ele.tags.forEach((e) => {
                  if (e.tag_name) {
                    if (e.tag_name.indexOf(this.now_type) != -1) {
                      this.article_search.push(ele);
                    }
                  }
                });
                this.new_data = this.article_search;
              });
              this.article_search = [];
            } else {
              this.new_data = this.article_data;
            }
          });
          this.flag = false;
        });
      }
    },
    // TODO 展示更多三级导航栏数据
    showTo() {
      this.status = 1;
      this.tagList = ["全部", ...this.tagList1];
    },
    // TODO 切换二级导航栏
    changeTo(item) {
      this.status = 0;
      this.tagList1 = item.item.child;
      this.now_type = item.type;
      if (this.tagList1) {
        this.tagList = ["全部", ...this.tagList1.slice(0, 10)];
      } else {
        this.tagList = this.tagList1;
      }
      //判断二级导航点的类型
      if (item.type == "推荐") {
        this.new_data = this.article_data;
      } else if (item.type == "关注") {
        let user = JSON.parse(localStorage.getItem("user"));
        concernList({ user_id: user.user_id }).then((res) => {
          // console.log(res.data.data.my_concern);
          res.data.data.my_concern.forEach((ele) => {
            articleList({ user_id: ele.user_id }).then((res) => {
              console.log(res.data.data.data);
              res.data.data.data.forEach((e) => {
                this.caredata.push(e);
              });
            });
          });
          this.new_data = this.caredata;
        });
        this.caredata = [];
      } else {
        this.article_data.forEach((ele) => {
          ele.tags.forEach((e) => {
            if (e.tag_name) {
              if (e.tag_name.indexOf(item.type) != -1) {
                this.article_search.push(ele);
              }
            }
          });
          this.new_data = this.article_search;
        });
      }
      this.article_search = [];
    },
    // 热榜时间选择
    timeChoose() {
      let now = this.$refs.nowCho;
      if (this.open) {
        now.children[0].style.transform = "translate(0,-50%) rotate(180deg)";
      } else {
        now.children[0].style.transform = "translate(0,-50%) rotate(0)";
      }
      this.open = !this.open;
    },
    timeCho(i) {
      this.nowTime = this.time[i];
      this.timeChoose();
    },
    // 触发登录事件
    logTo(num) {
      this.log = num;
    },
    logClose(num) {
      this.log = num;
    },
    // 个人信息展示
    infoShow(i, item, e) {
      personInfo({ user_id: item.user_id }).then((res) => {
        // console.log(res.data.data);
        this.userinfo = res.data.data;
        let per = document.querySelector(`.per${i}`);
        per.style.display = "block";
        per.style.left = e.target.offsetWidth / 2 - per.offsetWidth / 2 + "px";
      });
    },
    // 标签联动
    linkage(item) {
      console.log(item.i.child[item.idx]);
    },

    receive(file) {
      console.log(file);
    },

    // 登录注册跳转事件
    reglog(num) {
      num == 1 ? (this.num = 1) : (this.num = 2);
    },
  },
  mounted() {
    // 调用文章列表api
    articleList().then((res) => {
      this.article_data = res.data.data.data;
      this.new_data = this.article_data;
    });
    //监听滚动条的变化
    window.addEventListener("scroll", this.getScroll);
    // 渲染三级导航栏
    this.tagList = [];
  },
  computed: {
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
    // 用户名格式处理
    nameCom() {
      return (name) => {
        return name ? name : "不知名网友" + Math.floor(Math.random() * 100000);
      };
    },
    // 传输文章数据处理
    jsItem() {
      return (item) => {
        return JSON.stringify(item);
      };
    },
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
    zCom() {
      return (idx) => {
        return 999 - idx;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #f4f5f5;
}
.cp:hover {
  cursor: pointer;
}
a {
  text-decoration: none;
}
.frame {
  width: 100%;
  max-width: 960px;
  min-height: calc(100vh - 155px);
  margin: 10px auto 0;

  .left {
    width: 700px;
    background-color: #fff;
    float: left;

    .type {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(151, 151, 151, 0.1);
      font-size: 14px;
      padding: 12px 20px;

      .type_name {
        padding: 2px 15px;
        border-left: 1px solid rgba(150, 150, 150, 0.2);

        &:hover {
          color: #1d7dfa !important;
        }

        &:first-child {
          border: 0;
        }
      }

      .screen_time {
        font-size: 12px;
        color: #909097;
        position: relative;

        .now_choose {
          width: 42px;
          padding: 2px 30px 2px 10px;
          border: 1px solid #ebebeb;
          position: relative;

          &:hover {
            background-color: #fafafb;
          }

          i {
            width: 0;
            height: 0;
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translate(0, -50%) rotate(180deg);
            transition: all 0.3s;
            border-top: 5px solid #b2bac2;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
          }
        }
        .others {
          width: 100%;
          background-color: #fff;
          border: 1px solid #ebebeb;
          position: absolute;
          top: 23px;
          left: -1px;

          .other {
            box-sizing: border-box;
            padding: 9px 1px 9px 10px;

            &:hover {
              background-color: #fafafb;
            }
          }
        }
      }
    }

    .uist {
      width: 100%;

      .list {
        box-sizing: border-box;
        padding: 12px 20px;
        position: relative;

        &:hover {
          background-color: #fafafa;
        }

        .container {
          font-size: 13px;
          color: #4e5969;
          display: flex;
          line-height: 17px;

          div {
            border-left: 1px solid #e5e6eb;

            &:first-child {
              border: 0;
            }
          }

          .author {
            padding-right: 8px;

            &:hover {
              color: #1d7dfa;
            }
          }

          .time {
            padding: 0 8px;
            color: #86909c;
          }

          .tag_name {
            display: flex;

            .tag {
              position: relative;
              padding: 0 8px;

              &::after {
                content: "";
                display: table;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(0, -50%);
                width: 2px;
                height: 2px;
                background-color: #4e5969;
                border-radius: 50%;
              }
              &:last-child::after {
                display: none;
              }
              &:hover {
                color: #1d7dfa;
              }
            }
          }
        }

        .wrapper {
          width: 100%;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e6eb;
          padding-bottom: 12px;

          .wrap_left {
            flex-grow: 1;
            margin-top: 10px;
            overflow: hidden;

            .title {
              color: #1d2129;
              font-weight: 700;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-break: break-all;
              margin-bottom: 8px;
            }

            .preview {
              width: 516px;
              color: #86909c;
              font-size: 13px;
              white-space: nowrap;
              word-break: break-all;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 10px;
            }

            .action {
              display: flex;
              align-items: center;

              .action_list {
                font-size: 13px;
                margin-right: 20px;
                color: #4e5969;
                display: flex;
                align-items: center;

                &:last-child {
                  .icon {
                    margin: 0;
                    font-size: 22px;
                  }
                }

                .icon {
                  font-size: 18px;
                  margin-right: 4px;
                }
              }
              .list1:hover {
                color: #1d7dfa !important;
              }
            }
          }

          .wrap_right {
            margin-top: 10px;
            padding-left: 24px;
            img {
              width: 120px;
              height: 80px;
            }
          }
        }
      }
    }

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
    width: 240px;
    font-size: 15px;
    float: right;

    .logIn {
      width: 100%;
      box-sizing: border-box;
      padding: 16px;
      background-color: #fff;
      box-shadow: 1px 1px 3px rgb(211, 211, 211);

      .title {
        font-weight: 600;
        margin-bottom: 6px;
      }

      .desc {
        margin-bottom: 7px;
      }

      input {
        box-sizing: border-box;
        width: 100%;
        padding: 8px 7px;
        background-color: #fbfbfb;
        border: 1px solid #f4f4f4;
        border-radius: 2px;
        margin-bottom: 10px;

        &:focus {
          border: 1px solid #d9d9d9;
        }
      }
      .btn {
        width: 100%;
        background-color: #007fff;
        color: #fff;
        padding: 10px 0;

        &:hover {
          background-color: #0371df;
        }
      }
      .tip {
        margin-top: 20px;
        font-size: 14px;
        color: #767676;

        a {
          color: #007fff;
          text-decoration: none;
        }
      }
    }
  }

  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
.icon {
  font-family: "iconfont";
}
</style>
