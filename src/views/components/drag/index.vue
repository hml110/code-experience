<script setup lang="ts" name='HelloWorld'>
import DraggabledByNativeApi from './components/DraggabledByNativeApi.vue'
import DraggabledByCustom from './components/DraggabledByCustom.vue'

</script>

<template>
<a-row class="page">
    <a-col :span="12" class="page-left">
      <DraggabledByNativeApi/>
      <div class="mt-6">
         <a-tag color="#f50">原生拖拽 API</a-tag>
      </div>
    </a-col>
    <a-col :span="12" class="page-right">
      <DraggabledByCustom/>
      <div class="mt-6">
         <a-tag color="#f50">自定义拖拽</a-tag>
      </div>
    </a-col>
  </a-row>
</template>

<style scoped lang="less">
.page{
  width:500px;
  height: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  .page-left{
    width:200px;
    border-right: 1px solid #ccc;
  }
  .page-right{
    border-left: 1px solid #ccc;
  }
}


</style>