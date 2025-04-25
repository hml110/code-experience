<script setup lang="ts">
import { useRouter } from 'vue-router'; // 1. 导入 useRouter
const router = useRouter(); // 2. 获取 router 实例
// 3. 从 router 实例的 options 中获取路由配置数组
//    并进行转换以匹配模板中的 linkList 结构
//    确保只包含有名字的路由，并断言 name 为 string 类型（如果 router.ts 中定义了的话）
const linkList = router.options.routes
  .filter(route => route.name) // 可选：过滤掉没有 name 的路由
  .map(route => ({
    router: route.path, // path 作为路由链接
    name: route.name as string // name 作为显示名称
  }));

</script>

<template>
  <div id='app'>
    <nav>
      <router-link v-for="(route, index) in linkList" :to="route.router" :key="route.router">
        <span v-if="index != 0"> | </span>
        <span class="route-name">{{ route.name }}</span>
      </router-link>
    </nav>
    <router-view />
  </div>

</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  /* color: #2c3e50; */
  nav {
    padding: 30px;

    .route-name {
      font-weight: bold;
      font-size: larger;
    }

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
