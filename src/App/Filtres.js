if (window.moment) {
  var moment = window.moment;
}

const Filters = {
  /**
   * Permettent de reduire le temps d'execution des creneaux.
   */
  //contient les dates desactivés due à filter.date_desactivee
  filter_date_desactivee: {},
  //contient les dates desactivés due à filter.periode_desactivee
  filter_periode_desactivee: {},
  /**
   * Permet de verifier si la plage d'heure selectionne est inclus ou partielment inclut dans le creneau.
   * cette function est utilisé uniquement lors du passage des creneaux.
   */
  HourIntervalContain: function(
    heure_begin_disable,
    heure_end_disable,
    creneaux_heure_begin,
    creneaux_heure_end,
    date_min_string
  ) {
    var h_d = heure_begin_disable.split(":");
    var date_min = moment(date_min_string, "DD-MM-YYYY HH:mm:ss");
    date_min.hours(h_d[0]);
    date_min.minutes(h_d[1]);
    //
    var h_f = heure_end_disable.split(":");
    var date_max = moment(date_min_string, "DD-MM-YYYY HH:mm:ss");
    date_max.hours(h_f[0]);
    date_max.minutes(h_f[1]);
    if (
      (creneaux_heure_begin.diff(date_min, "minutes") >= 0 &&
        creneaux_heure_begin.diff(date_max, "minutes") < 0) ||
      (creneaux_heure_end.diff(date_min, "minutes") > 0 &&
        creneaux_heure_end.diff(date_max, "minutes") <= 0)
    ) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * On verifie que un ou plusieurs sont selectionnées.
   * si nous sommes un jour inclut dans la liste on retourne true,
   * si non on retourne false,
   * si le tableau est vide, on retourne true.
   * @return true si la date ou le creneau doivent etre desactiver et false sinon.
   * NB: jours_select ne doit pas etre vide.
   */
  JourSelect: function(jours_select, app_date_current_indice) {
    return new Promise(resolv => {
      for (const i in jours_select) {
        if (jours_select[i] === app_date_current_indice) {
          resolv(true);
          return;
        }
        var ii = parseInt(i) + 1;
        if (jours_select.length === ii) {
          resolv(false);
          return;
        }
      }
    });
  },
  /**
   * Permet de filtrer en function de la date.
   * ( il faudra verifier que l'attribut filter.dates_disable nest plus definit )
   * Pour les dates, le scenario est peu different, car si on ne trouve pas une date
   * = à la date encour et que filter.periode_desactivee n'est pas definit on doit verifier
   * le niveau inferieur qui doit etre absolument filter.periode_desactive.
   * @return true si la date ou le creneau doivent etre desactiver et false sinon.
   */
  DateDesactivee: function(
    i,
    date_desactivee,
    app_date_current_string_en,
    type = "date"
  ) {
    var self = this;
    return new Promise(resolv => {
      const CheckDateDesactivee = function() {
        return new Promise(resolv2 => {
          for (const i in date_desactivee) {
            if (date_desactivee[i].date === app_date_current_string_en) {
              resolv2(true);
              return;
            }
            const ii = parseInt(i) + 1;
            if (date_desactivee.length === ii) {
              resolv2(false);
              return;
            }
          }
        });
      };
      if (type === "date") {
        CheckDateDesactivee().then(status => {
          resolv(status);
        });
      } else {
        if (
          self.filter_date_desactivee[i] &&
          self.filter_date_desactivee[i][app_date_current_string_en]
        ) {
          resolv(
            self.filter_date_desactivee[i][app_date_current_string_en].status
          );
          return;
        } else {
          CheckDateDesactivee().then(status => {
            if (!self.filter_date_desactivee[i]) {
              self.filter_date_desactivee[i] = {};
            }
            self.filter_date_desactivee[i][app_date_current_string_en] = {
              status: status
            };
            console.log("DateDesactivee +++");
            resolv(status);
          });
        }
      }
    });
  },
  /**
   * Permet de filtrer en function de la periode.
   * un remarque importante, on a pas besoin de tester pour tous les creneaux. 1 seul suffit,
   * on chosit de sauvegarder, le status du test dans l'object filter.periode_desactivee
   * On utilise self.app_date_current pour verifier la periode, or cette date contient l'heure,mm, ce qui va entrainer un deccalage.
   * donc, pour combler ce deccalage, on utilisera < 1 ou > 1
   * @param i index loop
   * @param periode_desactivee Array
   * @param app_date_current moment() format "YYYY-MM-DD";
   * @param app_date_current_string_en String format "YYYY-MM-DD"
   * @param type String
   */
  PeriodeDesactivee: function(
    i,
    periode_desactivee,
    app_date_current,
    app_date_current_string_en,
    type = "date"
  ) {
    var self = this;
    return new Promise(resolv => {
      const CheckPeriodeDesactivee = function() {
        return new Promise(resolv2 => {
          for (const i in periode_desactivee) {
            const periode = periode_desactivee[i];
            const date_min = moment(periode.debut, "YYYY-MM-DD");
            const date_max = moment(periode.fin, "YYYY-MM-DD");
            if (
              app_date_current.diff(date_min, "days") >= 0 &&
              app_date_current.diff(date_max, "days") <= 0
            ) {
              resolv2(true);
              return;
            }
            const ii = parseInt(i) + 1;
            if (periode_desactivee.length === ii) {
              resolv2(false);
              return;
            }
          }
        });
      };
      if (type === "date") {
        CheckPeriodeDesactivee().then(status => {
          resolv(status);
        });
      } else {
        if (
          self.filter_periode_desactivee[i] &&
          self.filter_periode_desactivee[i][app_date_current_string_en]
        ) {
          resolv(
            self.filter_periode_desactivee[i][app_date_current_string_en].status
          );
          return;
        } else {
          CheckPeriodeDesactivee().then(status => {
            if (!self.filter_periode_desactivee[i]) {
              self.filter_periode_desactivee[i] = {};
            }
            self.filter_periode_desactivee[i][app_date_current_string_en] = {
              status: status
            };
            console.log(
              "PeriodeDesactivee +++: ",
              self.filter_periode_desactivee
            );
            resolv(status);
          });
        }
      }
    });
  },
  /**
   * on attend la fin de boucle filter, pour faire une sauvegarde tempon.
   */
  saveData: function(result, i, app_date_current_string_en) {
    var self = this;
    if (result.verificateur === "date_desactivee") {
      if (!self.filter_date_desactivee[i]) {
        self.filter_date_desactivee[i] = {};
      }
      self.filter_date_desactivee[i][app_date_current_string_en] = {
        status: result.status
      };
    } else if (result.verificateur === "periode_desactivee") {
      if (self.filter_periode_desactivee[i]) {
        self.filter_periode_desactivee[i] = {};
      }
      self.filter_periode_desactivee[i][app_date_current_string_en] = {
        status: result.status
      };
    }
  }
};
export default Filters;
