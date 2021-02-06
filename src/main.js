//on ajoute les valeurs pour les test ici.
console.log(
  "%c Local (à masquer en production ) ",
  "background: #222; color: #F00; font-size:25px;"
);
//window.wbu_current_date='06-DD-MM-YYYY HH:mm:ss';
window.creneau_configs = {
  nombre_semaine: 6,
  heures: [],
  days: [],
  date_desactivee: []
};
//
window.creneau_configs.heures.push({
  debut: "14:00",
  fin: "18:00"
});
window.creneau_configs.heures.push({
  debut: "7:00",
  fin: "21:30"
});
window.creneau_configs.heures.push({
  debut: "7:00",
  fin: "21:30"
});
window.creneau_configs.heures.push({
  debut: "7:00",
  fin: "21:30"
});
window.creneau_configs.heures.push({
  debut: "7:00",
  fin: "21:30"
});
window.creneau_configs.heures.push({
  debut: "7:00",
  fin: "22:30"
});
window.creneau_configs.heures.push({
  debut: "7:00",
  fin: "21:30"
});
//
window.creneau_configs.days.push(false);
window.creneau_configs.days.push(true);
window.creneau_configs.days.push(true);
window.creneau_configs.days.push(true);
window.creneau_configs.days.push(true);
window.creneau_configs.days.push(true);
window.creneau_configs.days.push(true);
//
window.creneau_heures = {
  heuredate: [],
  heureday: []
};
//
//
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
