<!--
 * @author: DoubleW
 * @create: 2021-06-17 15:37 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-06-22 14:49 PM
 * @desc: 
-->
<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/login"><button>点击登录</button></router-link>
      <router-link to="/signup"><button>点击注册</button></router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
