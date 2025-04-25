import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router/router'
import * as echarts from 'echarts';
import 'ant-design-vue/dist/reset.css';
import './style/index.css'

const app = createApp(App)
app.use(Antd).use(router);
// 全局挂载echarts
app.config.globalProperties.$echarts = echarts;

app.mount('#app')

