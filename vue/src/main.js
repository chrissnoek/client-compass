import { createApp, markRaw } from "vue";
import store from "./store";

import router from "./router";
import App from "./App.vue";
import "./index.css";

import { createPinia } from "pinia"; // Import

const pinia = createPinia();

pinia.use(({ store }) => {
	store.router = markRaw(router);
});

createApp(App).use(pinia).use(router).mount("#app");
