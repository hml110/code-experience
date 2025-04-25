<script setup lang="ts">
import { useRouter } from 'vue-router';

let  router = useRouter();


const goToHome = ()=>{
    router.push('/')
}


</script>

<template>
  <h2>这是关于页面</h2>
  <button @click="goToHome">Go to Home</button>
</template>