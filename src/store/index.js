/*
 * @author: DoubleW
 * @create: 2021-06-22 10:38 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-05 14:14 PM
 * @desc:
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 表情大全
    emojiArr: [
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
    // 默认头像
    avatar:
      "http://api_devss.wanxikeji.cn/app/pic/20210629/20210629025835926.png",
    // 个人用户信息
    infoArr: [],
  },
  mutations: {
    getStoken(state, token) {
      state.token = token;
    },
    getInfo() {
      let str = JSON.parse(localStorage.getItem("passer"));
      this.state.infoArr = str;
    },
  },
  actions: {},
  modules: {},
});
