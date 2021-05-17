<!-- -->
<template>
  <div class="row ml-md-4">
    <creneau
      :title="collecte_title"
      :classes="collecte_livraison"
      :delai_jour="collecte_delai_jour"
      :jour_desactivee="collecte_jour_desactivee"
      :date_desactivee="collecte_date_desactivee"
      :interval="collecte_interval"
      :rebuild_creneau="collecte_plages_debut"
      :configs="collecte_configs"
      :current_date="collecte_current_date"
      :nombre_semaine="nombre_semaine"
      :nombre_res_creneau="nombre_res_creneau"
      :plage_heures_valide="plage_heures_valide"
      :disable_heureday="disable_heureday"
      :disable_heuredate="disable_heuredate"
      :url_get_creneau="url_get_creneau"
      :type_creneau="'collecte'"
      :deccalage_creneau_depart="collecte_deccalage_creneau_depart"
      :filters="filters"
      ref="collecte"
      @ev_select_current_creneau="ev_select_current_creneau_collecte"
    ></creneau>

    <creneau
      :title="title_livraison"
      :classes="classes_livraison"
      :delai_jour="livraison_delai_jour"
      :jour_desactivee="livraison_jour_desactivee"
      :date_desactivee="livraison_date_desactivee"
      :interval="livraison_interval"
      :rebuild_creneau="livraison_rebuild_creneau"
      :configs="livraison_configs"
      :current_date="livraison_current_date"
      :nombre_semaine="nombre_semaine"
      :nombre_res_creneau="nombre_res_creneau"
      :plage_heures_valide="plage_heures_valide"
      :disable_heureday="disable_heureday"
      :disable_heuredate="disable_heuredate"
      :url_get_creneau="url_get_creneau"
      :type_creneau="'livraison'"
      :filters="filters"
      ref="livraison"
      @ev_select_current_creneau="ev_select_current_creneau_livraison"
    ></creneau>
  </div>
</template>

<script>
//import moment from "moment";
if (window.moment) {
  var moment = window.moment;
}
import creneau from "./Creneau.vue";
export default {
  name: "SelectionHoraire",
  props: {
    nombre_semaine: {
      type: Number
    },
    nombre_res_creneau: {
      type: Number
    },
    disable_heureday: {
      type: Array
    },
    disable_heuredate: {
      type: Array
    },
    plage_heures_valide: {
      type: Array
    },
    url_get_creneau: {
      type: String
    },
    collecte_title: {
      type: String,
      default: "Collecte"
    },
    collecte_livraison: {
      type: String,
      default:
        "rectangle rond-left mx-2 mx-md-0 mb-3 mb-md-0 mx-3 pt-4 pl-sm-3 col-md-6"
    },
    collecte_delai_jour: {
      type: Number
    },
    collecte_jour_desactivee: {
      type: Array
    },
    collecte_date_desactivee: {
      type: Array
    },
    collecte_interval: {
      type: Number
    },
    collecte_plages_debut: {
      type: Object
    },
    collecte_configs: {
      type: Object
    },
    collecte_current_date: {
      type: Object
    },
    collecte_deccalage_creneau_depart: {
      type: Number
    },
    title_livraison: {
      type: String,
      default: "Livraison"
    },
    classes_livraison: {
      type: String,
      default:
        " rectangle rond-right mx-2 mx-md-0 mb-3 mb-md-0 mx-3 pt-4 pl-sm-3 col-md-6"
    },
    livraison_delai_jour: {
      type: Number
    },
    livraison_jour_desactivee: {
      type: Array
    },
    livraison_date_desactivee: {
      type: Array
    },
    livraison_interval: {
      type: Number
    },
    livraison_configs: {
      type: Object
    },
    livraison_current_date: {
      type: Object
    },
    filters: {
      type: Array
    }
  },
  components: {
    creneau: creneau
  },
  data() {
    return {
      livraison_rebuild_creneau: {}
    };
  },
  mounted() {
    //
  },
  methods: {
    ev_select_current_creneau_collecte(creneau) {
      this.livraison_rebuild_creneau = creneau;
      this.$emit("ev_creneau_collecte", this.getValidData(creneau));
    },
    ev_select_current_creneau_livraison(creneau) {
      this.$emit("ev_creneau_livraison", this.getValidData(creneau));
    },
    /**
     * Permet de convertir les données String en JSON,
     * de les mettre dans un format valide pour la sauvegarde.
     */
    getValidData(creneau) {
      var validCreneau = JSON.parse(creneau);
      const date = moment(
        validCreneau.date_string_not_change,
        "DD-MM-YYYY HH:mm:ss"
      );
      validCreneau.date = date;
      validCreneau.date_string = date.format("DD-MM-YYYY HH:mm:ss");
      return validCreneau;
    }
  }
};
</script>
