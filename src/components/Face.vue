<!--
 * @author: Spring
 * @create: 2021-06-23 10:46 AM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-07-05 14:32 PM
 * @desc: 
-->
<template>
  <div class="container" only="faceshow" v-show="show">
    <div class="triangle" only="faceshow"></div>
    <div class="face_box" only="faceshow">
      <span
        only="faceshow"
        @click="chooseFace(item)"
        alt=""
        v-for="(item, index) in showArr"
        :key="index"
        >{{ item }}</span
      >
    </div>
    <div class="circle_box" only="faceshow">
      <div
        :style="{ backgroundColor: current == index ? '#D8D8D8' : '#F0F0F0' }"
        class="circle"
        v-for="(item, index) of circle"
        :key="item"
        @click="page(index)"
        only="faceshow"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["face", "show"],
  data() {
    return {
      //表情数组
      arr: [
        "😀",
        "😁",
        "😂",
        "🤣",
        "😃",
        "😄",
        "😅",
        "😆",
        "😉",
        "😉",
        "😊",
        "😋",
        "😎",
        "😍",
        "🥰",
        "😘",
        "😗",
        "😙",
        "😚",
        "🙂",
        "🤩",
        "🤗",
        "🤨",
        "🤩",
        "🤔",
        "🤨",
        "😐",
        "😑",
        "😶",
        "🙄",
        "😏",
        "😣",
        "😥",
        "😮",
        "🤐",
        "😯",
        "😪",
        "😫",
        "🥱",
        "😴",
        "😌",
        "😛",
        "😜",
        "😝",
        "🤤",
        "😒",
        "😓",
        "😔",
        "😕",
        "🙃",
        "🤑",
        "😲",
        "🙁",
        "😖",
        "😞",
        "😟",
        "🤯",
        "😤",
        "😢",
        "😭",
        "🥵",
        "🥶",
        "😦",
        "🤪",
        "😧",
        "🥴",
        "🤮",
        "😨",
        "😩",
        "🤯",
        "😬",
        "🤬",
        "😰",
        "😱",
        "🥵",
        "🥶",
        "🥳",
        "🥺",
        "😳",
        "🤪",
        "😵",
        "🤫",
        "😠",
        "😡",
        "🤬",
        "😷",
        "🤒",
        "🧐",
        "🤭",
        "🤕",
        "🤢",
        "🤧",
        "😇",
        "🥺",
        "🤠",
        "‍🤡",
        "🤥",
        "🤫",
        "🤭",
      ],
      //展示数组
      showArr: [],
      //小圆点数量
      circle: 0,
      //当前在第几页
      current: 0,
    };
  },
  components: {},
  mounted() {
    this.showArr = this.arr.slice(0, 54);
    this.circle = Math.ceil(this.arr.length / 54);
  },
  methods: {
    page(index) {
      this.current = index;
      let start = index * 54;
      let end = (index + 1) * 54;
      this.showArr = this.arr.slice(start, end);
    },
    chooseFace(item) {
      this.$emit("face", item);
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
.container {
  position: relative;
  width: 304px;
  height: 234px;
  box-sizing: border-box;
  padding: 12px;
  @include flex(flex-start, center, column);
  box-shadow: 0 5px 18px 0 rgb(0 0 0 / 16%);
  .triangle {
    @include position(absolute, -19.2px, none, none, 12%, 0, 0);
    border: 9.6px solid transparent;
    border-bottom-color: #fff;
  }
}
.face_box {
  display: grid;
  grid-template-columns: repeat(9, 22px);
  grid-template-rows: repeat(6, 22px);
  grid-gap: 10px;
  span {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
  }
}
.circle_box {
  margin-top: 10px;
  width: 48px;
  @include flex(space-between, center);
  .circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
