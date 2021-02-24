<template lang="html">
  <div class="container my-4 app-admin">
    <h3>Configuration de l'application</h3>
    <div class="my-4">
      <b-tabs content-class="my-3">
        <b-tab title="Configuration de base">
          <CreneauBase :creneau_configs="creneau_configs"></CreneauBase>
        </b-tab>
        <b-tab title="Configuration des creneaux et dates">
          <CreneauConfig :filters="creneau_filters"></CreneauConfig>
        </b-tab>
        <b-tab title="Type de livraison" active>
          <TypeLivraison :types-livraison="creneau_types"></TypeLivraison>
        </b-tab>
      </b-tabs>
      <div class="d-flex justify-content-end">
        <b-button size="sm" @click="load" variant="outline-info" class="mr-2">
          Load
        </b-button>
        <!--
          Le bouton preview enregistre les données dans localStorage.
        -->
        <b-button
          size="sm"
          @click="Preview"
          variant="outline-info"
          class="mr-2"
        >
          Preview
        </b-button>
        <b-button size="sm" @click="save" variant="outline-success">
          Save
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import configs from "./configs/config.js";
//
/**
 * Cette approche ne limite pas BootstrapVue pour ce composant, mais il sera charge si ce composant est demandé.
 */
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
import Utilities from "./Utilities";
export default {
  name: "Admin",
  props: {
    //
  },
  components: {
    CreneauBase: () => import("./Forms/CreneauBase"),
    CreneauConfig: () => import("./Forms/CreneauConfig"),
    TypeLivraison: () => import("./Forms/TypeLivraion")
  },
  data() {
    return {
      creneau_configs: {
        days: [],
        heures: [],
        nombre_semaine: 4,
        nombre_res_creneau: 2
      },
      creneau_filters: [Utilities.filter()],
      creneau_types: {
        typelivraison: Utilities.getDefaultTypeLivraion(),
        delais_jour: []
      }
    };
  },
  mounted() {
    //
  },
  watch: {
    //
  },
  computed: {
    //
  },
  methods: {
    save() {
      configs.saveMetaFields([
        {
          key: "creneau_configs",
          value: this.creneau_configs,
          value_type: "json_string"
        },
        {
          key: "creneau_filters",
          value: this.creneau_filters,
          value_type: "json_string"
        }
      ]);
    },
    Preview() {
      localStorage.setItem(
        "creneau_configs",
        JSON.stringify(this.creneau_configs)
      );
      localStorage.setItem(
        "creneau_filters",
        JSON.stringify(this.creneau_filters)
      );
      localStorage.setItem("creneau_types", JSON.stringify(this.creneau_types));
      window.location.reload();
    },
    load() {
      configs.post("/app/creneaux/shopify/request/LoadMetafields", {
        endPoint: "/admin/metafields.json"
      });
    }
  }
};
</script>

<style lang="scss">
.app-admin {
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~bootstrap-vue/src/index.scss";
  .ctn-action-button {
    &.static {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
    }
  }
}
</style>

<!--
 //nom du fichier en pascal.
 //<template>
 - le nom des attributs en kebab-case;
 - la valeur des attributs et des variables en camelCase;
 - function en PascalCase
 //props, data
 - variable en camelCase
 //methods
 - variable en PascalCase
-->
