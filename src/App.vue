<script setup lang="ts">
import { onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { eventBus } from "@/utils/utils"; // ✅ Import the shared event bus


import type { ToastMessageOptions } from "primevue/toastservice";

const toast = useToast();

onMounted(() => {
  eventBus.on("show-toast", (message: ToastMessageOptions) => {
    toast.add(message); //
  });
});
</script>

<template>
<Toast />
<RouterView />
</template>
