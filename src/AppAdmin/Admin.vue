<template lang="html">
  <div class="container my-4 app-admin border py-4 px-5">
    <h3>Configuration de l'application</h3>
    <div class="my-4">
      <b-tabs content-class="my-3">
        <b-tab title="Configuration de base" active>
          <CreneauBase :creneau_configs="creneau_configs"></CreneauBase>
        </b-tab>
        <b-tab title="Configuration des creneaux et dates">
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
          @click="ResetConfigTest"
          variant="outline-info"
          class="mr-2"
        >
          Ré-initialise
        </b-button>

        <!--
          Le bouton  enregistre les données dans localStorage.
        -->
        <b-button
          size="sm"
          @click="SaveConfigTestReload"
          variant="outline-info"
          class="mr-2"
        >
          Voir l'aperçu
        </b-button>
        <hr />
        <b-button
          size="sm"
          @click="loadMetafieldConfig"
          variant="outline-info"
          class="mr-2"
        >
          Charge la config de production
        </b-button>
        <b-button
          size="sm"
          @click="SaveMetafieldConfig"
          variant="outline-success"
        >
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
      creneau_configs: {},
      creneau_filters: [],
      creneau_types: {}
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
    async resetDatas() {
      this.creneau_configs = Utilities.DefaultCreneauConfigs();
      this.creneau_filters = [Utilities.filter()];
      this.creneau_types = Utilities.DefaultCreneauTypes();
    },
    async BuildDays() {
      if (this.creneau_configs.days && this.creneau_configs.days.length == 0)
        Utilities.JourInfos().forEach(item => {
          this.creneau_configs.days.push(item);
        });
    },
    SaveMetafieldConfig() {
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
        },
        {
          key: "creneau_types",
          value: this.creneau_types,
          value_type: "json_string"
        }
      ]);
    },
    SaveConfigTestReload() {
      if (
        window.location.host === "localhost:8080" &&
        typeof localStorage !== "undefined"
      ) {
        localStorage.setItem(
          "creneau_configs",
          JSON.stringify(this.creneau_configs)
        );
        localStorage.setItem(
          "creneau_filters",
          JSON.stringify(this.creneau_filters)
        );
        localStorage.setItem(
          "creneau_types",
          JSON.stringify(this.creneau_types)
        );
        window.location.reload();
      } else {
        configs
          .SaveConfigsTest({
            creneau_configs: this.creneau_configs,
            creneau_filters: this.creneau_filters,
            creneau_types: this.creneau_types
          })
          .then(() => {
            window.location.reload();
          });
      }
    },
    /**
     * re-initialise la configuration et l'enregistre en DB pour les tests.
     */
    async ResetConfigTest() {
      if (
        window.location.host === "localhost:8080" &&
        typeof localStorage !== "undefined"
      ) {
        localStorage.removeItem("creneau_configs");
        localStorage.removeItem("creneau_filters");
        localStorage.removeItem("creneau_types");
      }
      //load default datas
      await this.resetDatas();
      await this.loadDefaultDatas();
      this.SaveConfigTestReload();
    },
    loadMetafieldConfig() {
      configs
        .post("/app/creneaux/shopify/request/LoadMetafields", {
          endPoint: "/admin/metafields.json"
        })
        .then(reponse => {
          var StoreHasConfig = false;
          if (reponse.status && reponse.data.metafields) {
            for (const i in reponse.data.metafields) {
              const metafield = reponse.data.metafields[i];
              if (metafield.namespace === "wbu_creneaux") {
                StoreHasConfig = true;
                switch (metafield.key) {
                  case "creneau_configs":
                    this.creneau_configs = JSON.parse(metafield.value);
                    break;
                  case "creneau_filters":
                    this.creneau_filters = JSON.parse(metafield.value);
                    break;
                  case "creneau_types":
                    this.creneau_types = JSON.parse(metafield.value);
                    break;
                }
              }
              var ii = parseInt(i) + 1;
              if (ii === reponse.data.metafields.length && !StoreHasConfig) {
                this.LoadValues();
              }
            }
          } else {
            this.LoadValues();
          }
        });
    },
    async LoadValues() {
      var StoreHasTestConfig = false;
      var creneau_configs = window.creneau_configs;
      if (creneau_configs && creneau_configs.days) {
        this.creneau_configs = creneau_configs;
        StoreHasTestConfig = true;
      }
      //
      var creneau_types = window.creneau_types;
      if (creneau_types && creneau_types.typelivraison) {
        this.creneau_types = creneau_types;
      }
      //
      var creneau_filters = window.creneau_filters;
      if (creneau_filters && creneau_filters.length) {
        this.creneau_filters = creneau_filters;
      }
      if (!StoreHasTestConfig) {
        await this.resetDatas();
      }
      this.loadDefaultDatas();
    },
    async loadDefaultDatas() {
      await this.BuildDays();
    }
  }
};
</script>

<style lang="scss">
$color_bg: #f3f3f3;
.creneaux-mbt {
  .first-block {
    background-color: #fff !important;
    padding: 0em 2em 2em 2em;
    border: 1px solid #eee;
  }

  .app-admin {
    background-color: $color_bg !important;
  }
}
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
