import { createApp } from "vue";
import App from "./App.vue";
import appStore from "./appStore";
import { APP_STORE } from "./symbols";

createApp(App).provide(APP_STORE, appStore).mount("#app");
