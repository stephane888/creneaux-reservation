import Vue from "vue";
import UserCreneau from "./App/UserCreneau.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h =>
    h(UserCreneau, { props: { dateDuJour: window.wbu_current_date } })
}).$mount("#creneau-mylittlepressing");
