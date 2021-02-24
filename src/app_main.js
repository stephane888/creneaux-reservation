import Vue from "vue";
import Creneaux from "./Creneaux.vue";

Vue.config.productionTip = false;
const idApp = "AppCreneau";
//var element = document.getElementById(idApp);
//var displayAdmin = element.getAttribute("display-admin");
new Vue({
  render: h =>
    h(Creneaux, {
      /*
      props: {
        "display-admin":""
      }
      /**/
    })
}).$mount("#" + idApp);
