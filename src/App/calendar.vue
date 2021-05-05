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
        @click="select_date(date, i)"
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
import FFilter from "./FonctionFiltre";
export default {
  name: "calendar",
  props: {
    // h_debut: {
    //   type: Number,
    //   default: 8
    // },
    // m_debut: {
    //   type: Number,
    //   default: 0
    // },
    // h_fin: {
    //   type: Number,
    //   default: 21
    // },
    // m_fin: {
    //   type: Number,
    //   default: 0
    // },
    type_creneau: {
      type: String,
      default: ""
    },
    app_date_current: {
      type: [Object, String]
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
    /**
     * date utilisable par l'application ou date de reference.
     * Elle ne  change pas durant le precessus.
     */
    // app_date: {
    //   type: [Object, String]
    // },
    // list_calander_days: {
    //   type: Array,
    //   default() {
    //     return [];
    //   }
    // },
    /**
     * C'est la date encours.
     * ( Elle doit etre fournit par le serveur et convertie en un object moment() ).
     *
     * @param object moment()
     */
    current_date: {
      type: Object,
      default() {
        return moment();
        //return "";
      }
    }
  },
  data() {
    return {
      ///**
      //  * Permet d'eviter une boucle infinie. limit à 100; (3 mois)
      //  */
      // test_calandar_day: 0,
      /**
       * list calendar date, elle gere l'affichage du calendrier.
       */
      list_calander_days: [],
      calendar_nav: 0,
      /**
       * list calendar date, elle gere l'affichage du calendrier.
       */

      /**
       * configuration de la date.
       */
      show_month_in_date: false,
      show_day_label: true
    };
  },
  computed: {
    calandar_title: {
      get() {
        if (this.app_date_current != "") {
          return moment(this.app_date_current)
            .add(this.calendar_nav, "month")
            .locale("fr")
            .format("MMMM  YYYY");
        }
        return "";
      }
    },
    //Permet au filtre d'appliquer un style à la date du jour
    app_date_current_string: {
      get() {
        return this.app_date_current.format("DD-MM-YYYY");
      }
    }
  },
  methods: {
    /**
     * le calendrier demarre toujours un lunid.
     * Lundi(index) = 1
     * Saturday = 6
     * Sunday = 0;
     */
    async builderCalandar() {
      // var mom = moment("01/05/2021", "DD/MM/YYYY").add(1, "Month");
      this.list_calander_days = [];
      this.test_calandar_day = 0;
      var date_string = (date_string = moment(this.app_date_current).format(
        "DD-MM-YYYY HH:mm:ss"
      ));

      var calander_day_min = moment(date_string, "DD-MM-YYYY HH:mm:ss").add(
        this.calendar_nav,
        "month"
      );
      var calender_day_max = moment(date_string, "DD-MM-YYYY HH:mm:ss").add(
        this.calendar_nav,
        "month"
      );
      var nJr = this.nombre_semaine * 7;

      // on determine la date min à partir de la date app_date .add(this.calendar_nav,'month')
      var day_current_index = calander_day_min.day();
      if (!day_current_index) {
        day_current_index = 7;
      }
      //on recupère l'index du weekend du jour encour pour calculer le additional_day_to_remove
      var week_index = this.weekOfMonth(moment(date_string, "DD/MM/YYYY"));

      var additional_day_to_remove = 0;
      for (let i = 1; i < week_index; i++) {
        additional_day_to_remove += 7;
      }
      var day_remove = 6 + day_current_index - 7 + additional_day_to_remove;

      if (day_remove > 0) {
        nJr -= day_remove;
        calander_day_min.add(-day_remove, "days");
      }
      calender_day_max.add(nJr, "days");

      this.getPlageDate(calander_day_min, calender_day_max);
    },
    // permet d'obtenir l'index de la semaine du current_day en fonction du mois
    weekOfMonth(input) {
      const firstDayOfMonth = input.clone().startOf("month");
      const firstDayOfWeek = firstDayOfMonth.clone().startOf("week");

      const offset = firstDayOfMonth.diff(firstDayOfWeek, "days");

      return Math.ceil((input.date() + offset) / 7);
    },

    /**
     * Obtient la date utilisable.
     * La paramettre date doit etre un object moment.
     * Pour la validation on a 3 cas :
     * - Validation des jours de la semaine.
     * - Validation des dates desactivées.
     * - Validation des delais.
     * NB: les function qui doivent integrer cette derniere doivent remettre les variables suivante à leurs valeurs par defaut :
     * - test_delai_jour
     * - test_jour_semaine
     * - test_date_desactivee
     * @return un object moment (complet jour, mois, année, heure, mn, s)
     */
    getPlageDate(calander_day_min, calender_day_max) {
      FFilter.app_date = this.app_date;
      FFilter.jour_desactivee = this.jour_desactivee;
      FFilter.type_creneau = this.type_creneau;
      FFilter.app_date_current = this.app_date_current;
      FFilter.filters = this.filters;
      FFilter.h_debut = this.h_debut;
      var self = this;
      return new Promise(function(resolve, reject) {
        self.test_calandar_day++;
        if (self.test_calandar_day > 99) {
          reject(false);
          return false;
        }

        if (calander_day_min.diff(calender_day_max, "days")) {
          FFilter.ValidationDay(calander_day_min).then(stateValidationDay => {
            self.list_calander_days.push({
              date_string: calander_day_min.format("DD-MM-YYYY"),
              day_french: calander_day_min.locale("fr").format("Do <br /> MMM"),
              date_month: calander_day_min.locale("fr").format("DD"),
              custom_class: stateValidationDay.custom_class,
              select:
                calander_day_min.format("DD-MM-YYYY") ==
                self.app_date_current_string
                  ? true
                  : false,
              status: stateValidationDay.status
            });

            calander_day_min.add(1, "days");
            resolve(self.getPlageDate(calander_day_min, calender_day_max));
          });
        } else {
          resolve(true);
        }
      });
    },
    async select_date(date, i) {
      this.$emit("select_date", { date: date, i: i });
      this.calendar_nav = 0;
    },
    async select_date_in_calander(k) {
      for (const i in this.list_calander_days) {
        if (k == i) {
          this.list_calander_days[i].select = true;
        } else {
          this.list_calander_days[i].select = false;
        }
      }
    },
    //permet de naviguer entre les mois
    toggleMonth(direction) {
      //this.$emit("toggleMonth", direction);

      if (direction > 0) {
        this.calendar_nav++;
      } else {
        this.calendar_nav--;
      }

      this.builderCalandar();
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
