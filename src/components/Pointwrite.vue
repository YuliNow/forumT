<!--
 * @author: LUOCAN
 * @create: 2021-06-24 09:27 AM
 * @license: MIT
 * @lastAuthor: LUOCAN
 * @lastEditTime: 2021-06-29 10:35 AM
 * @desc: 
-->
<template>
  <div class="write">
    <Release class="rele" v-on="{close:close}" :pwrite="pwrite"></Release>
  </div>
</template>


<script>
import Release from "@/components/ReleaseBoilingPoint.vue";
export default {
  name: "Pointwrite",
  components: {
    Release,
  },
  props:{
    pwrite:Boolean
  },
  methods:{
    close(){
      this.$emit("close")
    }
  }
};
</script>

<style lang="scss" scoped>
.write {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 500;
  overflow-x: hidden;
  overflow-y: hidden;
  .rele {
    margin: 60px auto;
  }
}
</style>