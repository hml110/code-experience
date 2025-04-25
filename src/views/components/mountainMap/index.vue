<template>
  <div class="mountain-map">
    <div id='mountain-map-container'></div>
  </div>
</template>

<script setup lang="ts" name='mountainMap'>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import chinaJson from '../utils/china.json';
import { mountains } from './mountains.js';

/*去过的地方*/
const visited = ref<string[]>(["华山", "黄山", "泰山", "长白山", "武功山", "恒山", "云台山", "三清山", "龟峰"]);


/**
 * 初始化
 */
const initEchart = () => {
  const mountainData = mountains;
  echarts.registerMap("china",chinaJson);
  const myChart = echarts.init(document.getElementById("mountain-map-container"));
  const data = mountainData.map(item => {
    return {
      name: item.name,
      value: [item.longitude, item.latitude],
      info:item,
      icon:visited.value.includes(item.name) ? "mountain" : "mountain2"
    }

  })










}

</script>

<style lang="less" scoped></style>