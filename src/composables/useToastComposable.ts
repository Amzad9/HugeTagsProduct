import type { ToastMessageOptions } from "primevue";
import { eventBus } from "@/utils/utils";

export function useToastComposable() {
  const showToast = (message: ToastMessageOptions) => {
    eventBus.emit("show-toast", message);
  };

  return { showToast };
}
