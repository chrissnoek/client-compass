import "./bootstrap";
import { createApp, markRaw } from "vue";

import router from "./router";
import App from "./App.vue";
import "../css/index.css";
import mitt from "mitt";

import { createPinia } from "pinia"; // Import

const pinia = createPinia();
const emitter = mitt();

pinia.use(({ store }) => {
	store.router = markRaw(router);
});

const app = createApp(App).use(pinia).use(router);
app.provide("emitter", emitter);
app.mount("#app");
