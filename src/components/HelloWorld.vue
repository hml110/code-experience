<script setup lang="ts" name='HelloWorld'>
import TextOcr from '../views/TextOcr.vue';

import dayjs from 'dayjs';
defineProps<{ msg: string }>()
console.log(dayjs());
console.log(dayjs().second());
console.log(dayjs().format('YYYY-MM-DD'));

</script>

<template>

<h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home </RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
    <main>
    <RouterView />
  </main>

  <!-- <TextOcr /> -->

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>