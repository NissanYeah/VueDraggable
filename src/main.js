import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/less/font-awesome.less";

Vue.config.productionTip = false;
Vue.use(ElementUI);


new Vue({
  render: h => h(App)
}).$mount("#app");
