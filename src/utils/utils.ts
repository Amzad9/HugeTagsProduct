import mitt from "mitt";
import type { ToastMessageOptions } from "primevue";

type Events = {
  "show-toast": ToastMessageOptions;
};

export const eventBus = mitt<Events>();
