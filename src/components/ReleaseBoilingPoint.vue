<!--
 * @author: Spring
 * @create: 2021-06-23 09:04 AM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-07-05 17:20 PM
 * @desc: 
-->
<template>
  <div class="container">
    <div class="toptitle" v-show="pwrite">
      <span>发布沸点</span>
      <span @click="close"
        ><svg
          t="1624933254533"
          class="icon"
          viewBox="0 0 1025 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1209"
          width="10"
          height="10"
        >
          <path
            d="M460.8 516.654545C314.181818 367.709091 172.218182 228.072727 32.581818 88.436364-2.327273 53.527273-9.309091 32.581818 13.963636 11.636364c20.945455-18.618182 39.563636-13.963636 74.472728 20.945454 132.654545 132.654545 262.981818 265.309091 395.636363 395.636364 9.309091 9.309091 16.290909 20.945455 30.254546 39.563636 18.618182-25.6 32.581818-41.890909 46.545454-58.181818 125.672727-125.672727 251.345455-253.672727 379.345455-379.345455 9.309091-9.309091 16.290909-20.945455 25.6-23.272727 16.290909-4.654545 39.563636-6.981818 46.545454 2.327273 9.309091 11.636364 6.981818 32.581818 4.654546 48.872727 0 9.309091-13.963636 16.290909-20.945455 23.272727C851.781818 225.745455 712.145455 367.709091 567.854545 512c20.945455 23.272727 41.890909 44.218182 62.836364 65.163636 121.018182 121.018182 242.036364 242.036364 365.381818 363.054546l9.309091 9.309091c18.618182 18.618182 30.254545 39.563636 6.981818 60.509091-23.272727 23.272727-44.218182 11.636364-65.163636-6.981819L546.909091 602.763636c-11.636364-11.636364-18.618182-23.272727-30.254546-37.236363-16.290909 16.290909-27.927273 25.6-37.236363 34.909091-132.654545 132.654545-265.309091 265.309091-400.290909 397.963636-6.981818 6.981818-13.963636 16.290909-20.945455 18.618182-16.290909 2.327273-37.236364 2.327273-46.545454-4.654546-9.309091-9.309091-6.981818-32.581818-4.654546-46.545454 2.327273-9.309091 13.963636-18.618182 23.272727-25.6l395.636364-395.636364c11.636364-11.636364 23.272727-18.618182 34.909091-27.927273z"
            p-id="1210"
          ></path></svg
      ></span>
    </div>
    <div
      class="edit_box"
      :style="{
        border: focus
          ? 'border: 1px solid #007fff'
          : '1px solid hsla(0, 0%, 59.2%, 0.2)',
        backgroundColor: focus ? '#fff' : 'rgba(226, 230, 235, 0.2)',
      }"
    >
      <div
        class="edit"
        contenteditable="true"
        placeholder="告诉你个小秘密,发布沸点时添加合适的话题会被更多掘友们看见哟~"
        @focus="focus = true"
        @blur="focus = false"
        @input="content($event)"
        ref="edit"
      ></div>
      <div class="img_link">
        <div class="chooseImg" v-for="(item, index) in imgArr" :key="item">
          <img :src="'http://api_devss.wanxikeji.cn/' + item" alt="" />
          <span class="el-icon-error" @click="removeImg(index)"></span>
        </div>
        <el-upload
          action="http://api_devss.wanxikeji.cn/api/savePic"
          :show-file-list="false"
          name="img"
          accept="image/jpeg,image/gif,image/png"
          :on-success="handleSuccess"
          :limit="9"
          multiple
          class="upload"
        >
          <div
            class="addImg chooseImg"
            v-if="imgArr.length > 0 && imgArr.length < 9"
          >
            +
          </div>
        </el-upload>
        <div class="link" v-show="tagchoose.length">{{ tagchoose[0] }}</div>
      </div>
      <div class="num">{{ num }}</div>
    </div>
    <div class="add">
      <div class="left">
        <div class="face" @click.stop="showFace($event)">
          <img
            src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/5594dbb510a36a6453e2d9a67d13f5ff.svg"
            alt=""
          />表情
          <face
            class="facezj"
            @face="face"
            :show="show.face"
            style="z-index: 1"
          />
        </div>

        <el-upload
          action="http://api_devss.wanxikeji.cn/api/savePic"
          :show-file-list="true"
          name="img"
          accept="image/jpeg,image/gif,image/png"
          :on-success="handleSuccess"
          :limit="9"
          multiple
          class="upload"
        >
          <div class="img">
            <img
              src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/d265f4eace781e9889089456b49bf962.svg"
              alt=""
            />图片
          </div>
        </el-upload>
        <div class="link">
          <img
            src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/b1a683233dcd06c41259e3972bbb4d87.svg"
            alt=""
          />链接
        </div>
        <div class="topic">
          <div @click="topclick">
            <img
              src="https://sf3-scmcdn2-tos.pstatp.com/xitu_juejin_web/6a87bb7f0775e3ae31780fcb661a3b4e.svg"
              alt=""
            />
            话题
          </div>
          <div class="tag" v-show="show.topic">
            <el-input
              placeholder="搜索话题"
              suffix-icon="el-icon-search"
              v-model="search"
              class="search_input"
            >
            </el-input>
            <div class="tag_box">
              <div
                @click="choosetag(item)"
                class="tag_card"
                v-for="item in tag"
                :key="item.tag_id"
              >
                <div class="title">{{ item.tag_name }}</div>
                <div class="info">{{ item.num }}关注</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        :style="{ opacity: num == 1000 ? '.2' : '1' }"
        class="issue"
        @click="submit"
      >
        发布
      </div>
    </div>
  </div>
</template>

<script>
import face from "./Face.vue";
import { addModifyArticle, tagRanking } from "@/api/article";
export default {
  name: "release",
  props: {
    pwrite: Boolean,
  },
  data() {
    return {
      show: {
        face: false,
        topic: false,
      },

      focus: false,
      //上传的图片数组
      imgArr: [],
      //输入框的文字
      inputContent: "",
      //标签
      tag: [],
      //标签搜索框
      search: "",
      //选择的标签
      tagchoose: [],
    };
  },
  components: {
    face,
  },
  computed: {
    num() {
      return 1000 - this.inputContent.length;
    },
  },
  mounted() {
    this.gettagRanking();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    //选择标签
    choosetag(item) {
      this.tagchoose = [];
      this.tagchoose.push(item.tag_name);
      console.log(this.tagchoose);
    },
    //获取标签
    gettagRanking() {
      tagRanking().then((res) => {
        this.tag = res.data.data;
      });
    },
    submit() {
      if (!this.tagchoose.length) {
        this.$message("请选择话题", "error");
        return;
      }
      let tok = JSON.parse(localStorage.getItem("user"));
      let obj = {
        token: tok.token,
        info: JSON.stringify({
          content: this.inputContent,
          imgs: this.imgArr,
        }),
        tags_name: this.tagchoose,
        type: 2,
      };
      console.log(obj);
      addModifyArticle(obj).then((res) => {
        console.log(res);
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      });
      (this.inputContent = ""), (this.imgArr = []), (this.tagchoose = []);
      this.$refs.edit.innerHTML = "";
    },
    content(e) {
      this.inputContent = e.target.innerHTML;
    },
    face(item) {
      // this.$refs.edit.innerHTML += `<img src=${item} style="width:22px;height:22px"/>`;
      this.$refs.edit.innerHTML += item;
      this.$refs.edit.focus();
    },
    showFace(e) {
      console.log(e.target.getAttribute("only"));
      if (e.target.getAttribute("only")) {
        return;
      }
      this.show.face = !this.show.face;
      this.show.topic = false;
    },
    handleSuccess(response, file, fileList) {
      this.imgArr.push(response.data);
      console.log(this.imgArr);
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    removeImg(index) {
      this.imgArr.splice(index);
    },
    topclick() {
      this.show.topic = !this.show.topic;
      this.show.face = false;
    },
  },
};
</script>

<style scoped lang="scss">
@mixin position($position, $top, $right, $bottom, $left, $width, $height) {
  position: $position;
  top: $top;
  right: $right;
  bottom: $bottom;
  left: $left;
  width: $width;
  height: $height;
}
//flex
@mixin flex($jc: center, $ai: center, $fd: row) {
  display: flex;
  justify-content: $jc;
  align-items: $ai;
  flex-direction: $fd;
}

//文本溢出隐藏
@mixin hidden($num) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $num;
  overflow: hidden;
}
//单行文本溢出隐藏
@mixin onerow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
//文本
@mixin font($size, $color, $weight: normal, $family: "Microsoft YaHei") {
  font-size: $size;
  color: $color;
  font-weight: $weight;
  font-family: $family;
}
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.container {
  width: 570px;
  min-height: 153px;
  background-color: #fff;
  box-sizing: border-box;
  padding: 16px 15px 10px;
  margin-bottom: 8px;
  .toptitle {
    display: flex;
    justify-content: space-between;
    padding: 0 10px 10px 0;
  }
}
.edit_box {
  width: 530px;
  min-height: 87px;
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
  .edit {
    width: 528px;
    min-height: 55px;
    border: none;
    outline: none;
    overflow: auto;
    text-align: left;
  }
  .edit:empty::before {
    content: attr(placeholder);
    color: #bbb;
    background-color: #f9fafb;
  }
  /*不一样的地方*/
  .edit:focus {
    content: none;
  }
  .img_link {
    @include flex(flex-start, center);
    flex-wrap: wrap;
    .chooseImg {
      width: 80px;
      height: 80px;
      position: relative;
      margin-right: 8px;
      margin-bottom: 8px;
      span {
        position: absolute;
        top: 3px;
        right: 3px;
        cursor: pointer;
      }
      img {
        width: 80px;
        height: 80px;
        cursor: pointer;
      }
    }
    .addImg {
      width: 80px;
      height: 80px;
      border: 1px dashed #c5c5c5;
      cursor: pointer;
      @include font(50px, #d2d2d2);
      @include flex();
    }
    .link {
      width: 52px;
      height: 22px;
      border-radius: 14px;
      border: 1px solid #007fff;
      @include font(13px, #007fff);
      @include flex();
    }
  }
  .num {
    width: 100%;
    height: 23px;
    box-sizing: border-box;
    padding-right: 14px;
    @include flex(flex-end, center);
    @include font(13px, #a1a9b3);
  }
}
.add {
  width: 530px;
  margin-top: 10px;
  @include flex(space-between, center);
  .left {
    width: 260px;
    @include flex(space-between, center);
    div {
      cursor: pointer;
      @include flex(center, center);
      @include font(13px, #027fff);
    }
    .face {
      position: relative;
      .facezj {
        background-color: #fff;
        z-index: 20px;
        position: absolute;
        top: 32px;
        left: 0;
        width: 304px;
        height: 234px;
        box-sizing: border-box;
        padding: 12px;
        @include flex(flex-start, center, column);
      }
    }
    .img {
      .upload {
        cursor: pointer;
        @include flex(center, center);
        @include font(13px, #027fff);
      }
    }
    .topic {
      position: relative;
      .tag {
        z-index: 20;
        @include position(absolute, 20px, none, none, 0, 316px, 434px);
        box-sizing: border-box;
        padding: 18px 20px;
        background-color: #fff;
        @include flex(flex-start, center, column);
        overflow-y: auto;
        box-shadow: 0 5px 18px 0 rgb(0 0 0 / 16%);
        .tag_box {
          @include flex(flex-start, center, column);
          width: 260px;
          height: 42px;
          box-sizing: border-box;
          background-color: #fff;
          .tag_card {
            padding: 10px 15px;
            @include flex(flex-start, flex-start, column);
            width: 100%;
            border-bottom: 1px solid #f4f4f4;
            &:hover {
              background-color: #f8f8f8;
            }
            .title {
              @include font(14px, #333);
            }
            .info {
              @include font(13px, #8a9aa9);
            }
          }
        }
      }
    }
  }
  .issue {
    width: 72px;
    height: 32px;
    border-radius: 2px;
    background-color: #027fff;
    opacity: 0.2;
    cursor: pointer;
    @include font(15px, #fff);
    @include flex();
  }
}
</style>
