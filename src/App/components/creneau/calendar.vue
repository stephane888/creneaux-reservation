<template>
  <div
    class="container-date flat cercle"
    :initCreneau="initCreneau"
    :ReInitCreneauLivraison="ReInitCreneauLivraison"
    :updateCurrentDateSelect="updateCurrentDateSelect"
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
import Utilities from "../../js/Utilities";
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
      calandarTitle: "",
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
    ...mapState([
      "activeType",
      "creneauConfigs",
      "creneauType",
      "creneauCollecte",
      "creneauLivraison"
    ]),
    /**
     * Permet de demarer le calendrier.
     * Si nous sommes dans le cas de la collecte, on utilise la date par defaut.
     * Si on est dans la livraison on utilise la date definit par la collecte.
     */
    initCreneau() {
      console.log("initCreneau : ", this.type);
      if (this.type === Utilities.crex1.id) {
        if (this.appDate) {
          this.buildCalendar();
          return this.appDate;
        }
      } else if (this.type === Utilities.crex2.id) {
        if (this.creneauCollecte.date_string) {
          this.buildCalendar();
          return this.creneauCollecte.date_string;
        }
      }
      return null;
    },
    /**
     * Re-initialise le creneau livaison si l'utilisateur change la date de livraison ou si l'utilisateur change de type de livraison.
     */
    ReInitCreneauLivraison() {
      if (this.creneauCollecte.date_string && this.currentCreneauType) {
        if (this.type === Utilities.crex2.id) {
          this.emptyCurentDateSelect();
        }
      }
      return this.creneauCollecte.date_string;
    },

    /**
     * Permet de selectionner une date par defaut ou lorque le calendrier change change.
     * On met à jour la date creneauInfo[this.type].date si ce dernier est null.
     * Si creneauInfo[this.type].date n'est pas null, alors l'utilisateur a deja selectionné une date.
     *
     */
    updateCurrentDateSelect() {
      if (this.listCalanderDays.length) {
        if (this.type == Utilities.crex1.id) {
          if (!this.creneauCollecte.date_string) {
            this.selectFirstActiveDate();
          } else {
            this.selectEgalActiveDate();
          }
        }
        if (this.type == Utilities.crex2.id) {
          if (!this.creneauLivraison.date_string) {
            this.selectFirstActiveDate();
          } else {
            this.selectEgalActiveDate();
          }
        }

        return this.listCalanderDays.length;
      }
      return null;
    },
    /**
     * -
     */
    currentCreneauType() {
      return this.creneauType[this.activeType];
    }
  },
  methods: {
    emptyCurentDateSelect() {
      this.$store.dispatch("SetSelectDate", this.BuildPayload(false));
      this.calendarNav = 0;
    },
    BuildPayload(val) {
      return {
        type: this.type,
        date_string: val
      };
    },
    /**
     * Selectionne la premiere date active,
     * s'il nya pas de date active, dans le mois en cours, on incremente le mois.
     */
    selectFirstActiveDate() {
      for (const i in this.listCalanderDays) {
        const e = this.listCalanderDays[i];
        if (e.status) {
          e.select = true;
          this.$store.dispatch(
            "SetSelectDate",
            this.BuildPayload(e.date_string)
          );
          break;
        }
        var ii = parseInt(i) + 1;
        //si on a parcourut tout le tableau sans trouve de valeur active, on prend le prochain mois.
        if (this.listCalanderDays.length === ii) this.nextMonth();
      }
    },
    /**
     * Cette function permet de selectionner la cellule sur le calendrier == la date precedament selectionné.
     * Elle declanche selectFirstActiveDate() si la date selectionné est desactivé;
     */
    selectEgalActiveDate() {
      for (const i in this.listCalanderDays) {
        const e = this.listCalanderDays[i];
        if (this.type === Utilities.crex1.id)
          if (e.date_string === this.creneauCollecte.date_string) {
            if (!e.status) this.selectFirstActiveDate();
            else e.select = true;
            break;
          }
        if (this.type === Utilities.crex2.id)
          if (e.date_string === this.creneauLivraison.date_string) {
            if (!e.status) this.selectFirstActiveDate();
            else e.select = true;
            break;
          }
        // Pour permettre à la livraison de toujours selectionné une date.

        var ii = parseInt(i) + 1;
        if (
          this.listCalanderDays.length == ii &&
          this.type === Utilities.crex2.id
        ) {
          //this.selectFirstActiveDate();
        }
      }
    },
    selectDate(date) {
      if (!date.status) return false;
      this.listCalanderDays.forEach(e => {
        e.select = false;
      });
      date.select = "selected";
      this.$store.dispatch(
        "SetSelectDate",
        this.BuildPayload(date.date_string)
      );
    },
    previowMonth() {
      this.calendarNav--;
    },
    nextMonth() {
      this.calendarNav++;
    },
    buildCalendar() {
      var date, appDate;
      if (this.type === Utilities.crex1.id) {
        date = moment(this.appDate).add(this.calendarNav, "month");
        appDate = this.appDate;
      } else {
        date = moment(this.creneauCollecte.date_string, "YYYY-MM-DD").add(
          this.calendarNav,
          "month"
        );
        appDate = moment(this.creneauCollecte.date_string, "YYYY-MM-DD");
      }
      // Build calendar.
      const cal = new calendar(
        date,
        appDate,
        this.type,
        this.creneauConfigs,
        this.currentCreneauType
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
