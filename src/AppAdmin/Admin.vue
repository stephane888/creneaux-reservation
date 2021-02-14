<template lang="html">
  <div class="container first-block p-3">
    <h2>Configuration de l'application</h2>
    <div>
      <b-button>Button</b-button>
      <b-button variant="danger">Button</b-button>
      <b-button variant="success">Button</b-button>
      <b-button variant="outline-primary">Button</b-button>
    </div>
    <b-tabs content-class="mt-3">
      <b-tab title="First" active><p>I'm the first tab</p></b-tab>
      <b-tab title="Second"><p>I'm the second tab</p></b-tab>
      <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { BButton } from "bootstrap-vue";
import { BTabs, BTab } from "bootstrap-vue";

export default {
  name: "Admin",
  props: {
    //
  },
  components: {
    "b-button": BButton,
    "b-tabs": BTabs,
    "b-tab": BTab
  },
  data() {
    return {
      //
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
    //
  }
};
</script>

<style lang="scss" scoped>
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
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
