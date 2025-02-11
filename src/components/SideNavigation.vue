<script setup lang="ts">
import { menuItems } from '@/types/menu/menu';
</script>
<template>
<div class="card rounded-0">
  <ul
    class="w-64 text-white border-r-1 border-gray-800 h-screen p-4 space-y-4">
    <li v-for="item in menuItems"
      :key="item.path">
      <RouterLink :to="item.path"
        class="flex py-6 border-b border-gray-800">
        {{ item.name }}
      </RouterLink>
    </li>
  </ul>
</div>
</template>
