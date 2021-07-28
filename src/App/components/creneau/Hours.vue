<!--
  La construction des heures est declenché par app_date_utilisable_string;
-->
<template lang="html">
  <div style="width:100%" :triggerBuilder="triggerBuilder">
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
import { mapState, mapGetters } from "vuex";
import Utilities from "../../js/Utilities";
export default {
  name: "Hours",
  props: {
    type: {
      type: String,
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
      list_creneaux: []
    };
  },
  computed: {
    ...mapGetters(["appDate"]),
    ...mapState([
      "activeType",
      "creneauConfigs",
      "creneauType",
      "creneauCollecte",
      "creneauLivraison"
    ]),
    getHours() {
      if (this.appDate)
        return {
          hour: this.appDate.hour(),
          minute: this.appDate.minute(),
          second: this.appDate.second()
        };
      return null;
    },
    WatchDateSelect() {
      if (this.type === Utilities.crex1.id) {
        const crex1H = moment(
          this.creneauCollecte.date_string,
          "YYYY-MM-DD"
        ).set(this.getHours);
        return crex1H;
      }
      if (this.type === Utilities.crex2.id) {
        const crex2H = moment(
          this.creneauLivraison.date_string,
          "YYYY-MM-DD"
        ).set(this.getHours);
        return crex2H;
      }
      return null;
    },
    /**
     * -
     */
    currentCreneauType() {
      return this.creneauType[this.activeType];
    },
    /**
     * Recuperer la page de date du jour.
     */
    getCurrentBandHour() {
      if (this.creneauConfigs.days && this.WatchDateSelect._isValid) {
        for (const i in this.creneauConfigs.days) {
          const d = this.creneauConfigs.days[i];
          if (d.indice === this.WatchDateSelect.day()) {
            return d;
          }
        }
      }
      return null;
    },
    /**
     * Declanche le debut de la construction
     */
    triggerBuilder() {
      if (this.getCurrentBandHour) {
        this.buildHours();
        return this.getCurrentBandHour;
      }
      return null;
    }
  },
  methods: {
    buildHours() {
      this.list_creneaux = [];
      console.log("getCurrentBandHour : ", this.getCurrentBandHour);
      const h_min = this.getCurrentBandHour.debut.split(":");
      const h_max = this.getCurrentBandHour.fin.split(":");
      const dateMin = moment(this.WatchDateSelect).set({
        hour: h_min[0],
        minute: h_min[1],
        second: 0
      });
      const dateMax = moment(this.WatchDateSelect).set({
        hour: h_max[0],
        minute: h_max[1],
        second: 0
      });
      const addCreneau = () => {
        const endCreneau = moment(dateMin).add(
          this.currentCreneauType.creneau,
          "minute"
        );
        const nextCreneau = moment(dateMin).add(
          this.currentCreneauType.delai_next_creneau,
          "minute"
        );
        if (endCreneau.diff(dateMax) <= 0) {
          var bloc_date = {
            begin: dateMin.format("HH:mm"),
            end: endCreneau.format("HH:mm"),
            $isDisabled: false,
            checkstatus: ""
          };
          if (dateMin.diff(this.WatchDateSelect) > 0)
            this.list_creneaux.push(bloc_date);
          dateMin.add(this.currentCreneauType.delai_next_creneau, "minute");
          addCreneau();
        }
      };
      addCreneau();
    }
  }
};
</script>
<style>
@import "~vue-multiselect/dist/vue-multiselect.min.css";
</style>
