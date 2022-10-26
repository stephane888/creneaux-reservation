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
          <MapGoogle ref="mapGoogle"></MapGoogle>
        </b-tab>
      </b-tabs>
      <div class="d-flex justify-content-end">
        <b-button
          size="sm"
          variant="outline-info"
          class="mr-2"
          @click="ResetConfigTest"
        >
          Ré-initialiser
        </b-button>
        <b-button
          size="sm"
          variant="outline-info"
          class="mr-2"
          @click="SavePreProdConfig(false)"
        >
          Enregistrer
        </b-button>
        <hr />
        <b-button
          size="sm"
          :variant="isSaveInProd ? 'secondary' : 'outline-success'"
          :disabled="isSaveInProd"
          @click="SaveMetafieldConfig"
        >
          Publier en production
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import queryString from "query-string";
import Utilities from "./js/Utilities";
import config from "./components/admin/configs/config";
import { mapGetters, mapState } from "vuex";
import store from "map-google-location/src/store/index";

//
/**
 * Cette approche ne limite pas BootstrapVue pour ce composant, mais il sera charge si ce composant est demandé.
 */
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
const query = queryString.parse(window.location.search);
export default {
  name: "AdminCreneau",
  components: {
    CreneauBase: () => import("./components/admin/Forms/CreneauBase"),
    CreneauFilters: () => import("./components/admin/Forms/CreneauFilters"),
    TypeLivraison: () => import("./components/admin/Forms/TypeLivraion"),
    MapGoogle: () =>
      import("map-google-location/src/components/admin/manage-config.vue"),
  },
  props: {
    //
  },
  data() {
    return {
      query: queryString.parse(window.location.search),
      shop: config.isLocalDev ? "creneaux-reservation.kksa" : query.shop,
      configsMap: store.state.configs,
    };
  },
  computed: {
    ...mapState([
      "creneauConfigs",
      "creneauFilters",
      "creneauType",
      "isSaveInProd",
    ]),
    ...mapGetters(["joursActive"]),
  },
  mounted() {
    this.$store.dispatch("UpdateMapConfigs", this.configsMap);
    this.initDefaultConfig()
      .then(() => {
        this.$store.dispatch("loadPreProdConfigs", this.shop);
        this.$refs.mapGoogle
          .LoadValues()
          .then((resp) => {
            console.log("reponse de manage-config : ", resp);
            if (resp.value) {
              let res_value = JSON.parse(resp.value);
              this.$store.dispatch("UpdateMapConfigs", res_value);
              //this.configsMap = JSON.parse(resp.value);
            }
          })
          .catch((er) => {
            console.log("Erreur de chargement de la configuration par defaut");
            this.$store.dispatch("UpdateMapConfigs", configsMap);
          });
      })
      .catch((er) => {
        console.log("Erreur init");
      });
  },

  methods: {
    async resetDatas() {
      this.$store.dispatch("ResetDatas");
    },
    async BuildDays() {
      if (this.creneauConfigs.days && this.creneauConfigs.days.length == 0) {
        Utilities.JourInfos().forEach((item) => {
          this.creneauConfigs.days.push(item);
        });
      }
    },
    /**
     * --
     */
    SaveMetafieldConfig() {
      const datas = [
        config.AddMetafield("creneauConfigs", this.creneauConfigs),
        config.AddMetafield("creneauFilters", this.creneauFilters),
        config.AddMetafield("creneauType", this.creneauType),
        config.AddMetafield("localisation", this.configsMap),
      ];
      config.SfPost("metafields", datas).then(() => {
        this.$store.dispatch("UpdateIsSaveInProd", true);
        this.SavePreProdConfig(true);
      });
    },

    /**
     * Re-initialise la configuration et l'enregistre en DB pour les tests.
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
      // load default datas
      await this.resetDatas();
      await this.loadDefaultDatas();
    },
    /**
     *
     */
    SavePreProdConfig(status) {
      const params = {
        creneauConfigs: this.creneauConfigs,
        creneauFilters: this.creneauFilters,
        creneauType: this.creneauType,
        status: status, // isSaveInProd
      };
      config
        .bPost("/shopify-api-rest/save-configs", params, {
          params: { key: "creneaux-configs", shop: this.shop },
        })
        .then(() => {
          if (!status) {
            this.$store.dispatch("UpdateIsSaveInProd", false);
          }
        });
      this.$refs.mapGoogle.SavePreProdConfig();
    },
    async loadDefaultDatas() {
      await this.BuildDays();
    },
    /**
     * Permet d'initialiser la configuration par default
     */
    initDefaultConfig() {
      return new Promise((resolv, reject) => {
        if (config.isLocalDev) {
          config
            .post("/shopify-api-rest/init-local", {
              origin: this.shop,
            })
            .then((r) => {
              resolv(r);
            })
            .catch((er) => {
              reject();
            });
        } else resolv();
      });
    },
  },
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
