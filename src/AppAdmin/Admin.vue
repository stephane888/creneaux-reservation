<template lang="html">
  <div class="container my-4 app-admin">
    <h3>Configuration de l'application</h3>

    <b-card no-body class="my-4">
      <b-tabs card>
        <b-tab title="Creneau de base" active>
          <b-card-text>
            <CreneauConfig></CreneauConfig>
          </b-card-text>
        </b-tab>
        <b-tab title="Tab 2">
          <b-card-text>Tab contents 2</b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
/**
 * cette approche ne limite pas BootstrapVue pour ce composant, mais il sera charge si ce composant est demandé.
 */
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

export default {
  name: "Admin",
  props: {
    //
  },
  components: {
    CreneauConfig: () => import("./Forms/CreneauConfigs")
  },
  data() {
    return {};
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
    //
  }
};
</script>

<style lang="scss">
.app-admin {
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~bootstrap-vue/src/index.scss";
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
