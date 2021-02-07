<template>
  <div>
    <creneau
      :blocks_type_livraisons="blocks_type_livraisons"
      :app_env_prod="app_env_prod"
      :nombre_res_creneau="nombre_res_creneau"
      :collecte_current_date="collecte_current_date"
      :livraison_current_date="livraison_current_date"
      :nombre_semaine="nombre_semaine"
      :plage_heures_valide="plage_heures_valide"
      :collecte_jour_desactivee="collecte_jour_desactivee"
      :livraison_jour_desactivee="livraison_jour_desactivee"
      :collecte_date_desactivee="collecte_date_desactivee"
      :livraison_date_desactivee="livraison_date_desactivee"
      :disable_heureday="disable_heureday"
      :disable_heuredate="disable_heuredate"
      :url_get_creneau="url_get_creneau"
      :url_save_creneau="url_save_creneau"
      :collecte_delai_jour="collecte_delai_jour"
      :collecte_interval="collecte_interval"
      :livraison_delai_jour="livraison_delai_jour"
      :livraison_interval="livraison_interval"
      :collecte_deccalage_creneau_depart="collecte_deccalage_creneau_depart"
      class="container first-block "
    ></creneau>
  </div>
</template>

<script>
import configSite from "./App/config.js";
//import creneau from "./App/index.vue";

export default {
  name: "App",
  components: {
    creneau: function() {
      return new Promise(resolv => {
        resolv(import("./App/index.vue"));
      });
    }
  },
  data() {
    return {
      app_env_prod: configSite.IsProduction,
      nombre_res_creneau: configSite.nombre_res_creneau,
      blocks_type_livraisons: configSite.blocks_type_livraisons,
      collecte_current_date: configSite.current_date,
      livraison_current_date: configSite.current_date,
      nombre_semaine: configSite.nombre_semaine,
      plage_heures_valide: configSite.plage_heures_valide,
      collecte_jour_desactivee: configSite.jour_desactivee,
      livraison_jour_desactivee: configSite.jour_desactivee,
      collecte_date_desactivee: configSite.date_desactivee,
      livraison_date_desactivee: configSite.date_desactivee,
      disable_heureday: configSite.disable_heureday,
      disable_heuredate: configSite.disable_heuredate,
      url_save_creneau: configSite.url_save_creneau,
      url_get_creneau: configSite.url_get_creneau,
      collecte_deccalage_creneau_depart: configSite.deccalage_creneau_depart,
      collecte_delai_jour: 0,
      collecte_interval: 120,
      livraison_delai_jour: 3,
      livraison_interval: 120
    };
  }
};
</script>
