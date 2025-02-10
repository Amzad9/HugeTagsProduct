<script setup lang="ts">
import { menuItems } from '@/types/menu/menu';
</script>
<template>
<ul
  class="w-64 bg-gray-800 text-white h-screen p-4 space-y-4">
  <li v-for="item in menuItems"
    :key="item.path">
    <RouterLink :to="item.path"
      class="flex py-6 border-b">
      {{ item.name }}
    </RouterLink>
  </li>
</ul>
</template>
