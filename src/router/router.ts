import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/components/home/HomeView.vue'
import AboutView from '../views/components/home/AboutView.vue'
import Drag from '../views/components/drag/index.vue'
import MountainMap from '../views/components/mountainMap/index.vue'
import TextOcr from '../views/components/ocr/TextOcr.vue'

const routes = [
  { path: '/', name: '首页', component: HomeView },
  { path: '/about', name: '关于', component: AboutView },
  { path: '/ocr', name: '文字识别', component: TextOcr },
  { path: '/drag', name: '拖拽', component: Drag },
  { path: '/mountainMap', name: '名山地图', component: MountainMap },
]


const router = createRouter({
  // history: createMemoryHistory(),
  history: createWebHistory(),
  routes,
})

export default router