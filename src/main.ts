import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from "mitt";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";

import "./assets/main.css";
import "element-plus/dist/index.css";

const app = createApp(App);
const emitter = mitt();

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.provide("emitter", emitter);
app.mount("#app");
