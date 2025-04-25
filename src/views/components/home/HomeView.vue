<script setup lang="ts">
import { useRouter } from 'vue-router';

let  router = useRouter();


const goToAbout = ()=>{
    router.push('/adout')
}


</script>

<template>
  <h2>这是首页</h2>
  <button @click="goToAbout">Go to About</button>
</template>