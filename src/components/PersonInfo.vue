<!--
 * @author: DoubleW
 * @create: 2021-06-26 09:12 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-05 17:17 PM
 * @desc: 鼠标悬浮网名、头像时触发的个人信息组件
-->
<template>
  <div class="frame1" ref="frame" @mouseleave="infoHide">
    <div class="top">
      <img
        :src="icon(dataNow.icon) ? icon(dataNow.icon) : $store.state.avatar"
        alt=""
      />
      <div class="info">
        <div class="name">
          {{ dataNow.nick_name ? dataNow.nick_name : "不知名网友"
          }}<span class="level">Lv6</span>
        </div>
        <div class="type">前端</div>
      </div>
    </div>
    <div class="bottom">
      <div class="about">
        <div class="atten atten_to">
          <div class="num">{{ dataNow.concern }}</div>
          <div class="cont">关注</div>
        </div>
        <div class="atten atten_from">
          <div class="num">{{ dataNow.fans }}</div>
          <div class="cont">关注者</div>
        </div>
      </div>
      <div class="attention" @click="attenTo(dataNow.user_id)">
        {{ dataNow.be_concern ? "已关注" : "关注" }}
      </div>
    </div>
  </div>
</template>

<script>
// import { concern, concernDel, concernList } from "@/api/user";
import { concern, concernDel } from "@/api/user";
export default {
  name: "personal",
  props: { user: { type: Object } },
  data() {
    return {
      // 关注列表数据
      concern: {},
      // 当前用户数据
      dataNow: {},
    };
  },
  watch: {
    user: {
      handler(newer) {
        console.log(newer);
        this.dataNow = newer;
      },
      deep: true,
    },
  },
  methods: {
    infoHide() {
      let frame = this.$refs.frame;
      frame.style.display = "none";
    },
    // TODO 关于与取消关注
    attenTo(id) {
      let token = JSON.parse(localStorage.getItem("user")).token;
      if (this.dataNow.be_concern) {
        // 取消关注
        concernDel({ token, be_concern_user_id: id }).then((res) => {
          if (res.data.code == 2000) {
            this.$message({ type: "success", message: res.data.msg });
          }

          this.$forceUpdate();
        });
      } else {
        // 关注
        concern({ token, be_concern_user_id: id }).then((res) => {
          if (res.data.code == 2000) {
            this.$message({ type: "success", message: res.data.msg });
          } else if (res.data.code == 2010) {
            this.$message({ type: "warning", message: res.data.msg });
          }

          this.$forceUpdate();
        });
      }
      this.$emit("reconcern", this.dataNow);
    },
  },
  computed: {
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
.frame1 {
  display: none;
  width: 230px;
  background-color: #fff;
  box-shadow: 0 0 2px #ccc;
  border: 1px solid #ebebeb;
  position: absolute;
  z-index: 10;
  top: 35px;
  left: -93px;
  cursor: default;
  padding: 16px 22px 21px;

  &::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ebebeb;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .top {
    display: flex;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    .info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 4px 0;
      box-sizing: border-box;

      .name {
        font-size: 15px;
        color: #333;
        width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span {
          background-color: red;
          padding: 1px 3px;
          font-size: 10px;
          font-weight: bolder;
          margin-left: 10px;
          color: #fff;
        }
      }

      .type {
        color: #8f969c;
        font-size: 13px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 18px;

    .about {
      display: flex;

      .atten {
        width: 60px;
      }

      .num {
        font-size: 15px;
        color: #17181a;
        font-weight: 600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .cont {
        color: #8f969c;
        font-size: 13px;
        margin-top: 7px;
      }
    }
    .attention {
      width: 70px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #37c701;
      border-radius: 2px;
      color: #37c701;
      font-size: 15px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>