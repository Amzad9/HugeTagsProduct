<script setup lang="ts">
import { RouterView } from 'vue-router'
import Card from 'primevue/card';

import Layout from '@/layouts/Layout.vue';
import SideNavigation from '@/components/SideNavigation.vue';

</script>
<template>
<Layout>
  <template #sidebar>
    <SideNavigation />
  </template>
  <template #header>
    <h1>My App</h1>
  </template>
  <template #default>
    <Card>
      <template #content>
        <RouterView />
      </template>
    </Card>
  </template>
</Layout>
</template>

<style scoped></style>
