<template>
    <div class="sign">
        签到页面
    </div>
    <div class="popup"></div>
</template>
<script lang="ts" setup>
import { defineComponent } from 'vue';
</script>

<style lang="scss" scoped>
.sign{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: rgba(255,255,255,1);
    border-radius: 4px;
    z-index: 1000;
    padding: 10px;
    min-height: 280px;
    min-width:200px;
}
.popup{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.72);
}
</style>
