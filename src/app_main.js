import Vue from "vue";
import Creneaux from "./Creneaux.vue";

Vue.config.productionTip = false;
const idApp = "AppCreneau";
//var element = document.getElementById(idApp);
//var displayAdmin = element.getAttribute("display-admin");
if (window.moment) {
  var moment = window.moment;
}
window.wbu_current_date = moment();

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
