<template>
  <div
    class="container-date flat cercle"
    :initCalendar="initCalendar"
    v-show="showCalandar"
  >
    <div class="single-date-picker__calendar-month-header">
      <div class="single-date-picker__arrow left" @click="previowMonth"></div>

      <div
        class="single-date-picker__year"
        v-html="calandarTitle"
        v-if="calandarTitle != ''"
      ></div>

      <div class="single-date-picker__arrow right" @click="nextMonth"></div>
    </div>
    <ul class="d-flex flex-wrap justify-content-center">
      <div
        v-if="showDayLabel"
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
        v-for="(date, i) in listCalanderDays"
        :key="i"
        :class="[
          'date',
          date.status ? 'actif' : 'disable',
          date.custom_class,
          date.select ? 'selected' : ''
        ]"
        @click="selectDate(date)"
      >
        <span v-html="date.date"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import calendar from "./js/calendar.js";
export default {
  name: "Calendar",
  props: {
    showCalandar: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      /**
       * List calendar date, elle gere l'affichage du calendrier.
       */
      listCalanderDays: [],
      calendarNav: 0,
      calandarTitle: "ddfd",
      /**
       * Configuration de la date.
       */
      showMonthInDate: false,
      showDayLabel: true,
      dateSelect: null
    };
  },
  computed: {
    ...mapGetters(["appDate"]),
    ...mapState(["creneauConfigs"]),
    /**
     * Permet de demarer le calendrier avec la date par defaut.
     */
    initCalendar() {
      if (this.appDate) {
        this.buildCalendar();
        return this.appDate;
      }
      return null;
    }
  },
  methods: {
    selectDate(date) {
      if (!date.status) return false;
      this.listCalanderDays.forEach(element => {
        element.select = "";
      });
      date.select = "selected";
    },
    previowMonth() {
      this.calendarNav--;
      this.buildCalendar();
    },
    nextMonth() {
      this.calendarNav++;
      this.buildCalendar();
    },
    buildCalendar() {
      const date =
        this.calendarNav === 0
          ? this.appDate
          : moment(this.appDate).add(this.calendarNav, "month");
      // Build calendar.
      const cal = new calendar(
        date,
        this.appDate,
        this.type,
        this.creneauConfigs
      );
      cal.buildDaysOfMonth();
      this.listCalanderDays = cal.dates;
      // Display current mois
      this.calandarTitle = moment(date)
        .locale("fr")
        .format("MMMM  YYYY");
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
