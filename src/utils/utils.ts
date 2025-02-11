import mitt from "mitt";
import type { ToastMessageOptions } from "primevue";

// ✅ Define event types for mitt
type Events = {
  "show-toast": ToastMessageOptions;
};

export const eventBus = mitt<Events>(); // ✅ Now mitt knows the "show-toast" event expects a ToastMessageOptions object
