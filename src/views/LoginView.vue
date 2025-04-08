<template>
    <a-row class="container">
      <a-col class="c_img" :span="24">
        <div> <a-image :width="200" src="src/assets/bejson.jpg" /></div>
        <div>
          <pre class="c_value" v-loading="loading">{{ word }}</pre>
        </div>
      </a-col>
      <a-col class="btn_box" :span="24">
        <a-button type="primary" :loading="loading" @click="getImgText">解
          析</a-button>
        <a-button type="primary" :loading="loading" @click="download">下 载</a-button>
      </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createWorker } from 'tesseract.js';
import { message } from 'ant-design-vue';
const [messageApi] = message.useMessage();

let word = ref('22222222222222222222')
let loading = ref(false)
let worker = ref(null)
let pdf = ref(null)

onMounted(() => {
  init()
})

onUnmounted(() => {
  // 卸载插件  
  worker.value.terminate()
})

const init = async () => {
  // 初始化插件  
  worker.value = await createWorker(['eng', 'chi_sim'], 1, {
    logger: m => console.log(m),
  });
}


// 获取图片链接文本
const getImgText = async () => {
  loading.value = true
  try {
    const { data } = await worker.value.recognize(url.value, { pdfTitle: 'Example PDF' }, { pdf: true });
    pdf.value = data.pdf
    word.value = data.text
    loading.value = false
  } catch (error) {
    loading.value = false
    messageApi.error('解析失败！');
  }
}

// 下载PDF
const download = () => {
  const blob = new Blob([new Uint8Array(pdf.value)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'example.pdf';
  link.click();
  URL.revokeObjectURL(url);
}


</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px solid red;

  .c_img {
    min-height: 300px;
    border: 1px solid red;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div:nth-child(1){
      min-height: 300px;
      border: 1px solid red;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div:nth-child(2){
      min-height: 300px;
      border: 1px solid #1ef10b;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .btn_box {
    height: 150px;
    border: 1px solid red;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

}
</style>