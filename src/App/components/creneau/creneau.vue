<template>
  <div
    :class="classes"
    class="rectangle mx-2 mx-md-0 mb-3 mb-md-0 mx-3 pt-4 pl-sm-3 col-md-6"
  >
    <div class="title-creneau h2">{{ title }}</div>
    <div
      class=" d-flex justify-content-between justify-content-md-start line-creneau h1 "
    >
      <hours :type="type" @selectNextDay="selectNextDay"></hours>

      <i
        class="icone-svg mb-md-1 mb-lg-2 cursor-pointer"
        @click="showCalandar = !showCalandar"
      >
        <SvgCalandar></SvgCalandar>
      </i>
    </div>

    <p @click="showCalandar = !showCalandar" class="cursor-pointer">
      {{ appDateDisplay }}
    </p>
    <div
      class="over-container-date"
      v-if="showCalandar"
      @click="showCalandar = !showCalandar"
    ></div>
    <calendar
      :show-calandar="showCalandar"
      :type="type"
      ref="calendar"
    ></calendar>
    <!--
    <pre v-if="type == 'livraison'">
      creneauLivraison {{ creneauLivraison }}
    </pre>
    <pre v-if="type == 'collecte'">
      creneauCollecte {{ creneauCollecte }}
    </pre>
-->
  </div>
</template>
<script>
import { mapState } from "vuex";
import hours from "./Hours.vue";
import calendar from "./calendar.vue";
import SvgCalandar from "./SvgCalandar.vue";

export default {
  name: "Creneau",
  props: {
    title: {
      type: String,
      required: true
    },
    classes: {
      type: String,
      default: "rond-left"
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    hours,
    calendar,
    SvgCalandar
  },
  data() {
    return {
      showCalandar: false
    };
  },

  /**
   * Date affiché.
   */

  computed: {
    ...mapState(["creneauCollecte", "creneauLivraison", "creneauConfigs"]),
    appDateDisplay: {
      get() {
        if (this.type === "livraison" && this.creneauLivraison.date_string) {
          return moment(this.creneauLivraison.date_string, "YYYY-MM-DD")
            .locale("fr")
            .format("dddd Do MMMM");
        } else if (
          this.type === "collecte" &&
          this.creneauCollecte.date_string
        ) {
          return moment(this.creneauCollecte.date_string, "YYYY-MM-DD")
            .locale("fr")
            .format("dddd Do MMMM");
        }
        return "";
      }
    }
  },
  methods: {
    selectNextDay() {
      this.$refs.calendar.selectSpecifiqDateActive();
    }
  }
};
</script>
