<!--
 * @author: LUOCAN
 * @create: 2021-06-25 13:55 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-01 09:12 AM
 * @desc: 
-->

<template>
  <div class="set">
    <Headnav
      :subNavDis="false"
      :homewritedata="homewritedata"
      @writeTo="writeTo"
      :col="{ col1: '#86909c', col2: '#86909c' }"
    ></Headnav>
    <div class="content">
      <!-- 返回个人中心 -->
      <div class="head">
        <router-link to="/">
          <a>
            <svg
              t="1624600456227"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2387"
              width="30"
              height="30"
            >
              <path
                d="M576 705.6a32 32 0 0 1-22.72-9.28l-160-160a32 32 0 0 1 0-45.12l160-160a32 32 0 1 1 45.12 45.12l-137.28 137.28 137.28 137.28a32 32 0 0 1-22.4 54.72z"
                p-id="2388"
                fill="#909090"
              ></path>
            </svg>
            <span>返回个人中心</span>
          </a>
        </router-link>
      </div>
      <div class="center">
        <div class="left">
          <div class="nav-item active" @click="showuser('svg1', $event)">
            <svg
              ref="svg1"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#4e5969"
              xmlns="http://www.w3.org/2000/svg"
              class="svg1"
              data-v-490fd819=""
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.3331 14.1052V14.3207C15.3331 14.5048 15.1839 14.654 14.9998 14.654H14.3204C14.1413 14.654 13.9967 14.5122 13.9801 14.3339C13.9778 14.3097 13.9754 14.2872 13.9728 14.2679C13.8008 12.9838 12.8312 12 11.7742 12H9.88471C8.82066 12 7.8512 12.997 7.68991 14.2937C7.68842 14.3056 7.68699 14.3189 7.68563 14.333C7.66842 14.5116 7.52439 14.654 7.34498 14.654H6.66643C6.48233 14.654 6.33309 14.5048 6.33309 14.3207V14.1052C6.33309 12.5335 7.41668 11.2082 8.82833 10.7979C8.3268 10.2875 8.01744 9.58768 8.01744 8.81561C8.01744 7.25359 9.2837 5.98733 10.8457 5.98733C12.4077 5.98733 13.674 7.25359 13.674 8.81561C13.674 9.59004 13.3627 10.2918 12.8585 10.8025C14.2611 11.2181 15.3331 12.5395 15.3331 14.1052ZM1.99984 2.66665V12.6666H4.9165V14H1.33317C0.964981 14 0.666504 13.7015 0.666504 13.3333V1.99998C0.666504 1.63179 0.964981 1.33331 1.33317 1.33331H13.3332C13.7014 1.33331 13.9998 1.63179 13.9998 1.99998V5.82955C13.5945 5.49574 13.1466 5.21989 12.6665 5.01331V2.66665H1.99984ZM3.33309 5.99994C3.33309 5.81584 3.48233 5.66661 3.66642 5.66661H6.66642C6.85052 5.66661 6.99976 5.81584 6.99976 5.99994V6.6666C6.99976 6.8507 6.85052 6.99994 6.66642 6.99994H3.66642C3.48233 6.99994 3.33309 6.8507 3.33309 6.66661V5.99994ZM3.33309 8.66661C3.33309 8.48251 3.48233 8.33327 3.66642 8.33327H4.99976C5.18385 8.33327 5.33309 8.48251 5.33309 8.66661V9.33327C5.33309 9.51737 5.18385 9.66661 4.99976 9.66661H3.66642C3.48233 9.66661 3.33309 9.51737 3.33309 9.33327V8.66661ZM10.8457 7.32066C10.0201 7.32066 9.35075 7.98997 9.35075 8.81561C9.35075 9.64125 10.0201 10.3106 10.8457 10.3106C11.6713 10.3106 12.3406 9.64125 12.3406 8.81561C12.3406 7.98997 11.6713 7.32066 10.8457 7.32066Z"
                class="close-path"
                data-v-490fd819=""
              ></path>
            </svg>
            个人资料
          </div>
          <div class="nav-item" @click="showset('svg2', $event)">
            <svg
              ref="svg2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#4e5969"
              xmlns="http://www.w3.org/2000/svg"
              class="svg1"
              data-v-490fd819=""
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.58901 0.903176C9.07116 0.786587 8.53915 0.727234 7.99989 0.727234C7.46051 0.727234 6.92838 0.786615 6.41041 0.903258L6.11154 0.970562L5.17999 3.09499L2.88551 2.84416L2.67809 3.07008C1.95184 3.86112 1.40698 4.80463 1.08759 5.83506L0.997559 6.12553L2.36299 7.99996L1.17661 9.62859L0.997559 9.87439L1.08759 10.1649C1.40698 11.1953 1.95184 12.1388 2.67809 12.9298L2.88551 13.1558L5.17999 12.9049L5.98852 14.7488L6.11154 15.0294L6.41041 15.0967C6.92838 15.2133 7.46051 15.2727 7.99989 15.2727C8.53915 15.2727 9.07116 15.2133 9.58901 15.0967L9.88786 15.0295L10.8198 12.9049L13.1143 13.1558L13.3217 12.9298C14.0479 12.1389 14.5927 11.1955 14.9121 10.1652L15.0021 9.87479L13.6368 7.99996L14.8231 6.37093L15.0021 6.12513L14.9121 5.83469C14.5927 4.80441 14.0479 3.86103 13.3217 3.07008L13.1143 2.84416L10.8198 3.095L9.88786 0.970458L9.58901 0.903176ZM6.97185 2.02705C7.30885 1.96884 7.65237 1.93931 7.99995 1.93931C8.34745 1.93931 8.69087 1.96882 9.02778 2.027L9.7747 3.72978C9.94877 4.1266 10.3602 4.36453 10.791 4.31745L12.6271 4.11672C13.0706 4.65049 13.4202 5.257 13.6589 5.91059L12.5627 7.41589C12.3092 7.76397 12.3092 8.23586 12.5627 8.58396L13.6589 10.0892C13.4202 10.7428 13.0706 11.3493 12.6271 11.8831L10.791 11.6824C10.3602 11.6353 9.94877 11.8732 9.7747 12.27L9.02778 13.9728C8.69087 14.031 8.34745 14.0605 7.99995 14.0605C7.65237 14.0605 7.30885 14.031 6.97185 13.9728L6.22524 12.2701C6.05114 11.8732 5.63967 11.6353 5.20892 11.6824L3.3728 11.8831C2.92928 11.3493 2.5796 10.7427 2.3409 10.089L3.43719 8.58401C3.69075 8.23586 3.69075 7.76397 3.43723 7.41588L2.3409 5.91086C2.5796 5.25717 2.92928 4.65056 3.3728 4.11672L5.20891 4.31745C5.63967 4.36453 6.05114 4.1266 6.2252 3.72979L6.97185 2.02705ZM7.99996 4.96962C9.66782 4.96962 11.0187 6.32698 11.0187 7.99993C11.0187 9.67287 9.66782 11.0302 7.99996 11.0302C6.3321 11.0302 4.9812 9.67287 4.9812 7.99993C4.9812 6.32698 6.3321 4.96962 7.99996 4.96962ZM6.19336 7.99992C6.19336 6.99512 7.00287 6.18174 8 6.18174C8.99713 6.18174 9.80663 6.99512 9.80663 7.99992C9.80663 9.00472 8.99713 9.81811 8 9.81811C7.00287 9.81811 6.19336 9.00472 6.19336 7.99992Z"
                class="close-path"
                data-v-490fd819=""
              ></path>
            </svg>
            账号设置
          </div>
          <div class="nav-item" @click="active('svg3', $event)">
            <svg
              ref="svg3"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#4e5969"
              xmlns="http://www.w3.org/2000/svg"
              class="svg1"
              data-v-490fd819=""
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.3333 1.33331C13.6848 1.33331 13.9727 1.60527 13.9982 1.95023L14 1.99998V14.3333C14 14.6848 13.728 14.9727 13.3831 14.9982L13.3333 15H2.66667C2.31521 15 2.02728 14.728 2.00183 14.3831L2 14.3333V1.99998C2 1.64853 2.27196 1.36059 2.61691 1.33514L2.66667 1.33331H13.3333ZM12.6667 2.66661H8.99967L9 6.30956C9 6.67775 8.70152 6.97622 8.33333 6.97622C8.24048 6.97622 8.14865 6.95683 8.06373 6.91928L6.66667 6.30153L5.2696 6.91928C4.93286 7.06817 4.53918 6.9159 4.39028 6.57916C4.35273 6.49424 4.33333 6.40241 4.33333 6.30956L4.333 2.66661H3.33333V13.6666H12.6667V2.66661ZM11.3333 10.9999C11.5174 10.9999 11.6667 11.1492 11.6667 11.3333V11.8333C11.6667 12.0174 11.5174 12.1666 11.3333 12.1666H4.66667C4.48257 12.1666 4.33333 12.0174 4.33333 11.8333V11.3333C4.33333 11.1492 4.48257 10.9999 4.66667 10.9999H11.3333ZM11.3333 8.66661C11.5174 8.66661 11.6667 8.81584 11.6667 8.99994V9.49994C11.6667 9.68403 11.5174 9.83327 11.3333 9.83327H4.66667C4.48257 9.83327 4.33333 9.68403 4.33333 9.49994V8.99994C4.33333 8.81584 4.48257 8.66661 4.66667 8.66661H11.3333ZM7.66634 2.66661H5.66634L5.66667 5.28584L6.66667 4.84366L7.66667 5.28584L7.66634 2.66661Z"
                class="close-path"
                data-v-490fd819=""
              ></path>
            </svg>
            简历管理
          </div>
        </div>
        <div class="right">
          <div class="right-user" v-show="rightuser">
            <div class="nav-text">个人资料</div>
            <div class="right-botton">
              <div class="byte-form">
                <div class="byte-form-item">
                  <div class="byte-form-name">用户名</div>
                  <div class="byte-form-input">
                    <input
                      id="username"
                      type="text"
                      placeholder="填写你的用户名"
                      maxlength="20"
                      v-model="username"
                      @focus="clicktext($event)"
                      @blur="buclick($event)"
                    />
                    <span>{{ username.length }}/20</span>
                  </div>
                </div>
                <div class="byte-form-item">
                  <div class="byte-form-name">性别</div>
                  <div class="byte-form-input">
                    <!-- <input
                      type="text"
                      placeholder="填写你的职位"
                      maxlength="50"
                      v-model="work"
                      @focus="clicktext($event)"
                      @blur="buclick($event)"
                    />
                    <span>{{ work.length }}/50</span> -->
                    <div class="radio">
                      <div class="ra">
                        <input
                          type="radio"
                          name="radio"
                          class="radioa"
                          checked
                          ref="men"
                          @click="radio('men')"
                        />男
                      </div>
                      <div class="ra">
                        <input
                          type="radio"
                          name="radio"
                          class="radioa"
                          ref="women"
                          @click="radio('women')"
                        />女
                      </div>
                      <div class="ra">
                        <input
                          type="radio"
                          name="radio"
                          class="radioa"
                          ref="secrecy"
                          @click="radio('secrecy')"
                        />保密
                      </div>
                    </div>
                  </div>
                </div>
                <div class="byte-form-item">
                  <div class="byte-form-name">qq</div>
                  <div class="byte-form-input">
                    <input
                      type="text"
                      placeholder="填写你的qq"
                      maxlength="20"
                      v-model="company"
                      @focus="clicktext($event)"
                      @blur="buclick($event)"
                    />
                    <span>{{ company.length }}/20</span>
                  </div>
                </div>
                <div class="byte-form-item">
                  <div class="byte-form-name">手机</div>
                  <div class="byte-form-input">
                    <input
                      type="text"
                      placeholder="填写你的手机号"
                      maxlength="11"
                      v-model="homepage"
                      @focus="clicktext($event)"
                      @blur="buclick($event)"
                    />
                    <span>{{ homepage.length }}/11</span>
                  </div>
                </div>
                <div class="avatar-input">
                  <div class="byte-form-name">兴趣爱好</div>
                  <textarea
                    name=""
                    id=""
                    cols="47"
                    rows="10"
                    style="resize: none"
                    v-model="introduce"
                    @focus="clicktext($event)"
                    @blur="buclick($event)"
                    placeholder="填写职业技能、擅长的事情、喜欢的事情等"
                  ></textarea>
                  <span>{{ introduce.length }}/100</span>
                </div>
                <button class="sumit" @click="sumit">保存修改</button>
              </div>
              <div class="info">
                <div class="userimg">
                  <img
                    :src="userimgs ? userimgs : $store.state.avatar"
                    alt=""
                  />
                  <el-upload
                    name="img"
                    action="http://api_devss.wanxikeji.cn/api/savePic"
                    list-type="picture"
                    :on-success="handleAvatarSuccess"
                    class="picture-card"
                  >
                    <div class="cont">
                      <i class="el-icon-plus"></i>
                      <span>点击修改头像</span>
                    </div>
                  </el-upload>
                </div>
                <div class="tip">
                  <div class="title">我的头像</div>
                  <div class="description">
                    支持 jpg、png、jpeg 格式大小 5M 以内的图片
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right-set" v-show="rightset">
            <div class="set-view">账号设置</div>
            <div class="set-list">
              <div class="set-item">
                <div class="set-title">手机</div>
                <div class="set-account">11111</div>
                <div class="set-link">换绑</div>
              </div>
              <div class="set-item">
                <div class="set-title">微信</div>
                <div class="set-account">11111</div>
                <div class="set-link">绑定</div>
              </div>
              <div class="set-item">
                <div class="set-title">新浪微博</div>
                <div class="set-account">11111</div>
                <div class="set-link">绑定</div>
              </div>
              <div class="set-item">
                <div class="set-title">Github</div>
                <div class="set-account">11111</div>
                <div class="set-link">绑定</div>
              </div>
              <div class="set-item">
                <div class="set-title">密码</div>
                <div class="set-account">11111</div>
                <div class="set-link" @click="logTo(1)">重置</div>
              </div>
              <div class="set-item">
                <div class="set-title">账号注销</div>
                <div class="set-account">11111</div>
                <div class="set-link">注销</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pointwrite
      v-show="pwrite"
      v-on="{ close: close }"
      :pwrite="pwrite"
    ></Pointwrite>
    <RegLog v-show="log" :LoSNow="3" @logClose="logClose" />
  </div>
</template>

<script>
import { userModify } from "@/api/user";
import RegLog from "@/components/RegLog.vue";
import Headnav from "@/components/Headnav.vue";
import Pointwrite from "@/components/Pointwrite.vue";
export default {
  name: "Set",
  components: {
    RegLog,
    Headnav,
    Pointwrite,
  },
  data() {
    return {
      a: true,
      rightuser: true,
      rightset: false,
      username: "",
      radionum: "1",
      company: "",
      homepage: "",
      introduce: "",
      userimgs: "",
      log: 0,
      homewritedata: [
        {
          namea: "写文章",
          typea: "a",
          nameb: "发布沸点",
          typeb: "b",
        },
      ],
      pwrite: false,
    };
  },
  methods: {
    active(s, e) {
      let sg = document.querySelectorAll(".svg1");
      let ni = document.querySelectorAll(".nav-item");
      sg.forEach((ele) => {
        ele.setAttribute("fill", "#4e5969");
      });
      ni.forEach((ele) => {
        ele.classList.add("normal");
        ele.classList.remove("active");
      });
      e.target.classList.remove("normal");
      e.target.classList.add("active");
      this.$refs[s].setAttribute("fill", "#1d7dfa");
    },
    // 页面切换
    showuser(s, e) {
      this.rightuser = true;
      this.rightset = false;
      this.active(s, e);
    },
    showset(s, e) {
      this.rightuser = false;
      this.rightset = true;
      this.active(s, e);
    },
    // 输入框聚焦事件
    clicktext(e) {
      e.target.style.cssText =
        " border: 1px solid #1d7dfa; background-color:#FFF";
    },
    // 失焦事件
    buclick(e) {
      if (e.target.value == "" && e.target.id == "username") {
        this.$message({
          message: "用户名不能为空",
          type: "error",
        });
      }
      e.target.style.cssText =
        " background-color: #fafafa;  border: 1px solid #ddd;";
    },

    // 性别判断
    radio(r) {
      if (r == "men") {
        this.radionum = 1;
      } else if (r == "women") {
        this.radionum = 2;
      } else {
        this.radionum = 3;
      }
    },

    // 图片上传
    handleAvatarSuccess(file) {
      console.log(file);
      this.userimgs = "http://api_devss.wanxikeji.cn/" + file.data;
      console.log(this.userimgs);
    },
    //个人信息修改提交
    sumit() {
      let token = JSON.parse(localStorage.getItem("user"));
      if (this.username == "") {
        this.$message({
          message: "用户名不能为空",
          type: "error",
        });
      } else {
        //修改个人信息
        userModify({
          token: token.token,
          nick_name: this.username,
          sex: this.radionum,
          insert: this.introduce,
          qq: this.company,
          icon: this.userimgs,
          phone: this.homepage,
        }).then((res) => {
          console.log(res);
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        });
      }
    },

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
  },
  mounted() {
    if (localStorage.getItem("user")) {
      let i = JSON.parse(localStorage.getItem("user"));
      this.userimgs = i.img;
    }
  },
};
</script>

<style lang="scss" scoped>
.set {
  width: 100%;
  height: 100vh;
  background-color: #f4f5f5;
  &::before {
    content: "";
    display: table;
  }
  .content {
    width: 1200px;
    margin: auto;
    margin-top: 30px;
    .head {
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
      padding: 5px 10px;
      font-size: 14px;
      color: #909090;
      background-color: #fff;
      a {
        width: 115px;
        display: flex;
        align-items: center;
        text-align: left;
        cursor: pointer;
        text-decoration: none;
        color: #909090;
      }
    }

    .center {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      .left {
        box-sizing: border-box;
        background: #fff;
        width: 230px;
        height: 626px;
        padding: 8px;
        .active {
          background-color: #e8f3ff;
          color: #1d7dfa !important;
        }
        .normal {
          color: #4e5969;
          background-color: #fff;
        }
        .nav-item {
          display: flex;
          align-items: center;
          font-weight: 400;
          height: 48px;
          width: 214px;
          font-size: 16px;
          color: #4e5969;
          svg {
            margin-left: 24px;
            margin-right: 12px;
          }
          &:hover {
            background: #e8f3ff;
            color: #1d7dfa;
            cursor: pointer;
            svg {
              fill: #1d7dfa !important;
            }
          }
        }
      }
      .right {
        padding: 20px;
        width: 906px;
        height: 586px;
        background-color: #fff;
        .right-user {
          .nav-text {
            font-weight: 600;
            font-size: 20px;
            color: #333;
            margin-bottom: 20px;
          }
          .right-botton {
            display: flex;
            .byte-form {
              width: 500px;
              .byte-form-item {
                display: flex;
                height: 32px;
                align-items: center;
                width: 100%;
                border-top: 1px solid #eaeaea;
                padding: 13px;
                .byte-form-name {
                  width: 56px;
                  margin-left: 20px;
                  margin-right: 30px;
                  font-weight: 500;
                  font-size: 14px;
                  color: #333;
                }
                .byte-form-input {
                  position: relative;
                  .radio {
                    padding: 0 5px;
                    font-size: 14px;
                    width: 360px;
                    background-color: #fafafa;
                    border: 1px solid #ddd;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .ra {
                      display: flex;
                      align-items: center;
                      .radioa {
                        width: 15px;
                        color: #1d7dfa;
                      }
                    }
                  }
                  input {
                    width: 300px;
                    height: 32px;
                    padding: 0 48px 0 20px;
                    background-color: #fafafa;
                    outline: none;
                    border: 1px solid #ddd;
                    font-size: 14px;
                    &:hover {
                      background: #e5e6eb;
                      border-color: #e5e6eb;
                    }
                  }
                  span {
                    font-size: 12px;
                    color: #86909c;
                    position: absolute;
                    right: 10px;
                    top: 10px;
                  }
                }
              }
              .avatar-input {
                border-top: 1px solid #eaeaea;
                border-bottom: 1px solid #eaeaea;
                padding: 13px;
                display: flex;
                position: relative;

                .byte-form-name {
                  width: 56px;
                  margin-left: 20px;
                  margin-right: 30px;
                  font-weight: 500;
                  font-size: 14px;
                  color: #333;
                }
                textarea {
                  background-color: #fafafa;
                  outline: none;
                  border: 1px solid #ddd;
                  font-size: 14px;
                  padding: 6px 10px;
                  &:hover {
                    background: #e5e6eb;
                    border-color: #e5e6eb;
                  }
                }
                span {
                  position: absolute;
                  bottom: 20px;
                  right: 20px;
                  font-size: 12px;
                  color: #86909c;
                }
              }
              .sumit {
                margin-top: 24px;
                margin-left: 120px;
                padding: 7px 20px;
                background-color: #1d7dfa;
                font-size: 14px;
                color: #fff;
                border: none;
                white-space: nowrap;
                cursor: pointer;
                &:hover {
                  background-color: #388eff;
                }
              }
            }
            .info {
              width: 112px;
              margin-left: 74px;

              .userimg {
                display: flex;
                justify-content: center;
                position: relative;
                .picture-card {
                  width: 95px;
                  height: 95px;
                  position: absolute;
                  top: 0;
                  left: 10px;
                  color: #fff;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  border-radius: 50%;
                  background-color: rgba(29, 33, 41, 0.5);
                  opacity: 0;
                  &:hover {
                    opacity: 1;
                  }
                  .cont {
                    width: 95px;
                    height: 95px;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    span {
                      font-size: 12px;
                      margin-top: 7px;
                      line-height: 17px;
                      font-weight: 400;
                    }
                  }
                }
                img {
                  width: 95px;
                  height: 95px;
                  border-radius: 50%;
                }
              }
              .tip {
                .title {
                  text-align: center;
                  color: #1d2129;
                  font-weight: 500;
                  font-size: 14px;
                  margin-top: 10px;
                  margin-bottom: 8px;
                }
                .description {
                  color: #86909c;
                  font-size: 12px;
                  line-height: 17px;
                  font-weight: 400;
                }
              }
            }
          }
        }
        .right-set {
          .set-view {
            padding-bottom: 16px;
            font-size: 24px;
            font-weight: 700;
            border-bottom: 1px solid #f1f1f1;
          }
          .set-list {
            font-size: 14px;
            .set-item {
              display: flex;
              padding: 24px 0;
              border-bottom: 1px solid #f1f1f1;
              .set-title {
                width: 106px;
                color: #333;
              }
              .set-account {
                flex-grow: 1;
                color: #909090;
              }
              .set-link {
                color: #007fff;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>