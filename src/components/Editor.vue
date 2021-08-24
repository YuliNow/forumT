<!--
 * @author: DoubleW
 * @create: 2021-06-24 09:56 AM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-01 16:50 PM
 * @desc: 
-->
<template>
  <div class="box">
    <div class="editor">
      <div id="editor" class="editorTitle"></div>
    </div>

    <div id="box_content" v-html="vHtml"></div>
    <input type="file" id="file" name="" @change="change" />
  </div>
</template>

<script>
import E from "wangeditor";
import axios from "axios";
export default {
  name: "editor",
  props: {
    getFullText: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      vHtml: "",
      editor: "",
    };
  },
  methods: {
    change(e) {
      let file = e.target.files[0];

      let formData = new FormData();
      formData.append("img", file);

      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      // 文件上传接口
      axios
        .post("http://api_devss.wanxikeji.cn/api/savePic", formData, config)
        .then((res) => {
          console.log(res.data);
          this.editor.$txt.append(
            `<img src="http://api_devss.wanxikeji.cn/${res.data.data}" class="images" />`
          );
        });
    },
  },
  mounted() {
    this.editor = new E("editor");
    let content = document.getElementById("box_content");

    // console.info(this.editor);
    this.editor.onchange = () => {
      this.editor.$txt.html(); // 内容赋值
      this.vHtml = this.editor.$txt.html();

      content.children.forEach((ele) => {
        ele.style.padding = "10px 0";
      });
    };

    this.editor.config.uploadImgUrl =
      "http://api_devss.wanxikeji.cn/api/savePic";

    // 配置全屏功能按钮是否展示
    this.editor.create(); // 创建富文本实例
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  display: flex;

  .editor {
    width: 50vw;

    #editor {
      height: calc(100vh - 133px) !important;
    }
  }

  #box_content {
    padding: 15px;
    box-sizing: border-box;
    width: 50vw;
    height: calc(100vh - 65px) !important;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  #file {
    width: 0;
    height: 0;
  }
}
.images {
  max-width: 100%;
}
// #editor {
//   display: flex;

//   div {
//     width: 100%;
//   }

//   .editor1 {
//     box-sizing: border-box;
//     border-top: 1px solid #c9d8db;
//     border-bottom: 1px solid #c9d8db;
//   }

//   .editor2 {
//     width: 100%;
//     background-color: #fff;
//     box-sizing: border-box;
//     border-top: 1px solid #c9d8db;
//     border-bottom: 1px solid #c9d8db;
//     border-left: 1px solid #c9d8db;
//     padding: 0 10px;
//   }
// }
</style>