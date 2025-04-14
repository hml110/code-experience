import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  css:{
    preprocessorOptions:{
      less:{
         // 如果需要，在这里添加对LESS的全局变量等配置
        // 例如：javascriptEnabled: true, // 启用内联JavaScript
      }
    }
  }
})
