import FFilter from "./FonctionFiltre";

if (window.moment) {
  var moment = window.moment;
}

export default class BuildCalendar {
  constructor(
    app_date_utilisable_string,
    calendar_nav,
    nombre_semaine,
    jour_desactivee,
    type_creneau,
    filters,
    date_select
  ) {
    this.app_date_utilisable_string = app_date_utilisable_string;
    this.calendar_nav = calendar_nav;
    this.nombre_semaine = nombre_semaine;
    this.jour_desactivee = jour_desactivee;
    this.type_creneau = type_creneau;
    this.filters = filters;
    this.date_select = date_select;
    //
    this.list_calander_days = [];
    this.test_calandar_day = 0;
    this.app_date_utilisable = moment(app_date_utilisable_string, "DD-MM-YYYY");
    this.datetime_min = moment(app_date_utilisable_string, "DD-MM-YYYY");
    //console.log("app_date_utilisable_string : ", app_date_utilisable_string);
    //permet de savoir si une date a été selectionner ?
    this.selectedDate = false;
  }
  /**
   * le calendrier demarre toujours un lunid.
   * Lundi(index) = 1
   * Saturday = 6
   * Sunday = 0;
   */
  async builderCalandar() {
    var calander_day_min = moment(
      this.app_date_utilisable_string,
      "DD-MM-YYYY"
    ).add(this.calendar_nav, "month");
    var calender_day_max = moment(
      this.app_date_utilisable_string,
      "DD-MM-YYYY"
    ).add(this.calendar_nav, "month");
    var nJr = this.nombre_semaine * 7;

    var day_current_index = calander_day_min.day();
    if (!day_current_index) {
      day_current_index = 7;
    }
    //on recupère l'index du weekend du jour encour pour calculer le additional_day_to_remove
    var week_index = this.weekOfMonth(
      moment(this.app_date_utilisable_string, "DD-MM-YYYY")
    );

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

    console.log(
      "calander_day_min : ",
      calander_day_min.format("DD-MM-YYYY"),
      "\n calender_day_max : ",
      calender_day_max.format("DD-MM-YYYY")
    );
    /**/
    await this.getPlageDate(calander_day_min, calender_day_max);
    if (!self.selectedDate) {
      //this.date_select;
    }
  }

  setDate(
    day_min_sting,
    calander_day,
    stateValidationDay,
    StatusSelectDate = false
  ) {
    return {
      date_string: day_min_sting,
      day_french: calander_day.locale("fr").format("Do <br /> MMM"),
      date_month: calander_day.locale("fr").format("DD"),
      custom_class: stateValidationDay.custom_class,
      select: StatusSelectDate,
      status: stateValidationDay
    };
  }

  // permet d'obtenir l'index de la semaine du current_day en fonction du mois
  weekOfMonth(input) {
    const firstDayOfMonth = input.clone().startOf("month");
    const firstDayOfWeek = firstDayOfMonth.clone().startOf("week");

    const offset = firstDayOfMonth.diff(firstDayOfWeek, "days");

    return Math.ceil((input.date() + offset) / 7);
  }

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
    FFilter.app_date = this.app_date_utilisable;
    FFilter.jour_desactivee = this.jour_desactivee;
    FFilter.type_creneau = this.type_creneau;
    //FFilter.app_date_current = this.datetime_min; //this.app_date_current;
    FFilter.datetime_min = this.datetime_min;
    FFilter.filters = this.filters;
    var self = this;
    return new Promise(function(resolve, reject) {
      self.test_calandar_day++;
      if (self.test_calandar_day > 99) {
        reject(false);
        return false;
      }

      if (calander_day_min.diff(calender_day_max, "days")) {
        FFilter.ValidationDay(calander_day_min).then(stateValidationDay => {
          const day_min_sting = calander_day_min.format("DD-MM-YYYY");
          var StatusSelectDate = false;
          // Si on a pas encore selectionné, selectionne la date encours.
          if (
            !self.date_select &&
            day_min_sting == self.app_date_utilisable_string
          ) {
            StatusSelectDate = true;
          } else if (
            self.date_select &&
            !stateValidationDay.status &&
            day_min_sting == self.date_select.date_string
          ) {
            StatusSelectDate = true;
          } else if (
            //self.date_select &&
            //stateValidationDay.status &&
            day_min_sting == self.app_date_utilisable_string
          ) {
            StatusSelectDate = true;
          }
          /*
          else if (
            self.type_creneau === "livraison" &&
            day_min_sting == self.app_date_utilisable_string
          ) {
            StatusSelectDate = true;
          }
          /**/
          const date = {
            date_string: day_min_sting,
            day_french: calander_day_min.locale("fr").format("Do <br /> MMM"),
            date_month: calander_day_min.locale("fr").format("DD"),
            custom_class: stateValidationDay.custom_class,
            select: StatusSelectDate,
            status: stateValidationDay.status
          };
          if (StatusSelectDate) {
            /*
            if (self.type_creneau === "livraison")
              console.log(
                "Echec ValidationDay : ",
                date,
                "\n date_select : ",
                self.date_select,
                "\n app_date_utilisable_string : ",
                self.app_date_utilisable_string
              );
            /**/
            self.selectedDate = true;
            self.date_select = date;
          }
          /*
          else {
            if (self.type_creneau)
              console.log(
                "Echec ValidationDay : ",
                date,
                "\n date_select : ",
                self.date_select,
                "\n app_date_utilisable_string : ",
                self.app_date_utilisable_string
              );
          }
          /**/
          self.list_calander_days.push(date);
          calander_day_min.add(1, "days");
          resolve(self.getPlageDate(calander_day_min, calender_day_max));
        });
      } else {
        resolve(true);
      }
    });
  }
}
