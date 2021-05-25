<!--
  La construction des heures est declenché par app_date_utilisable_string;
-->
<template lang="html">
  <div style="width:100%">
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
        <span>Aucun créneau disponible à cette date</span>
      </template>
    </advanced-select>
  </div>
</template>

<script>
import AdvancedSelect from "vue-multiselect";
import { BuildCreneaux } from "./AppResouces.js";
if (window.moment) {
  var moment = window.moment;
}
export default {
  name: "Hours",
  props: {
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
    },
    filters: {
      type: Array,
      required: true
    },
    configs: {
      type: Object,
      required: true
    },
    deccalage_creneau_depart: {
      type: Number
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
  mounted() {},
  watch: {
    app_date_utilisable_string_hour() {
      this.init();
    },
    current_creneau(val) {
      if (!val) this.$emit("select_next_day", val);
      else this.$emit("select_creneau", val);
    }
  },
  computed: {
    //
  },
  methods: {
    async init() {
      const app_date_utilisable_string = moment(
        this.app_date_utilisable_string_hour,
        "DD-MM-YYYY HH:mm:ss"
      );

      const Build = new BuildCreneaux(
        app_date_utilisable_string.format("DD-MM-YYYY"),
        this.app_date_utilisable_string_hour,
        this.h_debut,
        this.m_debut,
        this.h_fin,
        this.m_fin,
        this.plage_heures_valide,
        this.configs.creneau,
        this.configs.delai_next_creneau,
        this.filters,
        this.deccalage_creneau_depart
      );
      await Build.dateBorne();
      await Build.buildHour();
      this.list_creneaux = Build.list_creneaux;
      this.current_creneau = this.list_creneaux[0];
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
