if (window.moment) {
  var moment = window.moment;
}
import Filtres from "./Filtres";

const FFilter = {
  jour_desactivee: [],
  type_creneau: "",
  app_date: {},
  //app_date_current: {},
  datetime_min: {},
  filters: [],
  /**
   * @param date object moment
   * Return true si la date doit etre desactivée, et false sinon.
   */
  ValidationDay: function(date) {
    var self = this;
    if (
      !(self.app_date && self.app_date.isValid()) ||
      !(self.datetime_min && self.datetime_min.isValid())
    ) {
      throw "La variable self.app_date|self.datetime_min est requise";
    }
    return new Promise(resolvEnd => {
      var index_day = date.day();
      /*
      if (self.type_creneau === "livraison")
        console.log(
          "ValidationDay : ",
          "\n",
          "date selectionée : ",
          self.datetime_min.format("DD-MM-YYYY HH:mm:ss"),
          "\n",
          self.app_date.format("DD-MM-YYYY HH:mm:ss"),
          "\n",
          date.format("DD-MM-YYYY HH:mm:ss")
        );
      /**/
      // Desactivation du jour avant la date min.
      if (date.diff(self.app_date, "minutes") < 0) {
        resolvEnd({ status: true, custom_class: "default-disable-app-date" });
      }
      //
      else if (
        date.diff(self.datetime_min, "days") < 0 &&
        self.type_creneau === "livraison"
      ) {
        /*
        console.log(
          'date.diff(self.datetime_min, "days") ',
          date.diff(self.datetime_min, "days")
        );
        /**/
        resolvEnd({ status: true, custom_class: "default-disable-livraison" });
      }
      // Desactivation du jour en function des jours selectionnées.
      else if (
        self.jour_desactivee.length &&
        self.jour_desactivee.includes(index_day)
      ) {
        resolvEnd({ status: true, custom_class: "jour_desactivee" });
        return;
      }
      // Desactivation du jour en function des filtres.
      else if (self.filters.length === 0) {
        resolvEnd({ status: false, custom_class: "filter empty" });
        return;
      } else {
        resolvEnd(self.DisableDateByfilter(date));
      }
    });
  },
  DisableDateByfilter: function(date) {
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
};
export default FFilter;
