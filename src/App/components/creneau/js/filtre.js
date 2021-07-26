class filtre {
  constructor(dateMonth, creneauConfigs, filters = {}) {
    /**
     * Date de l'application sans les les heures.
     */
    this.dateMonth = dateMonth;
    this.IndexDayDisabled = [];
    if (creneauConfigs.days) {
      this.DaysDisabled(creneauConfigs.days);
    }
  }
  /**
   * Jours desactivés
   */
  DaysDisabled(days) {
    days.forEach(e => {
      if (!e.value) this.IndexDayDisabled.push(e.indice);
    });
  }
  /**
   * permet de valider un date, active ou pas.
   * @param {*} date Doit etre un object moment.
   */
  ValidationDay(date) {
    return new Promise(resolvEnd => {
      //permet de dessactiver les jour avant le jour valide par l'application.
      /*
      console.log(
        'date.diff(this.dateMonth, "day") : ',
        date.format("DD-MM-YYYY HH:mm:ss"),
        "\n dateMonth",
        this.dateMonth.format("DD-MM-YYYY HH:mm:ss"),
        "\n :: ",
        date.diff(this.dateMonth, "minute", true)
      );
      /**/
      if (date.diff(this.dateMonth, "minute") >= 0) {
        //permet de desactivée en function de l'indice.
        if (this.IndexDayDisabled.includes(date.day())) {
          resolvEnd(this.statusDate(date, false, "default-disable-day"));
        } else resolvEnd(this.statusDate(date, true, "default-disable-day"));
      } else {
        resolvEnd(this.statusDate(date, false, "default-disable"));
      }
    });
  }
  /*
  DisableDateByfilter(date) {
    var self = this;
    return new Promise(resolvEnd => {
      var index_day = date.day();
      var app_date_current_string_en = date.format("YYYY-MM-DD");
      var app_date_current_en = moment(
        app_date_current_string_en,
        "YYYY-MM-DD"
      );
      // Desactivation du jour en function des filtres.
      const CustomLoop = function(i = 0) {
        return new Promise(resolv => {
          const filter = self.filters[i];
          if (filter.h_debut.length === 0 && filter.h_fin.length === 0) {
            Filtres.loopAttribFilter(
              i,
              filter,
              app_date_current_en,
              app_date_current_string_en,
              index_day,
              "date"
            ).then(result => {
              result.custom_class = "filtre-" + i + " " + result.verificateur;
              resolv(result);
            });
          } else {
            resolv({ status: false, i: i, custom_class: "nothing" });
          }
        });
      };
      const execution = (i = 0) => {
        CustomLoop(i).then(result => {
          var ii = result.i + 1;
          if (result.status) {
            resolvEnd(result);
            return;
          } else if (self.filters[ii]) {
            execution(ii);
          } else {
            resolvEnd(result);
            return;
          }
        });
      };
      execution();
    });
  }
  /** */
  statusDate(date, status, custom_class, select = "") {
    return {
      status: status,
      custom_class: custom_class,
      date: date.date(),
      select: select,
      date_french: date.format("YYYY-MM-DD")
    };
  }
}
export default filtre;
