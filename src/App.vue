<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { useStore } from '@/store';
import { computed } from 'vue';
const store = useStore();
const isloading = computed(()=>store.isLoading);

</script>

<template>
<router-view />
</template>

<style lang="scss">
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>
