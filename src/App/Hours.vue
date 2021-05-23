<!--
  La construction des heures est declenché par app_date_utilisable_string_hour;
-->
<template lang="html">
  <div>
    <advanced-select
      v-model="current_creneau"
      :disabled="disabled_creneau"
      :options="list_creneaux"
      :show-labels="false"
      :searchable="false"
      placeholder="00:00 - 00:00"
      track-by="begin"
    >
      <!-- Pour l'affichege de la selection. -->
      <template slot="singleLabel" slot-scope="{ option }">
        {{ option.begin }} - {{ option.end }}
      </template>
      <template slot="option" slot-scope="props">
        <span :checkstatus="props.option.checkstatus">
          {{ props.option.begin }} - {{ props.option.end }}
        </span>
      </template>
      <template slot="noOptions">
        Aucun créneau disponible à cette date
      </template>
    </advanced-select>
  </div>
</template>

<script>
import AdvancedSelect from "vue-multiselect";
import { BuildCreneaux } from "./AppResouces.js";
export default {
  name: "Hours",
  props: {
    app_date_utilisable_string: {
      type: String,
      required: true
    },
    app_date_utilisable_string_hour: {
      type: String,
      required: true
    },
    h_debut: {
      type: Number,
      required: true
    },
    m_debut: {
      type: Number,
      required: true
    },
    h_fin: {
      type: Number,
      required: true
    },
    m_fin: {
      type: Number,
      required: true
    },
    plage_heures_valide: {
      type: Array,
      required: true
    }
  },
  components: {
    AdvancedSelect
  },
  data() {
    return {
      current_creneau: "",
      disabled_creneau: false,
      list_creneaux: [],
      heure_creneau_debut: null,
      heure_creneau_fin: null
    };
  },
  mounted() {
    //
  },
  watch: {
    app_date_utilisable_string_hour() {
      this.init();
    }
  },
  computed: {
    //
  },
  methods: {
    async init() {
      const Build = new BuildCreneaux(
        this.app_date_utilisable_string,
        this.h_debut,
        this.m_debut,
        this.h_fin,
        this.m_fin,
        this.plage_heures_valide
      );
      await Build.dateBorne();
    }
  }
};
</script>

<style lang="scss" scoped></style>

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
