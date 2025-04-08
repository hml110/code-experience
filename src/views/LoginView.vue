<template>
  <div class="login-container">


    <a-row>
      <a-col :span="24"> <a-image :width="200" src="src/assets/bejson.jpg" /></a-col>
      <a-col :span="24"> <a-button type="primary" :loading="loading" @click="getImgText">解 析</a-button></a-col>
      <a-col :span="24"> <a-button type="primary" :loading="loading" @click="download">下 载</a-button></a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createWorker } from 'tesseract.js';

let word = ref('')
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
    ElMessage({
      message: '解析失败',
      type: 'warning',
    })
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

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-form {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>