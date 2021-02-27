<template lang="html">
  <div class="container my-4 app-admin">
    <h3>Configuration de l'application</h3>
    <div class="my-4">
      <b-tabs content-class="my-3">
        <b-tab title="Configuration de base">
          <CreneauBase :creneau_configs="creneau_configs"></CreneauBase>
        </b-tab>
        <b-tab title="Configuration des creneaux et dates" active>
          <CreneauFilters
            :filters="creneau_filters"
            :jours-active="joursActive"
          ></CreneauFilters>
        </b-tab>
        <b-tab title="Type de livraison">
          <TypeLivraison
            :creneau-types="creneau_types"
            :jours-active="joursActive"
          ></TypeLivraison>
        </b-tab>
      </b-tabs>
      <div class="d-flex justify-content-end">
        <b-button
          size="sm"
          @click="DeleteData"
          variant="outline-info"
          class="mr-2"
        >
          Ré-initialise
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
          Voir l'aperçu
        </b-button>
        <hr />
        <b-button size="sm" @click="load" variant="outline-info" class="mr-2">
          Charge la config de production
        </b-button>
        <b-button size="sm" @click="save" variant="outline-success">
          Enregistrer en production
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
    CreneauFilters: () => import("./Forms/CreneauFilters"),
    TypeLivraison: () => import("./Forms/TypeLivraion")
  },
  data() {
    return {
      creneau_configs: Utilities.DefaultCreneauConfigs(),
      creneau_filters: [Utilities.filter()],
      creneau_types: Utilities.DefaultCreneauTypes()
    };
  },
  mounted() {
    this.LoadValues();
  },
  watch: {
    //
  },
  computed: {
    joursActive() {
      var result = [];
      if (this.creneau_configs.days) {
        for (const i in this.creneau_configs.days) {
          if (this.creneau_configs.days[i].value) {
            result.push(this.creneau_configs.days[i]);
          }
        }
      }
      return result;
    }
  },
  methods: {
    resetDatas() {
      this.creneau_configs = Utilities.DefaultCreneauConfigs();
      this.creneau_filters = [Utilities.filter()];
      this.creneau_types = Utilities.DefaultCreneauTypes();
    },
    BuildDays() {
      if (this.creneau_configs.days && this.creneau_configs.days.length == 0)
        Utilities.JourInfos().forEach(item => {
          this.creneau_configs.days.push(item);
        });
    },
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
    DeleteData() {
      localStorage.removeItem("creneau_configs");
      localStorage.removeItem("creneau_filters");
      localStorage.removeItem("creneau_types");
      //load default datas
      this.resetDatas();
      this.loadDefaultDatas();
      window.location.reload();
    },
    load() {
      configs.post("/app/creneaux/shopify/request/LoadMetafields", {
        endPoint: "/admin/metafields.json"
      });
    },
    LoadValues() {
      var creneau_configs = JSON.parse(localStorage.getItem("creneau_configs"));
      if (creneau_configs && creneau_configs.days) {
        this.creneau_configs = creneau_configs;
      }
      //
      var creneau_types = JSON.parse(localStorage.getItem("creneau_types"));
      if (creneau_types && creneau_types.typelivraison) {
        this.creneau_types = creneau_types;
      }
      //
      var creneau_filters = JSON.parse(localStorage.getItem("creneau_filters"));
      if (creneau_filters && creneau_filters.length) {
        this.creneau_filters = creneau_filters;
      }
      //load default datas
      this.loadDefaultDatas();
    },
    loadDefaultDatas() {
      this.BuildDays();
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
