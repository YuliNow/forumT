<!--
 * @author: DoubleW
 * @create: 2021-06-21 14:40 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-05 14:56 PM
 * @desc: 登录注册页
-->
<template>
  <div class="login" :style="{ height }">
    <form action="">
      <div class="logoArr">
        <img
          src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/ad7fa76844a2df5c03151ead0ce65ea6.svg"
          alt=""
          v-show="imgDid.one"
          class="logofish"
        />
        <img
          src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/500c1180a96859e5c54a5359f024a397.svg"
          alt=""
          v-show="imgDid.two"
          class="logofish"
        />
        <img
          src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/4f6f6f316cde4398d201cd67e44ddea3.svg"
          alt=""
          v-show="imgDid.three"
          class="logofish"
        />
      </div>
      <div class="logIn" v-if="LoS == 1">
        <div class="top">
          <div class="left">账密登录</div>
          <img
            src="../assets/close.svg"
            class="right"
            @click="$emit('logClose', 0)"
            alt=""
          />
        </div>
        <div class="middle">
          <input
            type="text"
            class="account"
            placeholder="邮箱/手机号（国际号码加区号）"
            v-model="account"
            @focus="conFocus(2)"
            @blur="conBlur"
          />
          <input
            type="password"
            class="pwd"
            placeholder="请输入密码"
            v-model="pwd"
            @focus="conFocus(3)"
            @blur="conBlur"
          />
          <el-button class="cp" @click.prevent="login">登录</el-button>
          <div class="regis">
            <div class="left cp" @click="goRegis">立即注册</div>
            <div class="right cp">忘记密码</div>
          </div>
        </div>
        <div class="bottom">
          <div class="oauth">
            <div class="oauth-bg">
              <img
                src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/fa758ebd6691cf5931bbbed63230327b.svg"
                alt=""
              />
            </div>
            <div class="oauth-bg">
              <img
                src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/e0ff12435b30910520c9a3aac9b90487.svg"
                alt=""
              />
            </div>
            <div class="oauth-bg">
              <img
                src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/547dd8a9450cd7be39ff97c40a23e794.svg"
                alt=""
              />
            </div>
          </div>
          <div class="text">
            注册登录即表示同意 <a href="#">用户协议</a> 、
            <a href="#">隐私政策</a>
          </div>
        </div>
      </div>
      <div class="signUp" v-else-if="LoS == 2">
        <div class="top">
          <div class="left">正在注册</div>
          <img
            src="../assets/close.svg"
            class="right"
            @click="$emit('logClose', 0)"
            alt=""
          />
        </div>
        <div class="middle">
          <input
            type="text"
            class="account"
            placeholder="请输入邮箱"
            v-model="account"
            @focus="conFocus(2)"
            @blur="conBlur"
          />
          <input
            type="text"
            class="account"
            placeholder="请输入昵称(可选)"
            v-model="nick"
            @focus="conFocus(2)"
            @blur="conBlur"
          />
          <input
            type="password"
            class="pwd"
            placeholder="请输入密码"
            v-model="pwd"
            @focus="conFocus(3)"
            @blur="conBlur"
          />
          <input
            type="password"
            class="pwd"
            placeholder="请再次确认密码"
            v-model="confPwd"
            @focus="conFocus(3)"
            @blur="conBlur"
          />
          <el-button class="cp" @click.prevent="signUp">注册</el-button>
          <div class="regis">
            <div class="left" style="color: #767676">
              已有账号？<span class="cp" style="color: #007fff" @click="goLogin"
                >去登录</span
              >
            </div>
            <div class="right cp">&nbsp;&nbsp;</div>
          </div>
        </div>
        <div class="bottom">
          <div class="text">
            注册登录即表示同意 <a href="#">用户协议</a> 、
            <a href="#">隐私政策</a>
          </div>
        </div>
      </div>
      <div class="resetPwd" v-else>
        <div class="top">
          <div class="left">重置密码</div>
          <img
            src="../assets/close.svg"
            class="right"
            @click="$emit('logClose', 0)"
            alt=""
          />
        </div>
        <div class="middle">
          <input
            type="text"
            class="phone"
            placeholder="请输入账号"
            v-model="phone"
            @focus="conFocus(2)"
            @blur="conBlur"
          />
          <input
            type="password"
            class="code"
            placeholder="请输入旧密码"
            v-model="oldPwd"
            @focus="conFocus(3)"
            @blur="conBlur"
          />
          <input
            type="password"
            class="newPwd"
            placeholder="请输入新密码"
            v-model="newPwd"
            @focus="conFocus(3)"
            @blur="conBlur"
          />
          <el-button class="cp" @click.prevent="resetTo">修改</el-button>
          <span class="emailTo cp">邮箱重置密码</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { login as loginIn, register, rePwd } from "@/api/user";
export default {
  name: "regLog",
  props: { LoSNow: Number },
  watch: {
    LoSNow: {
      handler(newer) {
        this.LoS = newer;
      },
    },
  },
  updated() {
    this.LoS = this.LoSNow;
  },
  data() {
    return {
      height: "",
      imgDid: { one: true, two: false, three: false },
      status: true,
      account: "",
      nick: "",
      pwd: "",
      confPwd: "",
      phone: "",
      oldPwd: "",
      newPwd: "",
      LoS: 1,
      b: "block",
      n: "none",
    };
  },
  methods: {
    // TODO fish logo样式的改变
    conFocus(num) {
      if (num == 2) {
        this.imgDid = { one: false, two: true, three: false };
      } else {
        this.imgDid = { one: false, two: false, three: true };
      }
      this.$forceUpdate();
    },
    conBlur() {
      if (this.imgDid.two || this.imgDid.three) {
        this.imgDid = { one: true, two: false, three: false };
      }
      this.$forceUpdate();
    },
    // TODO 登录 与 注册 与 重置密码
    login() {
      this.status = true;
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
      let regP = /.*[a-zA-Z]+.*/;

      // 判断不同状态的内容进行不同装填输出
      if (!reg.test(this.account)) {
        this.status = false;
      } else if (!regP.test(this.pwd)) {
        this.status = false;
      }
      if (this.status) {
        // 调用登录接口
        loginIn({ name: this.account, pw: this.pwd }).then((res) => {
          console.log(res.data);
          let data = res.data.data;
          // 返回状态码判断
          if (res.data.code == 2010) {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          } else {
            this.$message({
              message: "登录成功！",
              type: "success",
            });

            // 存储用户信息
            let userInfo = data;
            // 信息存储 vuex+缓存存储
            localStorage.setItem("user", JSON.stringify(userInfo));
            this.$emit("logClose", 0);
            // 刷新页面
            this.$router.go(0);
          }
        });
      }
    },
    signUp() {
      this.status = true;
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
      let regP = /.*[a-zA-Z]+.*/;

      // 判断不同状态的内容进行不同装填输出
      if (!reg.test(this.account)) {
        this.status = false;
      } else if (!regP.test(this.pwd)) {
        this.status = false;
        this.$message({
          message: "请输入字母+数字组合的密码",
          type: "warning",
        });
      } else if (this.pwd !== this.confPwd) {
        this.status = false;
        this.$message({ message: "密码不一致！", type: "warning" });
      }
      if (this.status) {
        if (!this.nick) {
          this.nick = "不知名网友" + Math.floor(Math.random() * 100000);
        }
        // 调用注册接口
        register({
          name: this.account,
          pw: this.pwd,
          nick_name: this.nick,
        }).then((res) => {
          // 状态返回码处理
          if (res.data.code == 2010) {
            this.$message({ message: res.data.msg, type: "warning" });
          } else {
            this.$message({ message: res.data.msg, type: "success" });
            this.LoS = 1;
          }
        });
      }
    },
    resetTo() {
      let token = JSON.parse(localStorage.getItem("user")).token;
      let pwd = JSON.parse(localStorage.getItem("user")).pw;

      if (this.newPwd && token) {
        // 修改密码 api
        rePwd({ token, pw: this.newPwd, old: pwd }).then((res) => {
          if (res.data.code == 2000) {
            this.$message({ type: "success", message: res.data.msg });

            setTimeout(() => {
              localStorage.setItem("user", "");
              this.$router.push("/");
            }, 2000);
          } else {
            this.$message(res.data.msg);
          }
        });
      }
    },

    // TODO 跳转登录 与 注册 ui
    goLogin() {
      this.$emit("reglog", 1);
      this.clear();
    },
    goRegis() {
      this.$emit("reglog", 2);
      this.clear();
    },
    // 清除数据
    clear() {
      this.account = "";
      this.pwd = "";
      this.confPwd = "";
      this.phone = "";
      this.code = "";
      this.newPwd = "";
    },
  },
  mounted() {
    this.height = window.innerHeight + "px";
  },
};
</script>

<style lang="scss" scoped>
.cp:hover {
  cursor: pointer;
}
.login {
  width: 100%;
  background: #aaabab;
  background-color: rgba(170, 171, 171, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 320px;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 24px;
    background: #fff;
    position: relative;

    .logofish {
      width: 120px;
      position: absolute;
      top: -77px;
      left: 50%;
      transform: translate(-50%, 0);

      &:nth-child(2) {
        top: -74px;
      }
    }

    .top {
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      font-weight: bold;

      .right {
        width: 12px;
        height: 12px;
        opacity: 0.4;
        margin-top: 3px;

        &:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
    }

    .middle {
      margin-top: 14px;

      input,
      button,
      .regis {
        width: 100%;
      }

      input {
        text-indent: 8px;
        padding: 10px 0;
        margin-top: 10px;
        border: 1px solid #e9e9e9;
        box-sizing: border-box;
        font-size: 14px;

        &:focus {
          border-color: #007fff;
        }
      }

      button {
        background-color: #007fff;
        padding: 12px 0;
        margin: 15px 0 12px;
        border: 0;
        border-radius: 2px;
        color: #fff;
        font-size: 15px;
      }

      .emailTo {
        color: #007fff;
        font-size: 14px;
        margin-top: 12px;
      }

      .regis {
        display: flex;
        justify-content: space-between;
        color: #007fff;
        font-size: 14px;
      }
    }

    .bottom {
      margin-top: 15px;

      .oauth {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .oauth-bg {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: #f4f8fb;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 22px;
            height: 22px;
          }
        }
      }

      .text {
        margin-top: 20px;
        font-size: 14px;
        color: #767676;

        a {
          text-decoration: none;
          color: #007fff;
        }
      }
    }
  }
}
</style>