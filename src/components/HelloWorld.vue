<script setup lang="ts" name='HelloWorld'>
import TextOcr from '../views/TextOcr.vue';

import dayjs from 'dayjs';

defineProps<{ msg: string }>()



console.log(dayjs());
console.log(dayjs().second());
console.log(dayjs().format('YYYY-MM-DD'));

</script>

<template>

  <TextOcr />

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>