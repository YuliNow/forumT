<!--
 * @author: DoubleW
 * @create: 2021-06-23 15:28 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-06-28 15:06 PM
 * @desc: 首页三级标题
-->
<template>
  <div class="three_nav">
    <ul class="tag_nav">
      <li
        class="tag_item"
        @click="tagChoose($event)"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item }}
      </li>
      <li class="tag_item unfold" @click="showMore" v-show="!status">展开</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "hometype",
  props: { list: Array, status: Number },
  methods: {
    // TODO 选中
    tagChoose(e) {
      let tags = document.getElementsByClassName("tag_item");
      tags.forEach((ele) => {
        ele.style.background = "#fff";
        ele.style.color = "#8a9aa9";
      });
      e.target.style.background = "#007FFF";
      e.target.style.color = "#fff";
    },
    // TODO 展示更多
    showMore() {
      this.$emit("showM");
    },
  },
};
</script>

<style lang="scss">
.three_nav {
  width: 100%;
  margin: 12px auto 4px;
  max-width: 960px;

  .tag_nav {
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;
    gap: 12px;

    .tag_item {
      background-color: #fff;
      color: #8a9aa9;
      border-radius: 20px;
      line-height: 25px;
      padding: 0 10px;

      &:first-child {
        background-color: #007fff;
        color: #fff;
      }

      &:hover {
        color: #007fff !important;
        cursor: pointer;
      }
    }
    .unfold {
      position: relative;
      padding-right: 20px;

      &::after {
        content: "";
        display: block;
        height: 0;
        width: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #8a9aa9;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
  }
}
</style>