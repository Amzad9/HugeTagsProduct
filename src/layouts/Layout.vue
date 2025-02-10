<script setup lang="ts">
</script>
<template>
<div class="flex">
    <aside>
        <slot name="sidebar"></slot>
    </aside>
    <main class="w-full">
        <slot name="header"></slot>
        <div class="px-4">
            <slot></slot>
        </div>
    </main>
</div>
</template>