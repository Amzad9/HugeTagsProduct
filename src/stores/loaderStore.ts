import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useLoaderStore = defineStore('loader', () => {
    const isLoading = ref(false);

    const startLoading = () => {
        isLoading.value = true;
    };

    const stopLoading = () => {
        isLoading.value = false;
    };

    return { isLoading, startLoading, stopLoading };
});


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLoaderStore, import.meta.hot))
}