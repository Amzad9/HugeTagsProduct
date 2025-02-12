<script setup lang="ts">
import { RouterView } from 'vue-router'

import Card from 'primevue/card';
import Layout from '@/layouts/Layout.vue';
import SideNavigation from '@/components/SideNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue'
import Loader from "@/components/Loader.vue";
import { useLoaderStore } from "@/stores/loaderStore";
const loaderStore = useLoaderStore();
</script>
<template>
<Layout>
  <template #sidebar>
    <SideNavigation />
  </template>
  <template #header>
    <TopNavigation />
  </template>
  <template #default>
    <Card class="relative">
      <template #content>
        <template v-if="loaderStore.isLoading">
          <Loader inline
            size="120px"
            strokeWidth="3"
            animationDuration="1s" />
        </template>
        <RouterView />
      </template>
    </Card>
  </template>
</Layout>
</template>

<style scoped></style>
