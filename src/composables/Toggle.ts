import { ref } from 'vue';

export function useToggle(initialValue: boolean = false) {
    const isToggle = ref(initialValue);

    function toggle() {
        isToggle.value = !isToggle.value;
    }

    return {
        isToggle,
        toggle
    };
}