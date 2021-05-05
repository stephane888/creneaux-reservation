//on ajoute les valeurs pour les test ici.
console.log(
  "%c Local (à masquer en production ) ",
  "background: #222; color: #F00; font-size:25px;"
);
/*
window.wbu_current_date = "08-02-2021 17:39:00";
window.deccalage_creneau_depart = 0;
window.creneau_configs = {
  nombre_semaine: 6,
  heures: [],
  days: [],
  date_desactivee: []
};
//
window.creneau_configs.heures.push({
  debut: "13:00",
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
  debut: "9:00",
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

/**
 *  On place les données pour la configuration preview.
 */
if (
  window.location.host === "localhost:8080" &&
  typeof localStorage !== "undefined"
) {
  //  window.wbu_current_date = "04-05-2021 08:39:00";
  //Chargment de la configuration de base.
  window.creneau_configs = JSON.parse(localStorage.getItem("creneau_configs"));

  // Chargement du type de livraison.
  window.creneau_types = JSON.parse(localStorage.getItem("creneau_types"));

  // Chargement du type de livraison.
  window.creneau_filters = JSON.parse(localStorage.getItem("creneau_filters"));
}
//
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
const idApp = "app";
var element = document.getElementById(idApp);
var displayAdmin = true;
if (element) {
  displayAdmin = element.getAttribute("display-admin");
}
new Vue({
  render: h =>
    h(App, {
      props: {
        "display-admin": displayAdmin === "true" || displayAdmin ? true : true
      }
    })
}).$mount("#" + idApp);

/*
autre approche pour recuprer les données.
  new Vue({
    el: '#app',
    template:"<app :id='id'></app>",
    data:{
      id: document.querySelector("#app").dataset.initialValue
    },
    components:{
      App
    }
  });
/**/
