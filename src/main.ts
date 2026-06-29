import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "viewerjs/dist/viewer.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import VViewer from "v-viewer";

// 创建Vue应用实例
const app = createApp(App);

// 使用 Element Plus
app.use(ElementPlus);

// 使用 v-viewer 图片预览插件
app.use(VViewer);

// 使用 Pinia 状态管理
app.use(pinia);

// 使用路由
app.use(router);

// 挂载应用
app.mount("#app");
