<script setup lang="ts">
import { Drawer } from "primevue";
const visibleRightModel = defineModel<boolean>()

</script>

<template>
<Drawer v-model:visible="visibleRightModel"
    header="Right Drawer"
    position="right">
    <slot name="content"></slot>
</Drawer>
</template>