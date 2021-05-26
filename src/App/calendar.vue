<template>
  <div class="container-date flat cercle">
    <div class="single-date-picker__calendar-month-header">
      <div
        class="single-date-picker__arrow left"
        @click="toggleMonth(-1)"
      ></div>

      <div
        class="single-date-picker__year"
        v-html="calandar_title"
        v-if="calandar_title != ''"
      ></div>

      <div
        class="single-date-picker__arrow right"
        @click="toggleMonth(1)"
      ></div>
    </div>
    <ul class="d-flex flex-wrap justify-content-center">
      <div
        v-if="show_day_label"
        class="d-flex flex-wrap justify-content-center w-100"
      >
        <li class="date day">
          Lun
        </li>
        <li class="date day">
          Mar
        </li>
        <li class="date day">
          Mer
        </li>
        <li class="date day">
          Jeu
        </li>
        <li class="date day">
          Ven
        </li>
        <li class="date day">
          Sam
        </li>
        <li class="date day">
          Dim
        </li>
      </div>
      <li
        v-for="(date, i) in list_calander_days"
        :key="i"
        :class="[
          'date',
          date.status ? 'disable' : 'actif',
          date.custom_class,
          date.select ? 'selected' : ''
        ]"
        @click="select_date(date)"
      >
        <span v-if="show_month_in_date" v-html="date.day_french"></span>
        <span v-if="!show_month_in_date" v-html="date.date_month"></span>
      </li>
    </ul>
  </div>
</template>

<script>
//import moment from "moment";
if (window.moment) {
  var moment = window.moment;
}
import { BuildCalendar } from "./AppResouces.js";
export default {
  name: "calendar",
  props: {
    type_creneau: {
      type: String,
      default: ""
    },
    app_date_utilisable_string_hour: {
      type: String,
      required: true
    },
    filters: {
      type: Array,
      required: true
    },
    /**
     * Nombre de semaine exact à afficher.
     */
    nombre_semaine: {
      type: Number,
      default: 4
    },
    /**
     * represente les jours de la semaine qui sont tjrs désactivés.
     * dimanche etant definit par 0 ey 6 pour samedi.
     */
    jour_desactivee: {
      type: Array,
      default() {
        return [0, 6];
      }
    },
    rebuild_creneau: {
      type: [Object, String]
    }
  },
  data() {
    return {
      /**
       * list calendar date, elle gere l'affichage du calendrier.
       */
      list_calander_days: [],
      calendar_nav: 0,
      /**
       * configuration de la date.
       */
      show_month_in_date: false,
      show_day_label: true,
      date_select: null
    };
  },
  watch: {
    app_date_utilisable_string_hour() {
      this.calendar_nav = 0;
      this.init();
    },
    date_select: {
      deep: true,
      handler(date) {
        this.$emit("select_date", date);
      }
    }
  },
  computed: {
    calandar_title: {
      get() {
        if (this.app_date_utilisable_string_hour != "") {
          return moment(this.app_date_utilisable_string_hour, "DD-MM-YYYY")
            .add(this.calendar_nav, "month")
            .locale("fr")
            .format("MMMM  YYYY");
        }
        return "";
      }
    }
  },
  methods: {
    async init() {
      const app_date_utilisable_string = moment(
        this.app_date_utilisable_string_hour,
        "DD-MM-YYYY HH:mm:ss"
      );
      const Build = new BuildCalendar(
        app_date_utilisable_string.format("DD-MM-YYYY"),
        this.calendar_nav,
        this.nombre_semaine,
        this.jour_desactivee,
        this.type_creneau,
        this.filters,
        this.date_select
      );
      await Build.builderCalandar();
      this.list_calander_days = Build.list_calander_days;
      this.date_select = Build.date_select;
    },
    select_date(date) {
      for (const i in this.list_calander_days) {
        const datePass = this.list_calander_days[i];
        if (datePass.select) datePass.select = false;
        var j = parseInt(i) + 1;
        if (j === this.list_calander_days.length) date.select = true;
      }
      this.date_select = date;
      this.$emit("close_calendar", true);
    },
    //permet de naviguer entre les mois
    toggleMonth(direction) {
      if (direction > 0) {
        this.calendar_nav++;
      } else {
        this.calendar_nav--;
      }
      this.init();
    }
  }
};
</script>

<style lang="scss">
.single-date-picker__calendar-month-header {
  padding: 14px 25px;
  background-image: linear-gradient(to right, #007bff, #56a5fa, #007bff);
  display: flex;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  align-items: center;
  color: #ffffff;
  .single-date-picker__arrow {
    border-left: 3px solid #fff;
    border-top: 3px solid #fff;
    width: 18px;
    height: 18px;
  }
  .left {
    transform: rotate(-45deg);
  }
  .right {
    transform: rotate(135deg);
  }
  .single-date-picker__year {
    font-weight: 900;
    font-size: 20px;
    text-transform: capitalize;
  }
  .single-date-picker__arrow {
    cursor: pointer;
  }
}
</style>
