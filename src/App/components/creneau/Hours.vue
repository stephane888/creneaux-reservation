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
      open-direction="bottom"
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
        <span> Aucun créneau disponible à cette date </span>
      </template>
    </advanced-select>
  </div>
</template>

<script>
import AdvancedSelect from "vue-multiselect";
// import { BuildCreneaux } from "./AppResouces.js";
export default {
  name: "Hours",
  props: {},
  components: {
    AdvancedSelect
  },
  data() {
    return {
      current_creneau: "",
      disabled_creneau: false
    };
  },
  computed: {
    /**
     * Construit les creneaux.
     */
    list_creneaux() {
      const creneaux = [];
      return creneaux;
    }
  }
};
</script>
