import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import VueI18n from "vue-i18n";
import { messages } from "./plugins/languages";
Vue.config.productionTip = false;

Vue.use(VueI18n);
const i18n = new VueI18n({ locale: "es", messages });
new Vue({
  router,
  i18n,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
