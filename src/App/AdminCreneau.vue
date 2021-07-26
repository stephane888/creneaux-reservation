<template lang="html">
  <div class="container my-4 app-admin border py-4 px-5">
    <h3>Configuration de l'application</h3>
    <div class="my-4">
      <b-tabs content-class="my-3">
        <b-tab title="Configuration de base" active>
          <CreneauBase :creneau-configs="creneauType"></CreneauBase>
        </b-tab>
        <b-tab title="Configuration des creneaux et dates">
          <CreneauFilters
            :filters="creneauConfigs"
            :jours-active="joursActive"
          ></CreneauFilters>
        </b-tab>
        <b-tab title="Type de livraison">
          <TypeLivraison
            :creneau-types="creneauType"
            :jours-active="joursActive"
          ></TypeLivraison>
        </b-tab>
        <b-tab title="Configuration de la map">
          <MapGoogle></MapGoogle>
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
import configs from "./components/admin/configs/config";
//
/**
 * Cette approche ne limite pas BootstrapVue pour ce composant, mais il sera charge si ce composant est demandé.
 */
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
import Utilities from "./js/Utilities";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Admin",
  props: {
    //
  },
  components: {
    CreneauBase: () => import("./components/admin/Forms/CreneauBase"),
    CreneauFilters: () => import("./components/admin/Forms/CreneauFilters"),
    TypeLivraison: () => import("./components/admin/Forms/TypeLivraion"),
    MapGoogle: () => import("map-google-location/src/AppManageApiGoogle.vue")
  },
  data() {
    return {};
  },
  mounted() {
    this.LoadValues();
  },
  watch: {
    //
  },
  computed: {
    ...mapState(["creneauConfigs", "creneauFilters", "creneauType"]),
    ...mapGetters(["joursActive"])
  },
  methods: {
    async resetDatas() {
      this.$store.dispatch("ResetDatas");
    },
    async BuildDays() {
      if (this.creneauConfigs.days && this.creneauConfigs.days.length == 0)
        Utilities.JourInfos().forEach(item => {
          this.creneauConfigs.days.push(item);
        });
    },
    SaveMetafieldConfig() {
      configs.saveMetaFields([
        {
          key: "creneauConfigs",
          value: this.creneauConfigs,
          value_type: "json_string"
        },
        {
          key: "creneauFilters",
          value: this.creneauFilters,
          value_type: "json_string"
        },
        {
          key: "creneauType",
          value: this.creneauType,
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
          "creneauConfigs",
          JSON.stringify(this.creneauConfigs)
        );
        localStorage.setItem(
          "creneauFilters",
          JSON.stringify(this.creneauFilters)
        );
        localStorage.setItem("creneauType", JSON.stringify(this.creneauType));
        window.location.reload();
      } else {
        configs
          .SaveConfigsTest({
            creneauConfigs: this.creneauConfigs,
            creneauFilters: this.creneauFilters,
            creneauType: this.creneauType
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
        localStorage.removeItem("creneauConfigs");
        localStorage.removeItem("creneauFilters");
        localStorage.removeItem("creneauType");
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
                  case "creneauConfigs":
                    this.creneauConfigs = JSON.parse(metafield.value);
                    break;
                  case "creneauFilters":
                    this.creneauFilters = JSON.parse(metafield.value);
                    break;
                  case "creneauType":
                    this.creneauType = JSON.parse(metafield.value);
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
      var creneauConfigs = window.creneauConfigs;
      if (creneauConfigs && creneauConfigs.days) {
        this.creneauConfigs = creneauConfigs;
        StoreHasTestConfig = true;
      }
      //
      var creneauType = window.creneauType;
      if (creneauType && creneauType.typelivraison) {
        this.creneauType = creneauType;
      }
      //
      var creneauFilters = window.creneauFilters;
      if (creneauFilters && creneauFilters.length) {
        this.creneauFilters = creneauFilters;
      }
      if (StoreHasTestConfig) {
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
